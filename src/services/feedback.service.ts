import { Feedback } from "@prisma/client";
import FeedbackRepository from "../repositories/feedback.repository";

class FeedbackService {
  private readonly feedbackRepository: FeedbackRepository;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
  }

  async create(feedback: Feedback): Promise<Feedback | boolean> {
    return this.feedbackRepository.create(feedback);
  }

  async getAll(): Promise<Feedback[] | null> {
    return this.feedbackRepository.getAll();
  }

  async getByProduct(productId: string): Promise<Feedback[] | null> {
    return this.feedbackRepository.getByProduct(productId);
  }
}

export default FeedbackService;