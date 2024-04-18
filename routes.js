import v1AuthRoutes from "./routes/auth/v1/auth.routes.js";
import express from "express";

const router = express.Router();

// version v1 routes
router.use("/auth/v1", v1AuthRoutes);

export default router;
