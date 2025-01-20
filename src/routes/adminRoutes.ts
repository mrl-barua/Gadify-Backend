import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import {
  CreateAdmin,
  GetAllAdmin,
  ApproveProponent,
  RejectProponent,
} from "../controllers/adminController";

const router = Router();

router.get("/admin", GetAllAdmin);
router.post("/admin", CreateAdmin);
router.post("/admin/approve-proponent", ApproveProponent);
router.post("/admin/reject-proponent", RejectProponent);

export default router;
