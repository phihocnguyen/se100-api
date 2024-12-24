import { NextFunction, Request, Response } from "express"
import FeedbackService from "../services/feedback.service"

class FeedbackController {
    private readonly feedbackService : FeedbackService

    constructor() {
        this.feedbackService = new FeedbackService()
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newFeedback = await this.feedbackService.create(req.body)
            res.status(201).json(newFeedback)
        } catch (error : unknown) {
            next(error)
        }
    }
    async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const list = await this.feedbackService.getList(req.params.productId)
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }
    async getListByRating(req : any, res: Response, next: NextFunction) {
        try {
            const list = await this.feedbackService.getListByRating(parseInt(req.params.rating), req.query.productId)
            res.status(200).json(list)
        } catch (error : unknown) {
            next(error)
        }
    }
}
export default FeedbackController