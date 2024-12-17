import { NextFunction, Request, Response } from "express"
import CategoryService from "../services/category.service"

class CategoryController {
    private readonly categoryService: CategoryService

    constructor() {
        this.categoryService = new CategoryService()
    }
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const newCategory = await this.categoryService.create(req.body)
            res.status(201).json(newCategory)
        } catch (error : unknown) {
            next(error)
        }
    }
}
export default CategoryController