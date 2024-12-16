import { Product } from "@prisma/client";
import db from "../config/db";

class ProductRepository {
    
    async create(data : Product) : Promise<Product | null>{
        const newProduct = await db.product.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newProduct
    }
}
export default ProductRepository