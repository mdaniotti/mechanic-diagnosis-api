/*
 * NOTA: Dejo dos ejemplos de como lo implementaria, pero es algo a hacer a futuro
 * TODO: Es una buena práctica usar types/responses.ts para manejar las respuestas API de manera tipada.
 */

// Respuesta genérica con mensaje y datos opcionales
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface DiagnosticoResponse {
  success: boolean;
  message: string;
  data: {
    //diagnostico: Diagnostico;
    //auto: Auto;
  };
}
