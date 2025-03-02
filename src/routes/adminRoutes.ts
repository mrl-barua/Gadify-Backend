import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import {
  CreateAdmin,
  GetAllAdmin,
  ApproveProponent,
  RejectProponent,
  GetAdminById,
  UpdateAdmin,
} from "../controllers/adminController";

const router = Router();

router.get("/admin", GetAllAdmin);
router.post("/admin", CreateAdmin);
router.post("/admin/approve-proponent", ApproveProponent);
router.post("/admin/reject-proponent", RejectProponent);
router.post("/getAdminById", GetAdminById);
router.put("/updateAdmin", UpdateAdmin);

export default router;
