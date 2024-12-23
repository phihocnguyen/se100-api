import { DisplayedProduct } from "@prisma/client";
import db from "../config/db";

class DisplayedProductRepository {
    async create(data : DisplayedProduct) : Promise<DisplayedProduct | null> {
        const existDP = await this.getDetail(data.productId)
        if (existDP) {
            return await db.displayedProduct.update(
                {
                    where: {
                        id: existDP[0].id
                    },
                    data: {
                        ...data,
                        quantity: existDP[0].quantity + data.quantity
                    }
                }
            )
        }
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
        const list = await db.displayedProduct.findMany(
            {
                include: {
                    product: true
                }
            }
        )
        return list
    }
    async getDetail(SKU : string) : Promise<DisplayedProduct[] | null> {
        const detailProduct = await db.displayedProduct.findMany(
            {
                where: {
                    productId: SKU
                }
            }
        )
        return detailProduct
    }
}

export default DisplayedProductRepository