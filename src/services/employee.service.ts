import { Employee } from "@prisma/client";
import EmployeeRepository from "../repositories/employee.repository";
import UserRepository from "../repositories/user.repository";

class EmployeeService {
    private readonly employeeRepository : EmployeeRepository
    private readonly userRepository : UserRepository
    constructor() {
        this.userRepository = new UserRepository()
        this.employeeRepository = new EmployeeRepository(this.userRepository)
    }
    
    async create(userData : any, employeeData: any, file: Express.Multer.File | undefined) : Promise<Employee | null> {
        return this.employeeRepository.create(userData, employeeData, file)
    }
    async getAllEmployees() : Promise<Employee[] | null> {
        const result = await this.employeeRepository.getAllEmployees()
        return result
    }
    async getDetailEmployee(id : string) : Promise<Employee | null> {
        const result = await this.employeeRepository.getDetailEmployee(id)
        return result
    }
    async edit (id : string, data : Employee) : Promise<Employee | null> {
        const result = await this.employeeRepository.edit(id, data)
        return result
    }
    async delete (id : string) : Promise<boolean> {
        const result = await this.employeeRepository.delete(id)
        return result
    }
}

export default EmployeeService