import { InvoiceDetail } from "@prisma/client";
import db from "../config/db";

class InvoiceDetailRepository {
    async create(data : InvoiceDetail) : Promise<InvoiceDetail | null> {
        const displayedProduct = await db.displayedProduct.findUnique(
            {
                where: {
                    id: data.displayedProductId
                },
                include: {
                    product: true
                }
            }
        )
        const inventory = await db.inventory.findFirst(
            {
                where: {
                    productSKU: displayedProduct?.product.SKU
                }
            }
        )
        if ((inventory?.quantity) && inventory?.quantity < data.quantity) {
            await db.invoice.delete(
                {
                    where: {
                        id: data.invoiceId
                    }
                }
            )
        }
        const newInvoiceDetail = await db.invoiceDetail.create(
            {
                data: {
                    ...data
                }
            }
        )
        await db.inventory.update(
            {
                where: {
                    id: inventory?.id
                },
                data: {
                    quantity: {
                        decrement: data.quantity
                    }
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