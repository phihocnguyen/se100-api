import { Status, SupplyOrder } from "@prisma/client";
import db from "../config/db";

class SupplyOrderRepository {
    async create(data : SupplyOrder) : Promise<SupplyOrder | null> {
        const newSupplyOrder = await db.supplyOrder.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newSupplyOrder
    }

    async getById(id : string) : Promise<SupplyOrder | null> {
        const result = await db.supplyOrder.findUnique(
            {
                where: {
                    id
                }
            }
        )
        return result
    }

    async getAllSupplyOrders () : Promise<SupplyOrder[] | null> {
        const result = await db.supplyOrder.findMany()
        return result
    }
    async updateStatus (id : string, status: Status) : Promise<SupplyOrder | null> {
        const result = await db.supplyOrder.update(
            {
                where: {
                    id
                },
                data: {
                    status
                }
            }
        )
        return result
    } 
}

export default SupplyOrderRepository