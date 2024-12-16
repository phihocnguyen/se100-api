import { DisplayedProduct } from "@prisma/client";
import db from "../config/db";

class DisplayedProductRepository {
    async create(data : DisplayedProduct) : Promise<DisplayedProduct | null> {
        const newDP = await db.displayedProduct.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newDP
    }
    async getList() : Promise<DisplayedProduct[] | null> {
        const list = await db.displayedProduct.findMany()
        return list
    }
}

export default DisplayedProductRepository