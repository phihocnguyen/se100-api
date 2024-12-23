import { Invoice } from "@prisma/client"
import InvoiceRepository from "../repositories/invoice.repository"

class InvoiceService {
    private readonly invoiceRepository : InvoiceRepository

    constructor() {
        this.invoiceRepository = new InvoiceRepository()
    }

    async create(data : Invoice) : Promise<Invoice | null> {
        return await this.invoiceRepository.create(data)
    }
}

export default InvoiceService