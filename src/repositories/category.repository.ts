import { Category, Product } from "@prisma/client";
import db from "../config/db";

type CustomCategory = {
    id: string,
    categoryName: string,
    productCount: number,
}

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

    async getCategoryList() : Promise<CustomCategory[] | null> {
        const categories = await db.category.findMany()
        const list: CustomCategory[] = [];
        for (const c of categories) {
            const products = await this.getProductByCategory(c.id);
            list.push({
                id: c.id,
                categoryName: c.categoryName,
                productCount: products.length,
            });
        }

        return list; 
    }

    async getProductByCategory(categoryId: string) : Promise<Product[]> {
        const products = await db.product.findMany(
            {
                where: {
                    categoryId
                }
            }
        );

        return products ? products : [];
    }
}

export default CategoryRepository