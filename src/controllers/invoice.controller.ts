import { NextFunction, Request, Response } from "express"
import InvoiceService from "../services/invoice.service"
import { Status } from "@prisma/client"

class InvoiceController {
    private readonly invoiceService : InvoiceService

    constructor() {
        this.invoiceService = new InvoiceService()
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            req.body.totalPrice = parseInt(req.body.totalPrice)
            const newInvoice = await this.invoiceService.create(req.body, req.file)
            res.status(201).json(newInvoice)
        } catch (error : unknown) {
            next(error)
        } 
    }
    async getList(req: Request, res: Response, next: NextFunction){
        try {
            const list = await this.invoiceService.getList()
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        } 
    }
    async filterList(req: Request, res: Response, next: NextFunction){
        try {
            const list = await this.invoiceService.filterList(req.params.type as Status)
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        } 
    }
    async updateInvoice(req: Request, res: Response, next: NextFunction){
        try {
            const list = await this.invoiceService.updateInvoice(req.params.id, req.body.status)
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        } 
    }
    
}

export default InvoiceController