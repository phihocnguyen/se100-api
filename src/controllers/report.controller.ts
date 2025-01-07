import { NextFunction, Request, Response } from "express";
import ReportService from "../services/report.service";

class ReportController {
  private readonly reportService : ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  async getRevenueReports(req: Request, res: Response, next: NextFunction) {
    try {
      const startDateString = req.query.startDate as string;
      const endDateString = req.query.endDate as string;

      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);

      const result = await this.reportService.getRevenueReport(startDate, endDate);
      res.status(200).json(result);
    }
    catch (error: unknown) {
      next(error);
    }
  }
}

export default ReportController;