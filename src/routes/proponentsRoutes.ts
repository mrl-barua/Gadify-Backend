import { Router } from "express";

import {
  GetAllProponents,
  CreateProponents,
  DeleteProponents,
  UpdateProponents,
} from "../controllers/proponentsController";

const router = Router();

router.get("/proponents", GetAllProponents);
router.post("/proponents", CreateProponents);
router.put("/UpdateProponents", DeleteProponents);
router.delete("/DeleteProponents", UpdateProponents);

export default router;
