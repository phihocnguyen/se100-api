import { Router } from "express"
import SupplyOrderDetailController from "../controllers/supplyOrderDetail.controller"

class SupplyOrderDetailRoute {
    private readonly supplyOrderDetailController : SupplyOrderDetailController
    public readonly router : Router
    constructor() {
        this.supplyOrderDetailController = new SupplyOrderDetailController()
        this.router = Router()
        this.router.post('/', this.supplyOrderDetailController.create.bind(this.supplyOrderDetailController))
    }
}
export default SupplyOrderDetailRoute