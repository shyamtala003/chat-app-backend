import v1AuthRoutes from "./routes/auth/v1/auth.routes.js";
import v1ApiRoutes from "./routes/api/v1/api.routes.js";

import express from "express";

const router = express.Router();

// version v1 routes
router.use("/auth/v1", v1AuthRoutes);
router.use("/api/v1", v1ApiRoutes);

export default router;
