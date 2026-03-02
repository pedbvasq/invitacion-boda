import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest.model';

@Component({
  selector: 'app-guest-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guest-confirmation.html',
  styleUrl: './guest-confirmation.css'
})
export class GuestConfirmation implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private guestService = inject(GuestService);

  guest: Guest | null = null;
  loading = true;
  error = false;
  personasConfirmadas = 1;
  confirmado = false;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.guest = await this.guestService.getGuestById(id);
    this.loading = false;

    if (!this.guest) {
      this.error = true;
    } else if (this.guest.confirmado) {
      this.confirmado = true;
      this.personasConfirmadas = this.guest.personasConfirmadas;
    }
  }

  async confirmar() {
    if (!this.guest || this.personasConfirmadas < 1 || this.personasConfirmadas > this.guest.cupoPermitido) {
      alert('Número de personas inválido');
      return;
    }

    await this.guestService.confirmGuest(this.guest.id!, this.personasConfirmadas);
    this.confirmado = true;
  }

  get personasOptions() {
    return Array.from({ length: this.guest?.cupoPermitido || 1 }, (_, i) => i + 1);
  }
}
