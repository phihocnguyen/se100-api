import { Product } from "@prisma/client";
import db from "../config/db";
import v2Cloudinary from "../utils/cloudinary";

class ProductRepository {
    
    async create(data : Product, files : any) : Promise<Product | null>{
        let url : string[] = []
        if (files!.length > 0) {
            for (const file of files!){
                await v2Cloudinary.uploader.upload(file!.path, (err : unknown, result : any) => {
                    if (err) {
                            return null
                        } else {
                            url.push(result!.url)
                        }
                    })
                }
        }
        const newProduct = await db.product.create(
            {
                data: {
                    ...data,
                    image: url[0] || '',
                    featuresImages: url.slice(1) || []
                }
            }
        )
        return newProduct
    }
    async getList(): Promise<Product[] | null> {
        const list = await db.product.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        })
        return list;
    }
    async findProductsBySupplier(supplierId : string) : Promise<Product[] | null>{
        const list = await db.product.findMany(
            {
                where: {
                    supplierId
                }
            }
        )
        return list
    }

    async getProductBySKU(productSKU: string) : Promise<Product | null> {
        const product = await db.product.findUnique(
            {
                where: {
                    SKU : productSKU
                },
                include: {
                    supplier: {
                        select: {
                            supplierName: true
                        }
                    },
                    category: {
                        select: {
                            categoryName: true
                        }
                    }
                }
            }
        )
        return product
    }

    async update(data: Product, files : any, SKU : string) : Promise<Product | null> {
        let url : string[] = []
        if (files!.length > 0) {
            for (const file of files!){
                await v2Cloudinary.uploader.upload(file!.path, (err : unknown, result : any) => {
                    if (err) {
                            return null
                        } else {
                            url.push(result!.url)
                        }
                    })
                }
        }
        const oldProduct = await this.getProductBySKU(SKU)
        const result = await db.product.update(
            {
                where: {
                    SKU: SKU
                },
                data: {
                    ...data,
                    image: url[0] || oldProduct!.image,
                    featuresImages: url.slice(1) || oldProduct!.featuresImages
                }
            }
        )
        return result
    }
}
export default ProductRepository