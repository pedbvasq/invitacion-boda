import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
      provideFirebaseApp(() => initializeApp({
    apiKey: "AIzaSyDTZp0AGD6RYYGqtXH9aby1wQvGE78XMOE",
    authDomain: "boda-invitacion-c7592.firebaseapp.com",
    projectId: "boda-invitacion-c7592",
  })),
  provideFirestore(() => getFirestore())
  ]
};
