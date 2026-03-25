import { Router } from "express";
import weatherRoutes from "./v1/weatherRoutes.js";
import { healthCheck } from "../controllers/healthController.js";

const router = Router();

router.get("/health", healthCheck);
router.use("/api/v1/weather", weatherRoutes);

export default router;
