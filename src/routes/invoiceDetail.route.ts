import { Router } from "express"
import InvoiceDetailController from "../controllers/invoiceDetail.controller"

class InvoiceDetailRoute {
    private readonly invoiceDetailController : InvoiceDetailController
    public readonly router : Router
    constructor() {
        this.invoiceDetailController = new InvoiceDetailController()
        this.router = Router()
        this.router.post('/', this.invoiceDetailController.create.bind(this.invoiceDetailController))
        this.router.get('/:invoiceId', this.invoiceDetailController.getList.bind(this.invoiceDetailController))
    }


}
export default InvoiceDetailRoute