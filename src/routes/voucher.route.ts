import { Router } from "express";

import upload from "../middleware/multer";
import VoucherController from "../controllers/voucher.controller";

class VoucherRoute {
    private readonly customerController: VoucherController
    public readonly router: Router

    constructor() {
        this.customerController = new VoucherController()
        this.router = Router()
        this.router.post('/', this.customerController.create.bind(this.customerController))
        this.router.get('/', this.customerController.create.bind(this.customerController))
        this.router.post('/check', this.customerController.create.bind(this.customerController))
    }
}
export default VoucherRoute