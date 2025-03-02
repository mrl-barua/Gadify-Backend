import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import {
  CreateAdmin,
  GetAllAdmin,
  ApproveProponent,
  RejectProponent,
  GetAdminById,
} from "../controllers/adminController";

const router = Router();

router.get("/admin", GetAllAdmin);
router.post("/admin", CreateAdmin);
router.post("/admin/approve-proponent", ApproveProponent);
router.post("/admin/reject-proponent", RejectProponent);
router.post("/getAdminById", GetAdminById);

export default router;
