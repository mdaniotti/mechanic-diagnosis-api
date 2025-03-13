export interface DiagnosticoAutoParams {
  id: string; // ID del auto
  diagnostico_id: string;
}

export interface AutoParams {
  id: string; // ID del auto
}

export interface DiagnosticoParams {
  id: string; // ID del diagnostico
}

export interface CreateDiagnosticoBody {
  autoId: string;
  sintomas: string[];
}

export interface CreateAutoBody {
  marca: string;
  modelo: string;
  color: string;
  patente: string;
}
