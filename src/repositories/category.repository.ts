import { Category } from "@prisma/client";
import db from "../config/db";

class CategoryRepository {
    async create(data : Category) : Promise<Category | null> {
        const newCategory = await db.category.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newCategory
    }
    async getCategoryList() : Promise<Category[] | null> {
        const list = await db.category.findMany()
        return list
    }
}

export default CategoryRepository