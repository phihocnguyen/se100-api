import { NextFunction, Request, Response } from "express";
import VoucherService from "../services/voucher.service";

class VoucherController {
    private readonly voucherService: VoucherService
    constructor() {
        this.voucherService = new VoucherService()
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newVoucher = await this.voucherService.create(req.body)
            res.status(201).json(newVoucher)
        } catch (error: unknown) {
            next(error)
        }
    }

    async getVouchers(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.voucherService.getVouchers()
            res.status(200).json(result)
        } catch (error: unknown) {
            next(error)
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const id: string = req.params.id
            const result = await this.voucherService.edit(id, req.body)
            res.status(200).json(result)
        } catch (error: unknown) {
            next(error)
        }
    }
    async isInRange(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.voucherService.isInRange(req.body.name, req.body.currentDate)
            res.status(200).json(result)
        } catch (error: unknown) {
            next(error)
        }
    }



}

export default VoucherController