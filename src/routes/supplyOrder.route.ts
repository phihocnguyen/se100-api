import { Router } from "express";
import SupplyOrderController from "../controllers/supplyOrder.controller";

class SupplyOrderRoute {
    private readonly supplyOrderController : SupplyOrderController
    public readonly router : Router 

    constructor () {
        this.supplyOrderController = new SupplyOrderController()
        this.router = Router()
        this.router.post('/', this.supplyOrderController.create.bind(this.supplyOrderController))
        this.router.get('/', this.supplyOrderController.getAllSupplyOrders.bind(this.supplyOrderController))
        this.router.get('/:id', this.supplyOrderController.getById.bind(this.supplyOrderController))
        this.router.patch('/:id', this.supplyOrderController.updateStatus.bind(this.supplyOrderController))
    }
}
export default SupplyOrderRoute