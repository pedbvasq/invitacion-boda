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
  asistenciaSeleccionada: 'si' | 'no' = 'si';
  guestAsistira = true;
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
      this.guestAsistira = this.guest.asistira !== false;
      this.asistenciaSeleccionada = this.guestAsistira ? 'si' : 'no';
      this.personasConfirmadas = this.guest.personasConfirmadas;
    }

    this.cdr.detectChanges();
  }

  async confirmar() {
    if (!this.guest) {
      return;
    }

    if (this.asistenciaSeleccionada === 'no') {
      await this.guestService.confirmGuest(this.guest.id!, 0, false);
      this.personasConfirmadas = 0;
      this.guestAsistira = false;
      this.confirmado = true;
      this.cdr.detectChanges();
      return;
    }

    const maxAsistentes = this.guest.cupoPermitido > 0 ? this.guest.cupoPermitido : 1;
    const personasAConfirmar = this.guest.cupoPermitido > 0 ? this.personasConfirmadas : 1;

    if (personasAConfirmar < 1 || personasAConfirmar > maxAsistentes) {
      alert(this.lang.isEnglish() ? 'Invalid number of guests' : 'Numero de personas invalido');
      return;
    }

    await this.guestService.confirmGuest(this.guest.id!, personasAConfirmar, true);
    this.personasConfirmadas = personasAConfirmar;
    this.guestAsistira = true;
    this.confirmado = true;
    this.cdr.detectChanges();
  }

  get personasOptions() {
    if (!this.guest) return [1];
    const cupo = this.guest.cupoPermitido > 0 ? this.guest.cupoPermitido : 1;
    return Array.from({ length: cupo }, (_, i) => i + 1);
  }
}
