import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, collection, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ReminderConfig } from '../models/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);
  private configId = 'reminder-config';

  async getConfig(): Promise<ReminderConfig | null> {
    const docRef = doc(this.firestore, 'config', this.configId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as ReminderConfig;
  }

  async saveConfig(config: Omit<ReminderConfig, 'id'>): Promise<void> {
    const docRef = doc(this.firestore, 'config', this.configId);
    await setDoc(docRef, config);
  }

  async updateConfig(data: Partial<ReminderConfig>): Promise<void> {
    const docRef = doc(this.firestore, 'config', this.configId);
    await updateDoc(docRef, data);
  }

  async enviarRecordatorio(telefono: string, nombre: string, link: string, mensaje: string): Promise<void> {
    const mensajePersonalizado = `Hola ${nombre}! ${mensaje}\n\nTu invitación: ${link}`;
    const url = `https://wa.me/593${telefono.replace(/^0/, '')}?text=${encodeURIComponent(mensajePersonalizado)}`;
    
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }
}
