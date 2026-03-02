import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Guest } from '../models/guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);

  generateToken(): string {
    return crypto.randomUUID();
  }

  async addGuest(nombres: string, apellidos: string, cupoPermitido: number): Promise<void> {
    const guest: Omit<Guest, 'id'> = {
      nombres,
      apellidos,
      cupoPermitido,
      token: this.generateToken(),
      confirmado: false,
      personasConfirmadas: 0,
      createdAt: new Date()
    };
    await addDoc(collection(this.firestore, 'guests'), guest);
  }

  async updateGuest(id: string, data: Partial<Guest>): Promise<void> {
    const guestDoc = doc(this.firestore, 'guests', id);
    await updateDoc(guestDoc, data);
  }

  async deleteGuest(id: string): Promise<void> {
    const guestDoc = doc(this.firestore, 'guests', id);
    await deleteDoc(guestDoc);
  }

  getGuests(): Observable<Guest[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }

    return new Observable(subscriber => {
      const q = query(collection(this.firestore, 'guests'));
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const guests = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Guest));
          subscriber.next(guests);
        },
        (error) => subscriber.error(error)
      );
      return () => unsubscribe();
    });
  }

  async getGuestById(id: string): Promise<Guest | null> {
    try {
      const guestDoc = doc(this.firestore, 'guests', id);
      const snapshot = await getDoc(guestDoc);
      if (!snapshot.exists()) {
        console.log('Guest not found:', id);
        return null;
      }
      const data = { id: snapshot.id, ...snapshot.data() } as Guest;
      console.log('Guest loaded:', data);
      return data;
    } catch (error) {
      console.error('Error loading guest:', error);
      return null;
    }
  }

  async getGuestByToken(token: string): Promise<Guest | null> {
    const q = query(collection(this.firestore, 'guests'), where('token', '==', token));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Guest;
  }

  async confirmGuest(id: string, personasConfirmadas: number): Promise<void> {
    const guestDoc = doc(this.firestore, 'guests', id);
    await updateDoc(guestDoc, {
      confirmado: true,
      personasConfirmadas,
      fechaConfirmacion: new Date()
    });
  }
}
