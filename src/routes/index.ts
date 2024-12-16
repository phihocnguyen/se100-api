import { Router } from "express";
import UserRoute from "./user.route";
import CustomerRoute from "./customer.route";
import SupplierRoute from "./supplier.route";
import SupplyOrderRoute from "./supplyOrder.route";
import DisplayedProductRoute from "./displayedProduct.route";
import ProductRoute from "./product.route";
import SupplyOrderDetailRoute from "./supplyOrderDetail.route";
class IndexRoute {
    public readonly router : Router
    private readonly userRoute : UserRoute
    private readonly customerRoute : CustomerRoute
    private readonly supplierRoute : SupplierRoute
    private readonly supplyOrderRoute : SupplyOrderRoute
    private readonly displayedProductRoute : DisplayedProductRoute
    private readonly productRoute : ProductRoute
    private readonly supplyOrderDetailRoute : SupplyOrderDetailRoute
    constructor () {
        this.router = Router()
        this.userRoute = new UserRoute()
        this.customerRoute = new CustomerRoute()
        this.supplierRoute = new SupplierRoute()
        this.supplyOrderRoute = new SupplyOrderRoute()
        this.displayedProductRoute = new DisplayedProductRoute()
        this.productRoute = new ProductRoute()
        this.supplyOrderDetailRoute = new SupplyOrderDetailRoute()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.use('/user', this.userRoute.router)
        this.router.use('/customer',this.customerRoute.router)
        this.router.use('/supplier', this.supplierRoute.router)
        this.router.use('/supply-order', this.supplyOrderRoute.router)
        this.router.use('/dp', this.displayedProductRoute.router)
        this.router.use('/product', this.productRoute.router)
        this.router.use('/supply-order-detail', this.supplyOrderDetailRoute.router)
    }
}
export default new IndexRoute().router