import { Router } from "express";
import UserRoute from "./user.route";
import CustomerRoute from "./customer.route";
import SupplierRoute from "./supplier.route";
import SupplyOrderRoute from "./supplyOrder.route";
class IndexRoute {
    public readonly router : Router
    private readonly userRoute : UserRoute
    private readonly customerRoute : CustomerRoute
    private readonly supplierRoute : SupplierRoute
    private readonly supplyOrderRoute : SupplyOrderRoute
    constructor () {
        this.router = Router()
        this.userRoute = new UserRoute()
        this.customerRoute = new CustomerRoute()
        this.supplierRoute = new SupplierRoute()
        this.supplyOrderRoute = new SupplyOrderRoute()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.use('/user', this.userRoute.router)
        this.router.use('/customer',this.customerRoute.router)
        this.router.use('/supplier', this.supplierRoute.router)
        this.router.use('/supplyorder', this.supplyOrderRoute.router)
    }
}
export default new IndexRoute().router