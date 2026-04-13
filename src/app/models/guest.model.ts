export interface Guest {
  id?: string;
  nombres: string;
  apellidos: string;
  cupoPermitido: number;
  token: string;
  confirmado: boolean;
  asistira?: boolean;
  personasConfirmadas: number;
  telefono?: string;
  fechaConfirmacion?: Date;
  createdAt: Date;
}
