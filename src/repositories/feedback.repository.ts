import { Feedback } from "@prisma/client";
import db from "../config/db";

class FeedbackRepository {
    async create(data : Feedback) : Promise<Feedback | null> {
        const newFeedback = await db.feedback.create(
            {
                data: {
                    ...data
                }
            }
        )
        return newFeedback
    }
    async getList(productId : string ) : Promise<Feedback[] | null> {
        const list = await db.feedback.findMany(
            {
                where: {
                    displayedProductId: productId
                },
                include: {
                    customer: {
                        include: {
                            user: {
                                select: {
                                    image: true
                                }
                            }
                        }
                    },
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        )
        return list
    }
    async getListByRating(rating : number, productId: string) : Promise<Feedback[] | null> {
        const list = await db.feedback.findMany(
            {
                where: {
                    rating,
                    displayedProductId: productId
                },
                include: {
                    customer: {
                        include: {
                            user: {
                                select: {
                                    image: true
                                }
                            }
                        }
                    },
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        )
        return list
    }
}
export default FeedbackRepository