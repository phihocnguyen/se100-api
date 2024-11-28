import UserRepository from "../repositories/user.repository";
import { User } from "@prisma/client";
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
class UserService {
    private readonly userRepository : UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }
    async login(email : string, password: string) : Promise<User | confirmationEmailType | loginType | boolean> {
        return this.userRepository.login(email, password)
    }
    async create(data: User, file : Express.Multer.File | undefined) : Promise<newUserType | boolean> {
        return this.userRepository.create(data, file)
    }
    async edit(id : string, data: User, file : Express.Multer.File | undefined) : Promise<User | null> {
        return this.userRepository.edit(id, data, file)
    }
    async delete(id : string) : Promise<boolean> {
        return this.userRepository.delete(id)
    }
    async findAllUsers() : Promise<User[] | null> {
        return this.userRepository.findAllUsers()
    }
    async verifyEmail(token : string) : Promise<{message: string, boolean: boolean} | undefined> {
        return this.userRepository.verifyEmail(token)
    }
}

export default UserService