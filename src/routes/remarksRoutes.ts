import { Router } from "express";

import { GetAllRemarks } from "../controllers/remarksController";

const router = Router();

router.get("/remarks", GetAllRemarks);

export default router;
