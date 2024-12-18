import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import IndexRoute from "./routes";
import errorHandler from "./helpers/error-handler";

class App {
  private readonly app: Application;
  private readonly port: number;
  private readonly corsOptions : object
  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000");
    this.corsOptions = {
      origin: 'http://localhost:5173',
      credentials: true
    }
    this.init();
  }

  private init() {
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
  }

  private initMiddlewares() {
    this.app.use(cors(this.corsOptions));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    dotenv.config();
  }

  private initRoutes() {
    this.app.use("/api", IndexRoute);
  }

  private initErrorHandling() {
    this.app.use(errorHandler)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default App;
