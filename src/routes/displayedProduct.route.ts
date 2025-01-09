import { Router } from "express";
import DisplayedProductController from "../controllers/displayedProduct.controller";

class DisplayedProductRoute {
    private readonly displayedProductController : DisplayedProductController 
    public readonly router : Router  

    constructor() {
        this.displayedProductController = new DisplayedProductController()
        this.router = Router()
        this.router.post('/', this.displayedProductController.create.bind(this.displayedProductController))
        this.router.get('/', this.displayedProductController.getList.bind(this.displayedProductController))
        this.router.get('/:SKU', this.displayedProductController.getDetail.bind(this.displayedProductController))
        this.router.get('/search/filter/:category', this.displayedProductController.filter.bind(this.displayedProductController))
        this.router.get('/search/price/:status', this.displayedProductController.filterPrice.bind(this.displayedProductController))
        this.router.get('/featured/:categoryName', this.displayedProductController.getDisplayedProductsByCategory.bind(this.displayedProductController))
    }
}

export default DisplayedProductRoute
