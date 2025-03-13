import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Genera un diagnóstico basado en síntomas usando OpenAI
 * @param sintomas - Lista de síntomas del auto
 */
export const generarDiagnosticoConIA = async (
  sintomas: string[]
): Promise<{
  probabilidadAlta: string;
  probabilidadMedia: string;
  probabilidadBaja: string;
}> => {
  try {
    const prompt = `
      Dado los siguientes síntomas de un auto: ${sintomas}, genera un diagnóstico con 3 posibles causas:
      - Probabilidad Alta
      - Probabilidad Media
      - Probabilidad Baja
      Devuelve solo el JSON sin explicaciones. Formato:
      {
        "probabilidadAlta": "Causa más probable",
        "probabilidadMedia": "Segunda causa más probable",
        "probabilidadBaja": "Causa menos probable"
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    // Extraer y parsear el JSON desde la respuesta de OpenAI
    const textResponse = response.choices[0]?.message?.content;
    if (!textResponse) {
      throw new Error("No se recibió respuesta de OpenAI");
    }

    const causas = JSON.parse(textResponse);
    return causas;
  } catch (error) {
    console.error("Error al generar diagnóstico con OpenAI:", error);
    throw new Error("No se pudo generar el diagnóstico con OpenAI");
  }
};
