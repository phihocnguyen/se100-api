import { NextFunction, Request, Response } from "express"
import BrandService from "../services/brand.service"

class BrandController {
    private readonly brandService : BrandService

    constructor() {
        this.brandService = new BrandService()
    }

    async create(req : Request, res: Response, next: NextFunction){
        try {
            const newBrand = await this.brandService.create(req.body)
            res.status(200).json(newBrand)
        } catch (error : unknown){
            next(error)

        }
    }

    async getBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const list = await this.brandService.getBrands(req.params.categoryId)
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }
}
export default BrandController