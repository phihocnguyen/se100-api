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
        this.router.get('/', this.userController.getAllUsers.bind(this.userController))
        this.router.delete('/:id', this.userController.delete.bind(this.userController))
        this.router.patch('/:id', upload.single('image'), this.userController.edit.bind(this.userController))
        this.router.post('/login', this.userController.login.bind(this.userController))
        this.router.get('/verify', this.userController.verifyEmail.bind(this.userController))
    }
}
export default UserRoute