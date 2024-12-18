import { Brand } from "@prisma/client"
import BrandRepository from "../repositories/brand.repository"

class BrandService {
    private readonly brandRepository : BrandRepository

    constructor() {
        this.brandRepository = new BrandRepository()
    }

    async create(data : Brand) : Promise<Brand | null> {
        return await this.brandRepository.create(data)
    }
    async getBrands(categoryId : string) : Promise<Brand[] | null> {
        return await this.brandRepository.getBrands(categoryId)
    }
}

export default BrandService