import { NextFunction, Request, Response } from "express"
import ProductService from "../services/product.service"

class ProductController {
    private readonly productService : ProductService

    constructor(){
        this.productService = new ProductService()
    }
    async create(req: Request, res: Response, next: NextFunction){
        const newProduct = await this.productService.create(req.body)
        res.status(201).json(newProduct)
    }
}
export default ProductController