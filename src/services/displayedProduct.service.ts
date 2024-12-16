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
}

export default DisplayedProductService