import { Router } from "express";

import { CreateCampus, GetAllCampus } from "../controllers/campusController";

const router = Router();

router.get("/campus", GetAllCampus);
router.post("/campus", CreateCampus);

export default router;
