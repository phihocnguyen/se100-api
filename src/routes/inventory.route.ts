import { Router } from "express"
import InventoryController from "../controllers/inventory.controller"

class InventoryRoute {
    private readonly inventoryController : InventoryController
    public readonly router : Router

    constructor() {
        this.inventoryController = new InventoryController()
        this.router = Router()
        this.router.post('/', this.inventoryController.create.bind(this.inventoryController))
        this.router.get('/:SKU', this.inventoryController.getByProduct.bind(this.inventoryController))
        this.router.patch('/:id', this.inventoryController.update.bind(this.inventoryController))
        this.router.get('/', this.inventoryController.getList.bind(this.inventoryController))
    }
}
export default InventoryRoute