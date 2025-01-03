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
    async filter(category: string, brand: string, camera: number, rom: number) : Promise<DisplayedProduct[] | null> {
        return await this.displayedProductRepository.filter(category, brand, camera, rom)
    }
    async filterPrice(status : string) : Promise<DisplayedProduct[] | null> {
        return await this.displayedProductRepository.filterPrice(status)
    }
}

export default DisplayedProductService