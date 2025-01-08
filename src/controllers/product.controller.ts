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
            req.body.rom = parseInt(req.body.rom)
            req.body.camera = parseInt(req.body.camera)
            req.body.ram = parseInt(req.body.ram)
            req.body.hardDrive = parseInt(req.body.hardDrive)
            const newProduct = await this.productService.create(req.body, req.files)
            res.status(201).json(newProduct)
        } catch (error : unknown) {
            next(error)
        }
    }

    async getList(req: Request, res: Response, next: NextFunction){
        try {
            const list = await this.productService.getList()
            res.status(200).json(list)
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
    async getProductBySKU(req: Request, res: Response, next: NextFunction){
        try {
            const product = await this.productService.getProductBySKU(req.params.SKU)
            res.status(200).json(product)
        } catch (error : unknown) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            if(req.body.purchasePrice) req.body.purchasePrice = parseInt(req.body.purchasePrice)
            if(req.body.sellingPrice)  req.body.sellingPrice = parseInt(req.body.sellingPrice)
            const updatedProduct = await this.productService.update(req.body, req.files, req.params.SKU)
            res.status(200).json(updatedProduct)
        } catch (error : unknown) {
            next(error)
        } 
    }
    async getProductByBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.productService.getProductByBrand(req.params.brand)
            res.status(200).json(result)
        } catch (error : unknown) {
            next(error)
        }
    }
}
export default ProductController