import { Router } from "express"
import CategoryController from "../controllers/category.controller"

class CategoryRoute {
    private readonly categoryController : CategoryController
    public readonly router : Router

    constructor(){
        this.categoryController = new CategoryController()
        this.router = Router()
        this.router.post('/', this.categoryController.create.bind(this.categoryController))
        this.router.get('/', this.categoryController.getCategoryList.bind(this.categoryController))
    }
}
export default CategoryRoute