import { DisplayedProduct } from "@prisma/client"
import DisplayedProductRepository from "../repositories/displayedProduct.repository"

class DisplayedProductService {
    private readonly displayedProductRepository : DisplayedProductRepository

    constructor(){
        this.displayedProductRepository = new DisplayedProductRepository()
    }
    async create(data : DisplayedProduct) : Promise<DisplayedProduct | null> {
        return await this.displayedProductRepository.create(data)
    }
    async getList() : Promise<DisplayedProduct[] | null> {
        return await this.displayedProductRepository.getList()
    }
    async getDetail(SKU : string) : Promise<DisplayedProduct[] | null> {
        return await this.displayedProductRepository.getDetail(SKU)
    }
}

export default DisplayedProductService