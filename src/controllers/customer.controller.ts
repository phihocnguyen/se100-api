import { NextFunction, Request, Response } from "express";
import CustomerService from "../services/customer.service";

class CustomerController {
    private readonly customerService : CustomerService 
    constructor () {
        this.customerService = new CustomerService()
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newCustomer = await this.customerService.create(req.body)
            res.status(201).json(newCustomer)
        } catch (error : unknown) {
            next(error)
        } 
    }

    async getAllCustomers(req: Request, res:Response, next: NextFunction) {
        try {
            const result = await this.customerService.getAllCustomers()
            res.status(200).json(result)
        } catch (error : unknown) {
            next(error)
        }
    }

    async getDetailCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const id : string = req.params.id
            const result = await this.customerService.getDetailCustomer(id)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }
    async getCustomerByUser(req : Request, res: Response, next: NextFunction) {
        try {
            const userId : string = req.params.userId 
            const result = await this.customerService.getCustomerByUser(userId)
            res.status(200).json(result)
        } catch (error : unknown) {
            next(error)
        }
    }
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const id : string = req.params.id
            const result = await this.customerService.edit(id, req.body)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id : string = req.params.id
            const result = await this.customerService.delete(id)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }


}

export default CustomerController