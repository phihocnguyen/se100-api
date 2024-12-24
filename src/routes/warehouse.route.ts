import { Router } from "express"
import warehouseController from "../controllers/warehouse.controller"

class warehouseRoute {
    private readonly warehouseController : warehouseController
    public readonly router : Router
    constructor() {
        this.warehouseController = new warehouseController()
        this.router = Router()
        this.router.post('/', this.warehouseController.create.bind(this.warehouseController))
        this.router.get('/', this.warehouseController.getList.bind(this.warehouseController))
    }
}
export default warehouseRoute