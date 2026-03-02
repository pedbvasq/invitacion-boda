export interface Guest {
  id?: string;
  nombres: string;
  apellidos: string;
  cupoPermitido: number;
  token: string;
  confirmado: boolean;
  personasConfirmadas: number;
  telefono?: string;
  fechaConfirmacion?: Date;
  createdAt: Date;
}
