import { Router } from "express";

import {
  GetAllProponents,
  CreateProponents,
  DeleteProponents,
  UpdateProponents,
  GetProponentById,
} from "../controllers/proponentsController";

const router = Router();

router.get("/proponents", GetAllProponents);
router.post("/proponents", CreateProponents);
router.put("/updateProponents", UpdateProponents);
router.delete("/deleteProponents", DeleteProponents);
router.post("/getProponentById", GetProponentById);

export default router;
