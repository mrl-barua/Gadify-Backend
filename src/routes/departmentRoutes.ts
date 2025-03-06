import { Router } from "express";

import {
  CreateDepartment,
  GetAllDepartments,
  UpdateDepartment,
} from "../controllers/departmentController";

const router = Router();

router.get("/departments", GetAllDepartments);
router.post("/department", CreateDepartment);
router.put("/department", UpdateDepartment);

export default router;
