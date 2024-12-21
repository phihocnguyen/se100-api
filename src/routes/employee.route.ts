import { Router } from "express";
import EmployeeController from "../controllers/employee.controller";
import upload from "../middleware/multer";

class EmployeeRoute {
    private readonly employeeController : EmployeeController
    public readonly router : Router 

    constructor () {
        this.employeeController = new EmployeeController()
        this.router = Router()
        this.router.post('/', upload.single('image') ,this.employeeController.create.bind(this.employeeController))
        this.router.get('/',this.employeeController.getAllEmployees.bind(this.employeeController))
        this.router.get('/:id',this.employeeController.getDetailEmployee.bind(this.employeeController))
        this.router.patch('/:id',this.employeeController.edit.bind(this.employeeController))
        this.router.delete('/:id',this.employeeController.delete.bind(this.employeeController))
    }
}
export default EmployeeRoute