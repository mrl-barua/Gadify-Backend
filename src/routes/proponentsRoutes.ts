import { Router } from "express";

import {
  GetAllProponents,
  CreateProponents,
  GetProponentsWithDepartment,
} from "../controllers/proponentsController";

const router = Router();

// router.get("/proponents", GetAllProponents);
router.get("/proponents", GetProponentsWithDepartment);
router.post("/proponents", CreateProponents);

export default router;
