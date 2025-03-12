import mongoose from "mongoose";

export interface Auto {
  marca: string;
  modelo: string;
  color: string;
  patente: string;
}

export interface Diagnostico {
  autoId: mongoose.Schema.Types.ObjectId;
  sintomas: string[];
  diagnostico: string;
}
