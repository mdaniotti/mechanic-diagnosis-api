import mongoose from "mongoose";
import { Diagnostico } from "../types/models";

const DiagnosticoSchema = new mongoose.Schema<Diagnostico>(
  {
    autoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auto",
      required: true,
    },
    sintomas: { type: String, required: true },
    causas: {
      probabilidadAlta: { type: String, required: true },
      probabilidadMedia: { type: String, required: true },
      probabilidadBaja: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<Diagnostico>("Diagnostico", DiagnosticoSchema);
