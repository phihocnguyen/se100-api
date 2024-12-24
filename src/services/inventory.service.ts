import { Inventory } from "@prisma/client";
import InventoryRepository from "../repositories/inventory.repository";

class InventoryService {
    private readonly inventoryRepository : InventoryRepository

    constructor() {
        this.inventoryRepository = new InventoryRepository()
    }

    async create(data : Inventory) : Promise<Inventory | null> {
        return await this.inventoryRepository.create(data)
    }
    async getByProdut(SKU : string) : Promise<Inventory | null> {
        return await this.inventoryRepository.getByProduct(SKU)
    }
    async update(id : string, data : any) : Promise<Inventory | null> {
        return await this.inventoryRepository.update(id, data)
    }
}

export default InventoryService