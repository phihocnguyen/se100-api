import { NextFunction, Request, Response } from "express"
import warehouseService from "../services/warehouse.service"

class warehouseController {
    private readonly warehouseService : warehouseService
    
    constructor() {
        this.warehouseService = new warehouseService()
    }
    async create(req : Request, res: Response, next: NextFunction) {
        try {
            const newWarehouse =  await this.warehouseService.create(req.body)
            res.status(201).json(newWarehouse)
        } catch (error : unknown) {
            next(error)
        }
    }
    async getList(req : Request, res: Response, next: NextFunction) {
        try {
            const list =  await this.warehouseService.getList()
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }
    
}
export default warehouseController