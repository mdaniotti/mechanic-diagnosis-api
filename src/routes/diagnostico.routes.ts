import express, { Router } from "express";

import { createDiagnostico } from "../controllers/diagnostico.controller";

const router: Router = express.Router();

router.post("/", createDiagnostico);

export default router;
