export interface ReminderConfig {
  id?: string;
  frecuencia: 'mensual' | 'quincenal' | 'semanal';
  diaMensual?: number;
  mensaje: string;
  activo: boolean;
  fechaBoda: Date;
  ultimoEnvio?: Date;
}
