import { Router } from "express";

import {
  CreateSubmission,
  GetAllSubmissions,
  AddSubmissionRemarks,
  GetSubmissionById,
  GetSubmissionsByProponentId,
} from "../controllers/submissionController";

const router = Router();

router.get("/submissions", GetAllSubmissions);
router.post("/submission", CreateSubmission);
router.post("/submissionById", GetSubmissionById);
router.post("/submissionByProponentId", GetSubmissionsByProponentId);

export default router;
