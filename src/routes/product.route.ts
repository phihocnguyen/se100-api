import { Router } from "express"
import ProductController from "../controllers/product.controller"
import upload from "../middleware/multer"

class ProductRoute {
    private readonly productController : ProductController 
    public readonly router : Router  

    constructor() {
        this.productController = new ProductController()
        this.router = Router()
        this.router.post('/', upload.array('images', 10) ,this.productController.create.bind(this.productController))
        this.router.get('/get-product/:supplierId', this.productController.findProductsBySupplier.bind(this.productController))
        this.router.get('/', this.productController.getList.bind(this.productController))
        this.router.get('/:SKU', this.productController.getProductBySKU.bind(this.productController))
        this.router.patch('/:SKU', upload.array('images', 10) ,this.productController.update.bind(this.productController))
    }
}
export default ProductRoute