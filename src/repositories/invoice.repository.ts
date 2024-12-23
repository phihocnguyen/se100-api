import { Invoice } from "@prisma/client";
import db from "../config/db";

class InvoiceRepository {
    async create(data: Invoice) : Promise<Invoice | null> {
        const newInvoice = await db.invoice.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newInvoice
    }
}

export default InvoiceRepository