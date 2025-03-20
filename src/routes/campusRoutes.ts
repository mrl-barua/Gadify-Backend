import { Router } from "express";

import {
  CreateCampus,
  GetAllCampus,
  UpdateCampus,
} from "../controllers/campusController";

const router = Router();

router.get("/campus", GetAllCampus);
router.post("/campus", CreateCampus);
router.put("/campus", UpdateCampus);

export default router;
