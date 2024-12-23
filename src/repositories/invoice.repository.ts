import { Invoice, Status } from "@prisma/client";
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
    async getList(): Promise<Invoice[] | null> {
        const list = await db.invoice.findMany({
            orderBy: {
                createdAt: 'asc', // Sắp xếp tăng dần theo createdAt
            },
        });
        return list;
    }
    async filterList(type : Status) : Promise<Invoice[] | null> {
        const list = await db.invoice.findMany(
            {
                where: {
                    status: type
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        )
        return list
    }
}

export default InvoiceRepository