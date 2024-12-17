import { NextFunction, Request, Response } from "express"
import ProductService from "../services/product.service"

class ProductController {
    private readonly productService : ProductService

    constructor(){
        this.productService = new ProductService()
    }
    async create(req: Request, res: Response, next: NextFunction){
        try {
            req.body.purchasePrice = parseInt(req.body.purchasePrice)
            req.body.sellingPrice = parseInt(req.body.sellingPrice)
            const newProduct = await this.productService.create(req.body, req.file)
            res.status(201).json(newProduct)
        } catch (error : unknown) {
            next(error)
        }
    }
    async findProductsBySupplier(req : Request, res: Response, next: NextFunction){
        try {
            const list = await this.productService.findProductsBySupplier(req.params.supplierId)
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }
}
export default ProductController