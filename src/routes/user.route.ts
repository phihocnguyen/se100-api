import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoute {
    private readonly userController : UserController
    public readonly router : Router 

    constructor () {
        this.userController = new UserController()
        this.router = Router()
        this.router.get('/', this.userController.create.bind(this.userController))
        this.router.get('/hello', this.userController.hello.bind(this.userController))
    }
}
export default UserRoute