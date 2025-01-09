import { Router } from "express";
import UserController from "../controllers/user.controller";
import upload from "../middleware/multer";
import CustomerController from "../controllers/customer.controller";

class VoucherRoute {
    private readonly customerController: CustomerController
    public readonly router: Router

    constructor() {
        this.customerController = new CustomerController()
        this.router = Router()
        this.router.post('/', this.customerController.create.bind(this.customerController))
        this.router.get('/', this.customerController.create.bind(this.customerController))
        this.router.post('/check', this.customerController.create.bind(this.customerController))
    }
}
export default VoucherRoute