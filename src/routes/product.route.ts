import { Router } from "express"
import ProductController from "../controllers/product.controller"

class ProductRoute {
    private readonly productController : ProductController 
    public readonly router : Router  

    constructor() {
        this.productController = new ProductController()
        this.router = Router()
        this.router.post('/', this.productController.create.bind(this.productController))
    }
}
export default ProductRoute