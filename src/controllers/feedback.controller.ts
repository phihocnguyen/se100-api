import { NextFunction, Request, Response } from "express";
import FeedbackService from "../services/feedback.service";

class FeedbackController {
  private readonly feedbackService: FeedbackService;

  constructor() {
    this.feedbackService = new FeedbackService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newFeedback = await this.feedbackService.create(req.body);
      if (newFeedback === false) {
        res
          .status(400)
          .json("Customer has already created feedback for this product.");
      } else {
        res.status(200).json(newFeedback);
      }
    } catch (error: unknown) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const feedbacks = await this.feedbackService.getAll();
      res.status(200).json(feedbacks);
    } catch (error: unknown) {
      next(error);
    }
  }

  async getByProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const feedbacks = await this.feedbackService.getByProduct(productId);
      res.status(200).json(feedbacks);
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default FeedbackController;
