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
            const list = await this.displayedProductService.filter(req.params.category, req.query.brand as string, parseInt(req.query.camera as string), parseInt(req.query.rom as string))
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
}

export default DisplayedProductController