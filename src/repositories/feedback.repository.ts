import { Feedback, PrismaPromise } from "@prisma/client";
import db from "../config/db";

class FeedbackRepository {
  async create(data: Feedback): Promise<Feedback | boolean> {
    const productId = data.displayedProductId;
    const customerId = data.customerId;
    const existFeedback = await db.feedback.findFirst({
      where: {
        displayedProductId: productId,
        customerId: customerId,
      },
    });
    if (existFeedback) {
      return false;
    }

    const newFeedback = await db.feedback.create({
      data: {
        ...data,
      },
    });
    return newFeedback;
  }

  async getAll(): Promise<Feedback[] | null> {
    const feedbacks = await db.feedback.findMany({
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return feedbacks;
  }

  async getByProduct(productId: string): Promise<Feedback[] | null> {
    const feedbacks = await db.feedback.findMany({
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            phoneNumber: true,
          },
        },
      },
      where: {
        displayedProductId: productId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return feedbacks;
  }
}

export default FeedbackRepository;
