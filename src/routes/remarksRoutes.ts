import { Router } from "express";

import { CreateRemark, GetAllRemarks } from "../controllers/remarksController";

const router = Router();

router.get("/remarks", GetAllRemarks);
router.post("/remarks", CreateRemark);

export default router;
