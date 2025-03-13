import mongoose from "mongoose";
import { Auto } from "../types/models";

const AutoSchema = new mongoose.Schema<Auto>(
  {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    color: { type: String, required: true },
    patente: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Auto>("Auto", AutoSchema);
