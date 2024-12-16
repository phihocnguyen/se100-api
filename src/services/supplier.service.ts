import { Supplier } from "@prisma/client";
import SupplierRepository from "../repositories/supplier.repository";

class SupplierService {
    private readonly supplierRepository : SupplierRepository

    constructor() {
        this.supplierRepository = new SupplierRepository()
    }

    async create(data : Supplier) : Promise<Supplier | null> {
        return this.supplierRepository.create(data)
    }

    async edit (id : string, data: Supplier) : Promise<Supplier | null> {
        return this.supplierRepository.edit(id, data)
    }

    async delete (id : string) : Promise<boolean> {
        return this.supplierRepository.delete(id)
    }

    async getAllSuppliers () : Promise<Supplier[] | null> {
        return this.supplierRepository.getAllSuppliers()
    }

    async getDetailSupplier (id : string) : Promise<Supplier | null> {
        return this.supplierRepository.getDetailSupplier(id)
    }
}

export default SupplierService