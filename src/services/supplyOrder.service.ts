import { Status, SupplyOrder } from "@prisma/client"
import SupplyOrderRepository from "../repositories/supplyOrder.repository"
import ProductRepository from "../repositories/product.repository"

class SupplyOrderService {
    private readonly supplyOrderRepository : SupplyOrderRepository
    private readonly productRepository : ProductRepository
    constructor () {
        this.productRepository = new ProductRepository()
        this.supplyOrderRepository = new SupplyOrderRepository(this.productRepository)
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