import { Router } from "express";
import UserRoute from "./user.route";
class IndexRoute {
    private readonly userRoute : UserRoute
    public readonly router : Router

    constructor () {
        this.router = Router()
        this.userRoute = new UserRoute()

        this.initRoutes()
    }

    private initRoutes() {
        this.router.use('/user', this.userRoute.router)
    }
}
export default new IndexRoute().router