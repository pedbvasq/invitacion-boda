import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AppConfig } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private firestore = inject(Firestore);
  private configId = 'app-config';

  async getConfig(): Promise<AppConfig> {
    const docRef = doc(this.firestore, 'config', this.configId);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
      return { googlePhotosLink: '' };
    }
    
    return { id: snapshot.id, ...snapshot.data() } as AppConfig;
  }

  async saveConfig(config: Omit<AppConfig, 'id'>): Promise<void> {
    const docRef = doc(this.firestore, 'config', this.configId);
    await setDoc(docRef, { ...config, updatedAt: new Date() });
  }
}
