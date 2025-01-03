import { Product, Status, SupplyOrder } from "@prisma/client";
import db from "../config/db";
import InventoryRepository from "./inventory.repository";

class SupplyOrderRepository {
    private readonly inventoryRepository : InventoryRepository
    constructor(inventoryRepository : InventoryRepository) {
        this.inventoryRepository = inventoryRepository
    }

    async create(data : SupplyOrder) : Promise<SupplyOrder | null> {
        const newSupplyOrder = await db.supplyOrder.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newSupplyOrder
    }

    async getById(id : string) : Promise<SupplyOrder | null> {
        const result = await db.supplyOrder.findUnique(
            {
                where: {
                    id
                },
                include: {
                    supplyOrdersDetail: true
                }
            }
        )
        return result
    }

    async getAllSupplyOrders () : Promise<SupplyOrder[] | null> {
        const result = await db.supplyOrder.findMany({
            orderBy: {
              createdAt: 'asc',
            },
          });
          
        return result
    }
    async updateStatus (id : string, status: Status) : Promise<SupplyOrder | null> {
        const supplyOrder : any = await this.getById(id)
        const result = await db.supplyOrder.update(
            {
                where: {
                    id
                },
                data: {
                    status
                }
            }
        )
        if (status === 'COMPLETED') {
            for (let i = 0; i < supplyOrder.supplyOrdersDetail.length; i++){
                // await this.productRepository.updateQuantity(supplyOrder.supplyOrdersDetail[i].productSKU, supplyOrder.supplyOrdersDetail[i].quantity)
                const existInventory = await this.inventoryRepository.getByProduct(supplyOrder.supplyOrdersDetail[i].productSKU)
                if (existInventory) {
                    await this.inventoryRepository.update(existInventory.id, {
                        quantity: existInventory.quantity + supplyOrder.supplyOrdersDetail[i].quantity
                    })
                    
                } else {
                    await this.inventoryRepository.create({
                        wareHouseId: "cm5fipejf000jn5b2f3xieh9q",
                        productSKU: supplyOrder.supplyOrdersDetail[i].productSKU,
                        quantity: supplyOrder.supplyOrdersDetail[i].quantity
                    })
                }
            }
        }
        return result
    } 
}

export default SupplyOrderRepository