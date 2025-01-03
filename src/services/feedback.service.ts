import { Feedback } from "@prisma/client"
import FeedbackRepository from "../repositories/feedback.repository"

class FeedbackService {
    private readonly feedbackRepository : FeedbackRepository

    constructor() {
        this.feedbackRepository = new FeedbackRepository()
    }
    async create(data : Feedback) : Promise<Feedback | null> {
        return await this.feedbackRepository.create(data)
    }
    async getList(productId : string) : Promise<Feedback[] | null> {
        return await this.feedbackRepository.getList(productId)
    }
    async getListByRating(rating : number, productId: string) : Promise<Feedback[]  | null>{
        return await this.feedbackRepository.getListByRating(rating, productId)
    }
    async getAverageRating(productSKU: string) : Promise<Number | null> {
        return await this.feedbackRepository.getAverageRating(productSKU)
    }
}

export default FeedbackService