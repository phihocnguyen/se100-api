import { Router } from "express";
import UserRoute from "./user.route";
import CustomerRoute from "./customer.route";
import SupplierRoute from "./supplier.route";
import SupplyOrderRoute from "./supplyOrder.route";
import DisplayedProductRoute from "./displayedProduct.route";
import ProductRoute from "./product.route";
import SupplyOrderDetailRoute from "./supplyOrderDetail.route";
import CategoryRoute from "./category.route";
import BrandRoute from "./brand.route";
import EmployeeRoute from "./employee.route";
import AuthRoute from "./auth.route";
import InvoiceRoute from "./invoice.route";
import InvoiceDetailRoute from "./invoiceDetail.route";
import FeedbackRoute from "./feedback.route";
import InventoryRoute from "./inventory.route";
import warehouseRoute from "./warehouse.route";
import ReportRoute from "./report.route";
import VoucherRoute from "./voucher.route";

class IndexRoute {
    public readonly router: Router
    private readonly userRoute: UserRoute
    private readonly customerRoute: CustomerRoute
    private readonly supplierRoute: SupplierRoute
    private readonly supplyOrderRoute: SupplyOrderRoute
    private readonly displayedProductRoute: DisplayedProductRoute
    private readonly productRoute: ProductRoute
    private readonly supplyOrderDetailRoute: SupplyOrderDetailRoute
    private readonly categoryRoute: CategoryRoute
    private readonly brandRoute: BrandRoute
    private readonly employeeRoute: EmployeeRoute
    private readonly authRoute: AuthRoute;
    private readonly invoiceRoute: InvoiceRoute
    private readonly invoiceDetailRoute: InvoiceDetailRoute
    private readonly feedbackRoute: FeedbackRoute
    private readonly inventoryRoute: InventoryRoute
    private readonly warehouseRoute: warehouseRoute
    private readonly reportRoute: ReportRoute
    private readonly voucherRoute: VoucherRoute
    constructor() {
        this.router = Router()
        this.userRoute = new UserRoute()
        this.customerRoute = new CustomerRoute()
        this.supplierRoute = new SupplierRoute()
        this.supplyOrderRoute = new SupplyOrderRoute()
        this.displayedProductRoute = new DisplayedProductRoute()
        this.productRoute = new ProductRoute()
        this.supplyOrderDetailRoute = new SupplyOrderDetailRoute()
        this.categoryRoute = new CategoryRoute()
        this.brandRoute = new BrandRoute()
        this.employeeRoute = new EmployeeRoute()
        this.authRoute = new AuthRoute();
        this.invoiceRoute = new InvoiceRoute()
        this.invoiceDetailRoute = new InvoiceDetailRoute()
        this.feedbackRoute = new FeedbackRoute()
        this.inventoryRoute = new InventoryRoute()
        this.warehouseRoute = new warehouseRoute()
        this.reportRoute = new ReportRoute()
        this.voucherRoute = new VoucherRoute()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.use('/user', this.userRoute.router)
        this.router.use('/customer', this.customerRoute.router)
        this.router.use('/supplier', this.supplierRoute.router)
        this.router.use('/supply-order', this.supplyOrderRoute.router)
        this.router.use('/supply-order-detail', this.supplyOrderDetailRoute.router)
        this.router.use('/displayed-product', this.displayedProductRoute.router)
        this.router.use('/product', this.productRoute.router)
        this.router.use('/category', this.categoryRoute.router)
        this.router.use('/brand', this.brandRoute.router)
        this.router.use('/employee', this.employeeRoute.router)
        this.router.use('/auth', this.authRoute.router)
        this.router.use('/invoice', this.invoiceRoute.router)
        this.router.use('/invoice-detail', this.invoiceDetailRoute.router)
        this.router.use('/feedback', this.feedbackRoute.router)
        this.router.use('/inventory', this.inventoryRoute.router)
        this.router.use('/warehouse', this.warehouseRoute.router)
        this.router.use('/report', this.reportRoute.router);
        this.router.use('/voucher', this.voucherRoute.router)
    }
}
export default new IndexRoute().router