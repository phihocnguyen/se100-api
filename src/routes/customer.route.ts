import { Router } from "express";
import UserController from "../controllers/user.controller";
import upload from "../middleware/multer";
import CustomerController from "../controllers/customer.controller";

class CustomerRoute {
    private readonly customerController : CustomerController
    public readonly router : Router 

    constructor () {
        this.customerController = new CustomerController()
        this.router = Router()
        this.router.post('/',this.customerController.create.bind(this.customerController))
        this.router.get('/',this.customerController.getAllCustomers.bind(this.customerController))
        this.router.get('/:id',this.customerController.getDetailCustomer.bind(this.customerController))
        this.router.patch('/:id',this.customerController.edit.bind(this.customerController))
        this.router.delete('/:id',this.customerController.delete.bind(this.customerController))
    }
}
export default CustomerRoute