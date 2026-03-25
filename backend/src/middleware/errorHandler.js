import logger from "../config/logger.js";

const errorHandler = (error, req, res, next) => {
  logger.error("Unhandled application error", {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    error: error.message,
    stack: error.stack,
  });

  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    error: {
      code: error.code || "INTERNAL_SERVER_ERROR",
      message: error.publicMessage || "Unexpected server error.",
      requestId: req.requestId,
    },
  });
};

export default errorHandler;
