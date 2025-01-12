import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import { CreateAdmin, GetAllAdmin } from "../controllers/adminController";

const router = Router();

router.get("/admin", GetAllAdmin);
router.post("/admin", CreateAdmin);

export default router;
