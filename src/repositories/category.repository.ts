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
}

export default CategoryRepository