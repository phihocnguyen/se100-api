import { NextFunction, Request, Response } from "express"
import SupplyOrderService from "../services/supplyOrder.service"
import { Status } from "@prisma/client"

class SupplyOrderController {
    private readonly supplyOrderService : SupplyOrderService

    constructor() {
        this.supplyOrderService = new SupplyOrderService()
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            const newSupplyOrder = await this.supplyOrderService.create(req.body)
            res.status(201).json(newSupplyOrder)
        } catch (error : unknown) {
            next(error)
        }
    }

    async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id : string = req.params.id
            const result = await this.supplyOrderService.getById(id)
            res.status(201).json(result)
        } catch (error : unknown) {
            next(error)
        }
    }

    async getAllSupplyOrders(req: Request, res: Response, next:NextFunction) {
        try {
            const result = await this.supplyOrderService.getAllSupplyOrders()
            res.status(200).json(result) 
        } catch (error : unknown) {
            next(error)
        }
    }
    async updateStatus(req: Request, res: Response, next:NextFunction) {
        try {
            const id : string = req.params.id 
            const status : Status = req.body.status
            const result = await this.supplyOrderService.updateStatus(id, status)
            res.status(200).json(result) 
        } catch (error : unknown) {
            next(error)
        }
    }
}
export default SupplyOrderController