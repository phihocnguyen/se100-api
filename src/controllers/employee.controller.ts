import { NextFunction, Request, Response } from "express";
import EmployeeService from "../services/employee.service";

class EmployeeController {
    private readonly employeeService : EmployeeService 
    constructor () {
        this.employeeService = new EmployeeService()
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userData : any = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const employeeData : any = {
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                beginDate: req.body.beginDate
            }
            const newCustomer = await this.employeeService.create(userData, employeeData, req.file)
            res.status(201).json(newCustomer)
        } catch (error : unknown) {
            next(error)
        } 
    }

    async getAllEmployees(req: Request, res:Response, next: NextFunction) {
        try {
            const result = await this.employeeService.getAllEmployees()
            res.status(200).json(result)
        } catch (error : unknown) {
            next(error)
        }
    }

    async getDetailEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const id : string = req.params.id
            const result = await this.employeeService.getDetailEmployee(id)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const id : string = req.params.id
            const result = await this.employeeService.edit(id, req.body)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id : string = req.params.id
            const result = await this.employeeService.delete(id)
            res.status(200).json(result)
        } catch (error : unknown){
            next(error)
        }
    }


}

export default EmployeeController