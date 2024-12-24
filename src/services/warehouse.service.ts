import { Warehouse } from "@prisma/client"
import warehouseRepository from "../repositories/warehouse.repository"

class warehouseService {
    private readonly warehouseRepository : warehouseRepository

    constructor() {
        this.warehouseRepository = new warehouseRepository()
    }
    async create(data : Warehouse) : Promise<Warehouse | null> {
        return await this.warehouseRepository.create(data)
    }
    async getList() : Promise<Warehouse[] | null> {
        return await this.warehouseRepository.getList()
    }
}

export default warehouseService