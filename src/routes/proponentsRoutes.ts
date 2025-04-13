import { Router } from "express";

import {
  GetAllProponents,
  SearchProponents,
  GetAllApprovedProponents,
  GetAllPendingProponents,
  GetAllRejectedProponents,
  CreateProponents,
  DeleteProponents,
  UpdateProponents,
  GetProponentById,
} from "../controllers/proponentsController";

const router = Router();

router.get("/proponents", GetAllProponents);
router.post("/searchProponents", SearchProponents);
router.post("/pendingProponents", GetAllPendingProponents);
router.get("/approvedProponents", GetAllApprovedProponents);
router.get("/rejectedProponents", GetAllRejectedProponents);
router.post("/proponents", CreateProponents);
router.put("/updateProponents", UpdateProponents);
router.delete("/deleteProponents", DeleteProponents);
router.post("/getProponentById", GetProponentById);

export default router;
