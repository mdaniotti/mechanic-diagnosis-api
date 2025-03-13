import express, { Router } from "express";
import {
  createAuto,
  getAuto,
  getAutos,
  getDiagnostico,
  getDiagnosticos,
} from "../controllers/auto.controller";

const router: Router = express.Router();

router.post("/", createAuto);
router.get("/", getAutos);
router.get("/:id", getAuto);
router.get("/:id/diagnosticos/:diagnostico_id", getDiagnostico);
router.get("/:id/diagnosticos", getDiagnosticos);

export default router;
