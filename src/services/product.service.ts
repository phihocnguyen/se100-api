import { Product } from "@prisma/client"
import ProductRepository from "../repositories/product.repository"

class ProductService {
    private readonly productRepository : ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }
    async create(data : Product, file : Express.Multer.File | undefined) : Promise<Product | null> {
        return await this.productRepository.create(data, file)
    }
    async findProductsBySupplier(supplierId : string) : Promise<Product[] | null>{
        return await this.productRepository.findProductsBySupplier(supplierId)
    }
}
export default ProductService