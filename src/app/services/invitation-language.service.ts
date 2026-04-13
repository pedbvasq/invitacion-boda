import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvitationLanguageService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  readonly isEnglish = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null)
      )
      .subscribe(() => this.syncLanguageFromRoute());
  }

  private syncLanguageFromRoute() {
    let currentRoute = this.activatedRoute;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const langParam = currentRoute.snapshot.queryParamMap.get('lang');
    this.isEnglish.set((langParam || '').toLowerCase() === 'en');
  }
}
