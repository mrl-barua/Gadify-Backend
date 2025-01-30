import { Router } from "express";

import {
  CreateSubmission,
  GetAllSubmissions,
  AddSubmissionRemarks,
  GetSubmissionById,
} from "../controllers/submissionController";

const router = Router();

router.get("/submissions", GetAllSubmissions);
router.post("/submission", CreateSubmission);
router.post("/submissionById", GetSubmissionById);

export default router;
