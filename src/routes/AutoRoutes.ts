import express, { Request, Response } from "express";
import Auto from "../models/auto";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const auto = new Auto(req.body);
    await auto.save();
    res.status(201).json(auto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const autos = await Auto.find();
  res.json(autos);
});

export default router;
