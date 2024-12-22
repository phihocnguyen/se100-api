import { Employee, User } from "@prisma/client";
import db from "../config/db";
import UserRepository from "./user.repository";


class EmployeeRepository {
    private readonly userRepository : UserRepository

    constructor(userRepository : UserRepository) {
        this.userRepository = userRepository
    }

    async create(userData : any, employeeData: any, file: Express.Multer.File | undefined) : Promise<Employee | null> {
        const newUser : any = await this.userRepository.create(userData, file)
        if (newUser) {
            const newEmployee = await db.employee.create(
                {
                    data: {
                        ...employeeData,
                        userId: newUser.newUser.id
                    }
                }
            )
            return newEmployee
        }
        return null
    }
    async getAllEmployees () : Promise<Employee[] | null> {
        const result = await db.employee.findMany(
            {
                include: {
                    user: true
                }
            }
        )
        return result
    }

    async getDetailEmployee (id : string) : Promise<Employee | null> {
        const result = await db.employee.findUnique(
            {
                where: {
                    id
                }
            }
        )
        return result
    } 

    async edit (id: string, data: Employee) : Promise<Employee | null> {
        const result = await db.employee.update(
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
        await db.employee.delete({
            where: {
                id
            }
        })
        return true
    }
}

export default EmployeeRepository