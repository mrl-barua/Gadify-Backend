import { Router } from "express";

import {
  AddEvaluatorSignature,
  GetAllEvaluators,
  CreateEvaluator,
  GetEvaluatorsWithDetails,
} from "../controllers/evaluatorController";

const router = Router();

router.get("/evaluator", GetEvaluatorsWithDetails);
router.post("/evaluator", CreateEvaluator);

export default router;
