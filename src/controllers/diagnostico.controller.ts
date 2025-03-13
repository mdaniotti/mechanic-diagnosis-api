import { Request, Response } from "express";
import Diagnostico from "../models/Diagnostico";
import { Causas } from "../types/models";
import { CreateDiagnosticoBody } from "../types/routes";

/**
 * @route POST /diagnostico
 * @desc Recibe síntomas del auto y devuelve un diagnóstico
 */
export const createDiagnostico = async (
  req: Request<CreateDiagnosticoBody>,
  res: Response
): Promise<void> => {
  try {
    const { sintomas, autoId } = req.body;

    // Generar con OpenAI
    const causas: Causas = {
      probabilidadAlta: "Bomba de dirección asistida defectuosa",
      probabilidadMedia: "Fuga en mangueras de dirección",
      probabilidadBaja: "Nivel de líquido de dirección bajo",
    };

    const nuevoDiagnostico = new Diagnostico({
      autoId,
      sintomas,
      causas,
    });

    await nuevoDiagnostico.save();

    res.status(201).json(nuevoDiagnostico);
  } catch (error) {
    console.error("Error al obtener el diagnóstico:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
