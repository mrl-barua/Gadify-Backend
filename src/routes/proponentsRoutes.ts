import { Router } from "express";

import {
  GetAllProponents,
  CreateProponents,
} from "../controllers/proponentsController";

const router = Router();

router.get("/proponents", GetAllProponents);
router.post("/proponents", CreateProponents);

export default router;
