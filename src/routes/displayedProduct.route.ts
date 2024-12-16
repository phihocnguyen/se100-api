import { Router } from "express";
import DisplayedProductController from "../controllers/displayedProduct.controller";

class DisplayedProductRoute {
    private readonly displayedProductController : DisplayedProductController 
    public readonly router : Router  

    constructor() {
        this.displayedProductController = new DisplayedProductController()
        this.router = Router()
        this.router.post('/', this.displayedProductController.create.bind(this.displayedProductController))
    }
}

export default DisplayedProductRoute
