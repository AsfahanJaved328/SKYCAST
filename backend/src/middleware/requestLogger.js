import { v4 as uuidv4 } from "uuid";
import logger from "../config/logger.js";

const requestLogger = (req, res, next) => {
  const requestId = uuidv4();
  req.requestId = requestId;

  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request completed", {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.ip,
    });
  });

  next();
};

export default requestLogger;
