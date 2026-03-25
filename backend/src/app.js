import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import routes from "./routes/index.js";
import { generalLimiter } from "./middleware/rateLimiter.js";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL?.split(",") || ["http://localhost:5173"],
}));
app.use(express.json({ limit: process.env.REQUEST_SIZE_LIMIT || "10kb" }));
app.use(express.urlencoded({ extended: true, limit: process.env.REQUEST_SIZE_LIMIT || "10kb" }));
app.use(requestLogger);
app.use(generalLimiter);
app.use(routes);
app.use(errorHandler);

export default app;
