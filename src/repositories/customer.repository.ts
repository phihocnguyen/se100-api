import { Customer } from "@prisma/client";
import db from "../config/db";

class CustomerRepository {
    async create(data : Customer) : Promise<Customer | null> {
        const newCustomer = await db.customer.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newCustomer
    }
    async getAllCustomers () : Promise<Customer[] | null> {
        const result = await db.customer.findMany()
        return result
    }

    async getDetailCustomer (id : string) : Promise<Customer | null> {
        const result = await db.customer.findUnique(
            {
                where: {
                    id
                }
            }
        )
        return result
    } 

    async edit (id: string, data: Customer) : Promise<Customer | null> {
        const result = await db.customer.update(
            {
                where: {
                    id
                },
                data: {
                    ...data
                }
            }
        )
        return result
    }

    async delete (id : string) : Promise<boolean> {
        if (!id) return false
        await db.customer.delete({
            where: {
                id
            }
        })
        return true
    }
}

export default CustomerRepository