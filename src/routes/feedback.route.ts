import { Router } from "express"
import FeedbackController from "../controllers/feedback.controller"

class FeedbackRoute {
    private readonly feedbackController : FeedbackController
    public readonly router : Router

    constructor() {
        this.feedbackController = new FeedbackController()
        this.router = Router()
        this.router.post('/', this.feedbackController.create.bind(this.feedbackController))
        this.router.get('/:productId', this.feedbackController.getList.bind(this.feedbackController))
        this.router.get('/rating/:rating', this.feedbackController.getListByRating.bind(this.feedbackController))
    }

}
export default FeedbackRoute