import { NextFunction, Request, Response } from "express"
import InvoiceDetailService from "../services/invoiceDetail.service"

class InvoiceDetailController {
    private readonly invoiceDetailService : InvoiceDetailService

    constructor() {
        this.invoiceDetailService = new InvoiceDetailService()
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newInvoiceDetail = await this.invoiceDetailService.create(req.body)
            res.status(201).json(newInvoiceDetail)
        } catch (error : unknown) {
            next(error)
        }
    }
}

export default InvoiceDetailController