import { Invoice, Status } from "@prisma/client";
import db from "../config/db";
import { sendInvoice } from "../helpers/verification-email-sender";
import v2Cloudinary from "../utils/cloudinary";
class InvoiceRepository {
    async create(data: Invoice, file : Express.Multer.File | undefined) : Promise<Invoice | null> {
        let url = ''
        await v2Cloudinary.uploader.upload(file!.path, (err, result) => {
            if (err) {
                return null
            }
            else {
                url = result!.url
            }
        })
        const newInvoice = await db.invoice.create(
            {
                data: {
                    ...data,
                    paymentImg: url || ''
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
            include: {
                customer: true
            }
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

    async updateInvoice(id : string, status : Status) : Promise<Invoice | null> {
        const invoice = await db.invoice.findUnique(
            {
                where: {
                    id
                },
                include: {
                    customer: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        )
        sendInvoice(invoice?.customer?.user?.email as string, status)
        const result = await db.invoice.update(
            {
                where: {
                    id
                },
                data: {
                    status: status
                }
            }
        )
        return result
    }
}

export default InvoiceRepository