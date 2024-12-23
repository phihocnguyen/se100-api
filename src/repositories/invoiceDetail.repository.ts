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
    async getList(invoiceId : string) : Promise<InvoiceDetail[] | null> {
        const list = await db.invoiceDetail.findMany(
            {
                where: {
                    invoiceId: invoiceId
                },
                include: {
                    displayedProduct: {
                        include: {
                            product: {
                                select: {
                                    image: true,
                                    productName: true
                                }
                            }
                        }
                    }
                }
            }
        )
        return list
    }
}
export default InvoiceDetailRepository