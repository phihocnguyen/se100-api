import { Request, Response } from "express";
import { User } from "@prisma/client";
import UserService from "../services/user.service";

class UserController {
    private readonly userService : UserService 
    constructor () {
        this.userService = new UserService()
    }

    async create(req: Request, res: Response){
        try {
            const data : User = req.body 
            const newUser = await this.userService.create(data)
            res.status(201).json(newUser)
        } catch (error : unknown) {
            throw new Error(error as string)
        }
    }
    async hello(req: Request, res: Response){
        try {
            res.send('hello world')
        } catch (error : unknown) {
            throw new Error(error as string)
        }
    }
}

export default UserController