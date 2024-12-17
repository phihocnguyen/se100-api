import { Category } from "@prisma/client"
import CategoryRepository from "../repositories/category.repository"

class CategoryService {
    private readonly categoryRepository : CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepository()
    }
    async create (data: Category) : Promise<Category | null> {
        return await this.categoryRepository.create(data)
    }
}
export default CategoryService