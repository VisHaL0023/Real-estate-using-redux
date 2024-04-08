import { Router } from "express";
import authRoutes from "./auth-routes.js";
import listingRoutes from "./listing.route.js";
import userRoutes from "./user.route.js";
import { InfoController } from "../../controllers/index.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/listing", listingRoutes);
router.use("/user", userRoutes);

// Checking api is live
router.get("/info", InfoController.info);

export default router;
