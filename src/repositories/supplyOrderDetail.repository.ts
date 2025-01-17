import { SupplyOrderDetail } from "@prisma/client";
import db from "../config/db";

class SupplyOrderDetailRepository {
    async create(data : SupplyOrderDetail) : Promise<SupplyOrderDetail | null> {
        const result = await db.supplyOrderDetail.create(
            {
                data: {
                    ...data
                }
            }
        )
        return result
    }
    async getList() : Promise<SupplyOrderDetail[] | null> {
        const result = await db.supplyOrderDetail.findMany()
        return result
    }
} 
export default SupplyOrderDetailRepository