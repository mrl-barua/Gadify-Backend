import { Router } from "express";

import {
  CreateDepartment,
  GetAllDepartments,
} from "../controllers/departmentController";

const router = Router();

router.get("/departments", GetAllDepartments);
router.post("/department", CreateDepartment);

export default router;
