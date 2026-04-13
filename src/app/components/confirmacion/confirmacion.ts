import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest.model';
import { InvitationLanguageService } from '../../services/invitation-language.service';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css',
})
export class Confirmacion implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private guestService = inject(GuestService);
  private cdr = inject(ChangeDetectorRef);
  lang = inject(InvitationLanguageService);

  guest: Guest | null = null;
  loading = true;
  error = false;
  personasConfirmadas = 1;
  confirmado = false;
  guestId: string | null = null;

  ngOnInit() {
    setTimeout(() => this.loadGuest(), 0);
  }

  async loadGuest() {
    this.guestId = this.route.snapshot.paramMap.get('id');

    if (!this.guestId) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.guest = await this.guestService.getGuestById(this.guestId);
    this.loading = false;

    if (!this.guest) {
      this.error = true;
    } else if (this.guest.confirmado) {
      this.confirmado = true;
      this.personasConfirmadas = this.guest.personasConfirmadas;
    }

    this.cdr.detectChanges();
  }

  async confirmar() {
    if (!this.guest || this.personasConfirmadas < 1 || this.personasConfirmadas > this.guest.cupoPermitido) {
      alert(this.lang.isEnglish() ? 'Invalid number of guests' : 'Numero de personas invalido');
      return;
    }

    await this.guestService.confirmGuest(this.guest.id!, this.personasConfirmadas);
    this.confirmado = true;
    this.cdr.detectChanges();
  }

  get personasOptions() {
    if (!this.guest) return [1];
    return Array.from({ length: this.guest.cupoPermitido }, (_, i) => i + 1);
  }
}
