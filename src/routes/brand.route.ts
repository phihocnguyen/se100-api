import { Router } from "express"
import BrandController from "../controllers/brand.controller"

class BrandRoute {
    private readonly brandController : BrandController
    public readonly router : Router

    constructor() {
        this.brandController = new BrandController()
        this.router = Router()
        this.router.post('/', this.brandController.create.bind(this.brandController))
        this.router.get('/:categoryId', this.brandController.getBrands.bind(this.brandController))
    }
}
export default BrandRoute