import { Status, SupplyOrder } from "@prisma/client"
import SupplyOrderRepository from "../repositories/supplyOrder.repository"

class SupplyOrderService {
    private readonly supplyOrderRepository : SupplyOrderRepository

    constructor () {
        this.supplyOrderRepository = new SupplyOrderRepository()
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