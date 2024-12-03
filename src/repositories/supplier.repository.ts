import { Supplier } from "@prisma/client"
import db from "../config/db"

type productsSuppliedType = {
    productsSupplied : string[]
}

class SupplierRepository {
    async create(data: Supplier) : Promise<Supplier | null> {
        const newSupplier = await db.supplier.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newSupplier
    }
    async edit(id : string, data: Supplier) : Promise<Supplier | null> {
        const result = await db.supplier.update(
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

    async delete (id : string) : Promise<boolean> {
        await db.supplier.delete({ where: { id } })
        return true
    }

    async getAllSuppliers () : Promise<Supplier[] | null> {
        const result = await db.supplier.findMany()
        return result
    }

    async getDetailSupplier (id : string) : Promise<Supplier | null> {
        const result = await db.supplier.findUnique(
            {
                where: {
                    id
                }
            }
        )
        return result
    }
    async getProductsSupplied (id : string) : Promise<{productsSupplied : string[]}  | null> {
        const result = await db.supplier.findUnique(
            {
                where: {
                    id
                },
                select: {
                    productsSupplied: true
                }
            }
        )
        return result
    }
}

export default SupplierRepository