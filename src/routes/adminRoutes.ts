import { Router } from "express";

import { CreateAdmin, GetAllAdmin } from "../controllers/adminController";

const router = Router();

router.get("/admin", GetAllAdmin);
router.post("/admin", CreateAdmin);

export default router;
