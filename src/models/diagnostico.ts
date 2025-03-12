import mongoose from "mongoose";
import { Diagnostico } from "../types";

const DiagnosticoSchema = new mongoose.Schema<Diagnostico>({
  autoId: { type: mongoose.Schema.Types.ObjectId, ref: "Auto", required: true },
  sintomas: { type: [String], required: true },
  diagnostico: { type: String, required: true },
});

export default mongoose.model<Diagnostico>("Diagnostico", DiagnosticoSchema);
