import { Router } from "express";
import SupplierController from "../controllers/supplier.controller";

class SupplierRoute {
    private readonly supplierController : SupplierController
    public readonly router : Router 

    constructor () {
        this.supplierController = new SupplierController()
        this.router = Router()
        this.router.post('/', this.supplierController.create.bind(this.supplierController))
        this.router.get('/', this.supplierController.getAllSuppliers.bind(this.supplierController))
        this.router.get('/:id', this.supplierController.getDetailSupplier.bind(this.supplierController))
        this.router.patch('/:id', this.supplierController.edit.bind(this.supplierController))
        this.router.delete('/:id', this.supplierController.delete.bind(this.supplierController))
        this.router.get('/getproducts/:id', this.supplierController.getProductsSupplied.bind(this.supplierController))
    }
}
export default SupplierRoute