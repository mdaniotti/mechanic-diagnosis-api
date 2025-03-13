import { Request, Response } from "express";
import mongoose from "mongoose";
import Auto from "../models/Auto";
import { Auto as AutoType } from "../types/models";
import Diagnostico from "../models/Diagnostico";
import {
  AutoParams,
  CreateAutoBody,
  DiagnosticoAutoParams,
  DiagnosticoParams,
} from "../types/routes";

/**
 * @route POST /autos
 * @desc Crear un nuevo auto
 */
export const createAuto = async (
  req: Request<CreateAutoBody>,
  res: Response
): Promise<void> => {
  try {
    const auto = new Auto(req.body);
    await auto.save();
    res.status(201).json(auto);
  } catch (error) {
    console.error("Error al crear el auto: ", error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @route GET /autos
 * @desc Obtener la lista de autos
 */
export const getAutos = async (req: Request, res: Response): Promise<void> => {
  try {
    const autos = await Auto.find().sort({ createdAt: -1 });
    res.json(autos);
  } catch (error) {
    console.error("Error al obtener los autos: ", error);
    res.status(500).json({ error: "Error al obtener los autos" });
  }
};

/**
 * @route GET /autos/:id
 * @desc Obtener un auto por ID o por patente
 */
export const getAuto = async (
  req: Request<AutoParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { patente } = req.query;

    let auto: AutoType;

    if (typeof patente === "string" && !!patente) {
      // Note: Se puede hacer que no sea una busqueda estricta. Ej: "679" y "atf679" encuentran a ATF679
      auto = await Auto.findOne({ patente }).lean();
    } else if (mongoose.Types.ObjectId.isValid(id)) {
      auto = await Auto.findById(id).lean();
    } else {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    if (!auto) {
      res.status(404).json({ message: "Auto no encontrado" });
      return;
    }

    res.status(200).json(auto);
  } catch (error) {
    console.error("Error al obtener el auto: ", error);
    res.status(500).json({ message: "Error al obtener el auto" });
  }
};

/**
 * @route GET /autos/:id/diagnosticos/:diagnostico_id
 * @desc Obtener un diagnóstico específico de un auto
 */
export const getDiagnostico = async (
  req: Request<DiagnosticoAutoParams>,
  res: Response
): Promise<void> => {
  try {
    const { id, diagnostico_id } = req.params;

    // Validar si los IDs son válidos
    const autoIdIsValid = mongoose.Types.ObjectId.isValid(id);
    const diagnosticoIdIsValid =
      mongoose.Types.ObjectId.isValid(diagnostico_id);

    if (!autoIdIsValid || !diagnosticoIdIsValid) {
      res.status(400).json({ message: "ID del auto o diagnóstico inválido" });
      return;
    }

    /*
     * NOTA: También se puede hacer con populate pero lo hice con aggregate para renombrar
     * "autoId" por "auto", ademas de dejar plasmado un ejemplo del uso de aggregate.
     */
    const [diagnostico] = await Diagnostico.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(diagnostico_id), // id to ObjectId
          autoId: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "autos",
          localField: "autoId",
          foreignField: "_id",
          as: "auto",
        },
      },
      { $unwind: "$auto" },
      {
        $project: {
          autoId: 0,
        },
      },
    ]);

    if (!diagnostico) {
      res.status(404).json({ message: "Diagnóstico no encontrado" });
      return;
    }

    res.status(200).json(diagnostico);
  } catch (error) {
    console.error("Error al obtener el diagnóstico del auto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * @route GET /autos/:id/diagnosticos
 * @desc Obtener todos los diagnósticos de un auto específico
 */
export const getDiagnosticos = async (
  req: Request<DiagnosticoParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar si el ID del auto es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "ID del auto inválido" });
      return;
    }

    const diagnosticos = await Diagnostico.find({ autoId: id }).lean();

    if (!diagnosticos.length) {
      res
        .status(404)
        .json({ message: "No se encontraron diagnósticos para este auto" });

      return;
    }

    res.status(200).json(diagnosticos);
  } catch (error) {
    console.error("Error al obtener los diagnósticos del auto:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los diagnósticos del auto" });
  }
};
