import { Inventory } from "@prisma/client";
import db from "../config/db";

class InventoryRepository {
    async create(data : Inventory | any) : Promise<Inventory | null> {
        const newInventory = await db.inventory.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newInventory
    }
    async getByProduct(SKU : string) : Promise<Inventory | null> {
        const result = await db.inventory.findFirst(
            {
                where: {
                    productSKU: SKU
                }
            }
        )
        return result
    }
    async update(id : string, data : any) : Promise<Inventory | null> {
        const result = await db.inventory.update(
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
}
export default InventoryRepository