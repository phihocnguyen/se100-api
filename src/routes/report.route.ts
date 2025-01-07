import { Router } from "express";
import ReportController from "../controllers/report.controller";

class ReportRoute {
  private readonly reportController: ReportController;
  public readonly router: Router;

  constructor() {
    this.reportController = new ReportController();
    this.router = Router();
    this.router.get(
      "/revenue",
      this.reportController.getRevenueReports.bind(this.reportController)
    );
  }
}

export default ReportRoute;