import { Router } from "express";
import UserRoute from "./user.route";
import CustomerRoute from "./customer.route";
class IndexRoute {
    public readonly router : Router
    private readonly userRoute : UserRoute
    private readonly customerRoute : CustomerRoute

    constructor () {
        this.router = Router()
        this.userRoute = new UserRoute()
        this.customerRoute = new CustomerRoute()

        this.initRoutes()
    }

    private initRoutes() {
        this.router.use('/user', this.userRoute.router)
        this.router.use('/customer',this.customerRoute.router)
    }
}
export default new IndexRoute().router