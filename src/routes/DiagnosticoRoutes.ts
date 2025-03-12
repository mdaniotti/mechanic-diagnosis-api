import express, { Request, Response } from "express";
import Diagnostico from "../models/diagnostico";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { autoId, sintomas, diagnostico } = req.body;
    const data = new Diagnostico({ autoId, sintomas, diagnostico });
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const diagnosticos = await Diagnostico.find().populate("autoId");
  res.json(diagnosticos);
});

export default router;
