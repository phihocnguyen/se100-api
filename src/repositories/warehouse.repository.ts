import { Warehouse } from "@prisma/client";
import db from "../config/db";

class warehouseRepository {
    async create(data : Warehouse) : Promise<Warehouse | null> {
        const newWarehouse = await db.warehouse.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newWarehouse
    }
    async getList() : Promise<Warehouse[] | null> {
        const list = await db.warehouse.findMany()
        return list
    }
}

export default warehouseRepository