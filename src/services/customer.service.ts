import { Customer } from "@prisma/client";
import CustomerRepository from "../repositories/customer.repository";

class CustomerService {
    private readonly customerRepository : CustomerRepository

    constructor() {
        this.customerRepository = new CustomerRepository()
    }
    
    async create(data : Customer) : Promise<Customer | null> {
        return this.customerRepository.create(data)
    }
    async getAllCustomers() : Promise<Customer[] | null> {
        const result = await this.customerRepository.getAllCustomers()
        return result
    }
    async getDetailCustomer(id : string) : Promise<Customer | null> {
        const result = await this.customerRepository.getDetailCustomer(id)
        return result
    }
    async edit (id : string, data : Customer) : Promise<Customer | null> {
        const result = await this.customerRepository.edit(id, data)
        return result
    }
    async delete (id : string) : Promise<boolean> {
        const result = await this.customerRepository.delete(id)
        return result
    }
}

export default CustomerService