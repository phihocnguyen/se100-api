import { User } from "@prisma/client";
import db from "../config/db";
import v2Cloudinary from "../utils/cloudinary";
import bcrypt from 'bcrypt'
import generateVerificationToken from "../helpers/token";
import { generateAccessToken } from "../helpers/jwt-handler";
import VerifcationRepository from "./verification.repository";

interface newUserType {
    newUser: User,
    token: string
}

interface confirmationEmailType {
    email: string,
    token: string
}

interface loginType {
    accessToken : string,
    user: User
}

type tokenType = {
    email: string,
    token: string
}

class UserRepository {
    private readonly verificationRepository : VerifcationRepository

    constructor () {
        this.verificationRepository = new VerifcationRepository()
    }

    async login(email : string, password: string) : Promise<User | confirmationEmailType | loginType | boolean> {
        const existUser = await this.findByEmail(email)
        let correctPassword = false
        if (existUser) {
            if(!existUser.emailVerified) {
                const verificationToken = await generateVerificationToken(existUser.email)
                return {
                    email: email,
                    token: verificationToken.token
                } as confirmationEmailType
            }
            correctPassword = bcrypt.compareSync(password, existUser.password)
        }
        if (existUser && correctPassword) {
            const accessToken = generateAccessToken(existUser.id, existUser.email, existUser.role)
            return {
                user: existUser,
                accessToken : accessToken
            } as loginType
        }
        else return false
    }

    async create(data : User, file : Express.Multer.File | undefined) : Promise<newUserType | boolean> {
        const salt = bcrypt.genSaltSync(10)
        const existUser = await db.user.findFirst(
            {
                where: {
                    email: data.email
                }
            }
        )
        if (existUser) return false
        let url = ''
        await v2Cloudinary.uploader.upload(file!.path, (err, result) => {
            if (err) {
                return null
            }
            else {
                url = result!.url
            }
        })
        const newUser : User = await db.user.create(
            {
                data: {
                    ...data,
                    password: bcrypt.hashSync(data.password, salt),
                    image: url
                }
            }
        )
        const verificationToken = await generateVerificationToken(data.email)
        const newUserWithToken : newUserType = {
            newUser: newUser,
            token: verificationToken.token
        }
        return newUserWithToken
    }

    async createOAuth(data: any) : Promise<User | boolean> {
        const salt = bcrypt.genSaltSync(10)
        const existUser = await db.user.findFirst(
            {
                where: {
                    email: data.email
                }
            }
        )
        if (existUser) return false
        const newUser : User = await db.user.create(
            {
                data: {
                    ...data,
                    password: bcrypt.hashSync(data.email, salt),
                    emailVerified: new Date(),
                    isOAuth: true
                }
            }
        )
        return newUser;
    }

    async edit(id: string, data : User, file : Express.Multer.File | undefined) : Promise<User | null> {
        const existUser = this.findByEmail(data.email)
        if (file) {
            let url = ''
            await v2Cloudinary.uploader.upload(file!.path, (err, result) => {
                if (err) {
                    return null
                }
                else {
                    url = result!.url
                }
            })
            return db.user.update(
                {
                    where: {
                        id: id
                    },
                    data: {
                        ...data,
                        image: url
                    }
                }
            )
        }
        return existUser
    }

    async delete(id : string) : Promise<boolean> {
        const existUser = await this.findById(id)
        if (!existUser) return false 
        await db.user.delete(
            {
                where: {
                    id
                }
            }
        )
        return true
    }

    async findByEmail(email: string): Promise<User | null> {
        return await db.user.findFirst(
            {
                where: {
                    email
                }
            }
        )
    }
    async findById(id : string) : Promise<User | null> {
        return await db.user.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
    }

    async findAllUsers() : Promise<User[] | null> {
        return db.user.findMany()
    }

    async verifyEmail(token : string) : Promise<{message: string, boolean: boolean} | undefined> {
        const existingToken : (tokenType | null)  = await this.verificationRepository.getTokenByToken(token)
        if (!existingToken) return {message: 'Token does not exists!', boolean: true}

        const existingUser = await this.findByEmail(existingToken.email)
        if (!existingUser) return {message: 'User does not exists!', boolean: false}

        const updateVerification = await this.updateVerification(existingUser?.id, existingToken.email)
        const deleteVerifiedEmail = await this.verificationRepository.deleteWithUserId(existingUser?.id);

        if (updateVerification && deleteVerifiedEmail) {
            return {
                message: 'Email verified!',
                boolean: true
            }
        }
    }

    async updateVerification(id: (string | undefined), email: string) : Promise<boolean> {
        if (!id) return false
        await db.user.update({
            where: {
                id
            },
            data: {
                emailVerified: new Date(),
                email
            }
        })
        return true
    }

}

export default UserRepository