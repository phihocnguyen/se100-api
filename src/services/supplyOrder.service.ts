import { Status, SupplyOrder } from "@prisma/client"
import SupplyOrderRepository from "../repositories/supplyOrder.repository"
import InventoryRepository from "../repositories/inventory.repository"

class SupplyOrderService {
    private readonly supplyOrderRepository : SupplyOrderRepository
    private readonly inventoryRepository : InventoryRepository
    constructor () {
        this.inventoryRepository = new InventoryRepository()
        this.supplyOrderRepository = new SupplyOrderRepository(this.inventoryRepository)
    }

    async create(data : SupplyOrder) : Promise<SupplyOrder | null> {
        return this.supplyOrderRepository.create(data)
    }

    async getById(id : string) : Promise<SupplyOrder | null> {
        return this.supplyOrderRepository.getById(id)
    }

    async getAllSupplyOrders() : Promise<SupplyOrder[] | null> {
        return this.supplyOrderRepository.getAllSupplyOrders()
    }

    async updateStatus(id : string, status: Status) : Promise<SupplyOrder | null> {
        return this.supplyOrderRepository.updateStatus(id, status)
    }
}

export default SupplyOrderService