import { NextFunction, Request, Response } from "express"
import SupplierService from "../services/supplier.service"

class SupplierController {
    private readonly supplierService : SupplierService

    constructor() {
        this.supplierService = new SupplierService()
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            const newSupplier = await this.supplierService.create(req.body)
            res.status(201).json(newSupplier)
        } catch (error : unknown) {
            next(error)
        }
    }

    async edit (req: Request, res: Response, next: NextFunction){
        try {
            const id : string = req.params.id
            const result = await this.supplierService.edit(id, req.body)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }

    async delete (req: Request, res: Response, next: NextFunction){
        try {
            const id : string = req.params.id
            const result = await this.supplierService.delete(id)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }

    async getAllSuppliers (req: Request, res: Response, next: NextFunction){
        try {
            const result = await this.supplierService.getAllSuppliers()
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }
    async getDetailSupplier (req: Request, res: Response, next: NextFunction){
        try {
            const id : string = req.params.id
            const result = await this.supplierService.getDetailSupplier(id)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }
}
export default SupplierController