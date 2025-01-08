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

    async filter(
        category: string,
        brand: string,
        camera: number,
        rom: number,
        ram: string,
        hardDrive: string,
        CPU: string,
        price: number
      ): Promise<DisplayedProduct[] | null> {
        // Extract numerical values from RAM and HardDrive
        ram = ram && ram.split("G")[0];
        hardDrive = hardDrive && hardDrive.split("G")[0];
      
        const list = await db.displayedProduct.findMany({
          where: {
            product: {
              category: {
                categoryName: category,
              },
              sellingPrice: price ? { lte: price, gte: 10000000 } : undefined,
              brand: brand ? brand : undefined,

              camera: camera
                ? {
                    gte: camera >= 11 && camera <= 15 ? 11 : 16,
                  }
                : undefined,
      

              rom: rom ? { in: [64, 128, 256] } : undefined,
      

              ram: ram ? { equals: +ram } : undefined, 

              hardDrive: hardDrive ? { equals: +hardDrive } : undefined,
      

              cpu: CPU ? { contains: CPU } : undefined, 
            },
          },
          include: {
            product: true,
          },
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