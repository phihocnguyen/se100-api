import { InvoiceDetail } from "@prisma/client";
import db from "../config/db";

class InvoiceDetailRepository {
    async create(data : InvoiceDetail) : Promise<InvoiceDetail | null> {
        const newInvoiceDetail = await db.invoiceDetail.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newInvoiceDetail
    }
}
export default InvoiceDetailRepository