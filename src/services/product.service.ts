import { Product } from "@prisma/client"
import ProductRepository from "../repositories/product.repository"

class ProductService {
    private readonly productRepository : ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }
    async create(data : Product) : Promise<Product | null> {
        return await this.productRepository.create(data)
    }
}
export default ProductService