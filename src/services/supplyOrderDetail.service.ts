import { SupplyOrderDetail } from "@prisma/client"
import SupplyOrderDetailRepository from "../repositories/supplyOrderDetail.repository"

class SupplyOrderDetailService {
    private readonly supplyOrderDetailRepository : SupplyOrderDetailRepository

    constructor() {
        this.supplyOrderDetailRepository = new SupplyOrderDetailRepository()
    }

    async create(data : SupplyOrderDetail) : Promise<SupplyOrderDetail | null> {
        return await this.supplyOrderDetailRepository.create(data)
    }
}
export default SupplyOrderDetailService