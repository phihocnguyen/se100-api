import { NextFunction, Request, Response } from "express"
import DisplayedProductService from "../services/displayedProduct.service"

class DisplayedProductController {
    private readonly displayedProductService : DisplayedProductService

    constructor() {
        this.displayedProductService = new DisplayedProductService()
    }

    async create(req : Request, res : Response, next : NextFunction){
        try {
            const newDP = await this.displayedProductService.create(req.body)
            res.status(201).json(newDP)
        } catch (error : unknown) {
            next(error)
        }
    }
    async getList(req : Request, res : Response, next : NextFunction){
        try {
            const list = await this.displayedProductService.getList()
            res.status(201).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }
    async getDetail(req: Request, res: Response, next: NextFunction){
        try {
            const detailProduct = await this.displayedProductService.getDetail(req.params.SKU)
            res.status(200).json(detailProduct)
        } catch (error : unknown) {
            next(error)
        }
    }
    async filter(req: Request, res: Response, next: NextFunction){
        try {
            const list = await this.displayedProductService.filter(req.params.category, req.query.brand as string, parseInt(req.query.camera as string), parseInt(req.query.rom as string), req.query.RAM as string, req.query.HardDrive as string, req.query.CPU as string, parseInt(req.query.price as string))
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }
    async filterPrice(req: Request, res: Response, next: NextFunction){
        try {
            const list = await this.displayedProductService.filterPrice(req.params.status)
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }

    
    async getDisplayedProductsByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryName: string = req.params.categoryName;
            const limit = parseInt(req.query.limit as string, 10);
            if (!categoryName || isNaN(limit)) {
                throw new Error("Query or parameter is not valid");
            }

            const result = await this.displayedProductService.getDisplayedProducts(categoryName, limit);
            res.status(200).json(result);
        } catch (error: unknown) { 
            next(error);
        }
    }
}

export default DisplayedProductController