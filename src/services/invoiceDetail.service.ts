import { InvoiceDetail } from "@prisma/client";
import InvoiceDetailRepository from "../repositories/invoiceDetail.repository";

class InvoiceDetailService {
    private readonly invoiceDetailRepository : InvoiceDetailRepository

    constructor() {
        this.invoiceDetailRepository = new InvoiceDetailRepository()
    }

    async create(data : InvoiceDetail) : Promise<InvoiceDetail | null> {
        return await this.invoiceDetailRepository.create(data)
    }
    async getList(invoiceId : string) : Promise<InvoiceDetail[] | null> {
        return await this.invoiceDetailRepository.getList(invoiceId)
    }
}
export default InvoiceDetailService