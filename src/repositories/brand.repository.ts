import { Brand } from "@prisma/client";
import db from "../config/db";

class BrandRepository {
    async create(data : Brand) : Promise<Brand | null>{
        const newBrand = await db.brand.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newBrand
    }
    async getBrands(categoryId : string) : Promise<Brand[] | null> {
        const list = await db.brand.findMany(
            {
                where: {
                    categoryId
                }
            }
        )
        return list
    }
}

export default BrandRepository