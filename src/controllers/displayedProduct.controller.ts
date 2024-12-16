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
}

export default DisplayedProductController