import { Router } from "express"
import InvoiceController from "../controllers/invoice.controller"
import upload from "../middleware/multer";
class InvoiceRoute {
    private readonly invoiceController : InvoiceController
    public readonly router : Router
    constructor() {
        this.invoiceController = new InvoiceController()
        this.router = Router()
        this.router.post('/', upload.single('image'), this.invoiceController.create.bind(this.invoiceController))
        this.router.get('/', this.invoiceController.getList.bind(this.invoiceController))
        this.router.get('/filter-list/:type', this.invoiceController.filterList.bind(this.invoiceController))
        this.router.patch('/:id', this.invoiceController.updateInvoice.bind(this.invoiceController))
    }


}
export default InvoiceRoute