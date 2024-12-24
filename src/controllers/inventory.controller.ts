import { NextFunction, Request, Response } from "express"
import InventoryService from "../services/inventory.service"

class InventoryController {
    private readonly inventoryService : InventoryService

    constructor() {
        this.inventoryService = new InventoryService()
    }

    async create(req : Request, res: Response, next: NextFunction){
        try {
            const newInventory = await this.inventoryService.create(req.body)
            res.status(201).json(newInventory)
        } catch (error : unknown) {
            next(error)
        }
    }
    async getByProduct(req : Request, res: Response, next: NextFunction){
        try {
            const list = await this.inventoryService.getByProdut(req.params.SKU)
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }
    async update(req : Request, res: Response, next: NextFunction){
        try {
            const result = await this.inventoryService.update(req.params.id, req.body)
            res.status(200).json(result)
        } catch (error : unknown) {
            next(error)
        }
    }
}
export default InventoryController