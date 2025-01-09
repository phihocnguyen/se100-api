import { Voucher } from "@prisma/client";
import db from "../config/db";

class VoucherRepository {
    async create(data: Voucher): Promise<Voucher | null> {
        const newVoucher = await db.voucher.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newVoucher
    }
    async getVouchers(): Promise<Voucher[] | null> {
        const list = await db.voucher.findMany()
        return list
    }
    async edit(id: string, data: Voucher): Promise<Voucher | null> {
        const result = await db.voucher.update(
            {
                where: {
                    id
                },
                data: {
                    ...data
                }
            }
        )
        return result
    }

    async delete(id: string): Promise<boolean> {
        if (!id) return false
        await db.voucher.delete({
            where: {
                id
            }
        })
        return true
    }

    async isInRange(name: string, currentDate: Date): Promise<Voucher | null> {
        const voucher = await db.voucher.findUnique(
            {
                where: {
                    name,
                    startDate: {
                        lte: currentDate
                    },
                    endDate: {
                        gte: currentDate
                    }

                }
            }
        )
        if (!voucher) return null
        return voucher


    }
}

export default VoucherRepository