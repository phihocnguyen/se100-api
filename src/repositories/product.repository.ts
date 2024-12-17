import { Product } from "@prisma/client";
import db from "../config/db";
import v2Cloudinary from "../utils/cloudinary";

class ProductRepository {
    
    async create(data : Product, file : Express.Multer.File | undefined) : Promise<Product | null>{
        let url = ''
        await v2Cloudinary.uploader.upload(file!.path, (err, result) => {
            if (err) {
                return null
            } else {
                url = result!.url
            }
        })
        const newProduct = await db.product.create(
            {
                data: {
                    ...data,
                    image: url
                }
            }
        )
        return newProduct
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
}
export default ProductRepository