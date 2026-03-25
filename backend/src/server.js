import app from "./app.js";
import logger from "./config/logger.js";

const port = Number(process.env.PORT || 5000);

const server = app.listen(port, () => {
  logger.info(`Weather backend listening on port ${port}`);
});

const shutdown = (signal) => {
  logger.info(`Received ${signal}. Shutting down gracefully.`);
  server.close(() => {
    logger.info("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
