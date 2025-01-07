import ReportRepository from "../repositories/report.repository";

type RevenueReportType = {
  revenue: Number;
  invoiceCount: Number;
  supplyTotal: Number;
  supplyOrderCount: Number;
};

class ReportService {
  private readonly reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepository();
  }

  async getRevenueReport(
    startDate: Date,
    endDate: Date
  ): Promise<RevenueReportType> {
    const [revenue, invoiceCount, supplyTotal, supplyOrderCount] =
      await Promise.all([
        this.reportRepository.getRevenue(startDate, endDate),
        this.reportRepository.getCountOfInvoices(startDate, endDate),
        this.reportRepository.getSupplyOrderTotal(startDate, endDate),
        this.reportRepository.getCountOfSupplyOrders(startDate, endDate),
      ]);

    return {
      revenue,
      invoiceCount,
      supplyTotal,
      supplyOrderCount,
    };
  }
}

export default ReportService;