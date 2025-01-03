import { DisplayedProduct } from "@prisma/client";
import db from "../config/db";

class DisplayedProductRepository {
    async create(data : DisplayedProduct) : Promise<DisplayedProduct | null> {
        const existDP = await this.getDetail(data.productId)
        if (existDP?.length) {
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

    async filter(category: string, brand: string, camera: number, rom: number): Promise<DisplayedProduct[] | null> {
        const list = await db.displayedProduct.findMany({
            where: {
                product: {
                    category: {
                        categoryName: category
                    },
                    // Apply brand filter if provided, allow for multiple brands (Apple, Samsung, Xiaomi, Oppo)
                    brand: brand && ['Apple', 'Samsung', 'Xiaomi', 'Oppo'].includes(brand) ? brand : undefined,
                    
                    // Apply camera filter if camera is provided
                    camera: camera ? { gte: camera >= 11 && camera <= 15 ? 11 : 16 } : undefined, 
                    
                    // Apply ROM filter if ROM is provided
                    rom: rom ? { in: [64, 128, 256] } : undefined, 
                }
            },
            include: {
                    product: true
                }   
        });

        return list;
    }

    async filterPrice(status : string) : Promise<DisplayedProduct[] | null> {
        const sortOrder = status === 'L' ? 'asc' : status === 'H' ? 'desc' : undefined;
        const list = await db.displayedProduct.findMany({
            orderBy: {
                sellingPrice: sortOrder
            }
        });
        return list
    }
}

export default DisplayedProductRepository