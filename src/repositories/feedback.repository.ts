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
    async getAverageRating(productSKU : string) : Promise<Number | null> {
        const avgRating = await db.feedback.aggregate({
            where: {
                displayedProduct: {
                    product: {
                        SKU: productSKU
                    }
                }
            },
            _avg: {
                rating: true,
            },
        })
        return Math.ceil(avgRating._avg.rating as number)
    }
}
export default FeedbackRepository