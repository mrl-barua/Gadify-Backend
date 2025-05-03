import { Router } from "express";

import {
  AddEvaluatorSignature,
  GetAllEvaluators,
  CreateEvaluator,
  GetEvaluatorById,
  UpdateEvaluator,
  EvaluateSubmission,

  GetSubmissionToBeEvaluated,
} from "../controllers/evaluatorController";

const router = Router();

router.get("/evaluators", GetAllEvaluators);
router.post("/evaluator", CreateEvaluator);
router.post("/getEvaluatorById", GetEvaluatorById);
router.put("/updateEvaluator", UpdateEvaluator);
router.post("/addEvaluatorSignature", AddEvaluatorSignature);
router.post("/evaluateSubmission", EvaluateSubmission);
router.post("/getSubmissionToBeEvaluated", GetSubmissionToBeEvaluated);

export default router;
