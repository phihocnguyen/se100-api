import db from "../config/db";

class ReportRepository {
  async getRevenue(startDate: Date, endDate: Date): Promise<Number> {
    const result = await db.invoice.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: {
          not: "CANCELED",
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return result._sum.totalPrice || 0;
  }

  async getSupplyOrderTotal(startDate: Date, endDate: Date): Promise<Number> {
    const result = await db.supplyOrder.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: {
          not: "CANCELED",
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return result._sum.totalPrice || 0;
  }

  async getCountOfInvoices(startDate: Date, endDate: Date): Promise<Number> {
    const result = await db.invoice.aggregate({
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return result._count.id || 0;
  }

  async getCountOfSupplyOrders(
    startDate: Date,
    endDate: Date
  ): Promise<Number> {
    const result = await db.supplyOrder.aggregate({
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return result._count.id || 0;
  }
}

export default ReportRepository;
