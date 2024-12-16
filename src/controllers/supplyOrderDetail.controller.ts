import { NextFunction, Request, Response } from "express"
import SupplyOrderDetailService from "../services/supplyOrderDetail.service"

class SupplyOrderDetailController {
    private readonly supplyOrderDetailService : SupplyOrderDetailService

    constructor() {
        this.supplyOrderDetailService = new SupplyOrderDetailService()
    }

    async create(req : Request, res: Response, next: NextFunction){
        try {
            const result = await this.supplyOrderDetailService.create(req.body)
            res.status(201).json(result)
        } catch (error : unknown) {
            next(error)
        }
    }
}
export default SupplyOrderDetailController