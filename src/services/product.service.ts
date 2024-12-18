import { Product } from "@prisma/client"
import ProductRepository from "../repositories/product.repository"

class ProductService {
    private readonly productRepository : ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }
    async create(data : Product, files : any) : Promise<Product | null> {
        return await this.productRepository.create(data, files)
    }
    async getList() : Promise<Product[] | null> {
        return await this.productRepository.getList()
    }
    async findProductsBySupplier(supplierId : string) : Promise<Product[] | null>{
        return await this.productRepository.findProductsBySupplier(supplierId)
    }
    async getProductBySKU(productSKU: string) : Promise<Product | null> {
        return await this.productRepository.getProductBySKU(productSKU)
    }
    async update(data: Product, files: any, SKU: string) : Promise<Product | null> {
        return await this.productRepository.update(data, files, SKU)
    }
}
export default ProductService