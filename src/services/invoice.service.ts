import { Invoice, Status } from "@prisma/client"
import InvoiceRepository from "../repositories/invoice.repository"

class InvoiceService {
    private readonly invoiceRepository : InvoiceRepository

    constructor() {
        this.invoiceRepository = new InvoiceRepository()
    }

    async create(data : Invoice) : Promise<Invoice | null> {
        return await this.invoiceRepository.create(data)
    }
    async getList() : Promise<Invoice[] | null> {
        return await this.invoiceRepository.getList()
    }
    async filterList(type : Status) : Promise<Invoice[] | null> {
        return await this.invoiceRepository.filterList(type)
    }
}

export default InvoiceService