import { Invoice, Status } from "@prisma/client"
import InvoiceRepository from "../repositories/invoice.repository"

class InvoiceService {
    private readonly invoiceRepository : InvoiceRepository

    constructor() {
        this.invoiceRepository = new InvoiceRepository()
    }

    async create(data : Invoice, file : Express.Multer.File | undefined) : Promise<Invoice | null> {
        return await this.invoiceRepository.create(data, file)
    }
    async getList() : Promise<Invoice[] | null> {
        return await this.invoiceRepository.getList()
    }
    async filterList(type : Status) : Promise<Invoice[] | null> {
        return await this.invoiceRepository.filterList(type)
    }
    async updateInvoice(id : string, status: Status) : Promise<Invoice | null> {
        return await this.invoiceRepository.updateInvoice(id, status)
    }
}

export default InvoiceService