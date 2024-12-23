import { NextFunction, Request, Response } from "express"
import InvoiceService from "../services/invoice.service"

class InvoiceController {
    private readonly invoiceService : InvoiceService

    constructor() {
        this.invoiceService = new InvoiceService()
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            const newInvoice = await this.invoiceService.create(req.body)
            res.status(201).json(newInvoice)
        } catch (error : unknown) {
            next(error)
        } 
    }
}

export default InvoiceController