import { Router } from "express";
import UserController from "../controllers/user.controller";
import upload from "../middleware/multer";

class UserRoute {
    private readonly userController : UserController
    public readonly router : Router 

    constructor () {
        this.userController = new UserController()
        this.router = Router()
        this.router.post('/', upload.single('image') ,this.userController.create.bind(this.userController))
    }
}
export default UserRoute