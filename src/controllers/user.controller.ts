import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import UserService from "../services/user.service";
import sendVerificationEmail from "../helpers/verification-email-sender";
import token from "../helpers/token";

class UserController {
    private readonly userService : UserService
    constructor () {
        this.userService = new UserService()
    }
    async login(req: Request, res: Response) {
        try {
            const {email, password} : {email: string, password: string} = req.body
            const result : any = await this.userService.login(email, password)
            if (result.token)
            {
                await sendVerificationEmail(email, result.token);
                res.status(200).json({message: 'Confirmation email sent', token: result.token})
            }
            else if (result.user) {
                res.cookie('token', result.accessToken).json({
                    account: result.user,
                    accessToken: result.accessToken
                })
            }
            else res.status(401).json('Unauthorized')
        } catch (error: unknown) {
            throw new Error(error as string)
        }
    }
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const data : User = req.body
            const newUser = await this.userService.create(data, req.file)
            res.status(201).json(newUser)
        } catch (error : unknown) {
            next(error)
        }
    }
    async edit(req: Request, res: Response) {
        try {
            const id : string = req.params.id
            const data : User = req.body
            const updatedUser = await this.userService.edit(id, data, req.file)
            res.status(200).json(updatedUser)
        } catch (error : unknown){
            throw new Error(error as string)
        }
    }
    async delete(req : Request, res: Response){
        try {
            const id : string = req.params.id
            const deletedStatus = await this.userService.delete(id)
            if (!deletedStatus) res.status(404).json('Id user not found')
            res.status(200).json(deletedStatus)
        } catch (error : unknown) {
            throw new Error(error as string)
        }
    }
    async getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = await this.userService.findAllUsers()
            res.status(200).json(allUsers)
        } catch (error : unknown){
            throw new Error(error as string)
        }
    }

    async verifyEmail(req: Request, res : Response) {
        try {
            const { token } = req.query
            const result = await this.userService.verifyEmail(token as string)
            if (result?.boolean === false) res.status(404).json(result)
            res.status(200).json(result)
        } catch (error : unknown){
            throw new Error(error as string)
        }
    }
}

export default UserController