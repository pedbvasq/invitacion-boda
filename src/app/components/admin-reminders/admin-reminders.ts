import { Component, inject, OnInit, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReminderService } from '../../services/reminder.service';
import { GuestService } from '../../services/guest.service';
import { AuthService } from '../../services/auth.service';
import { ReminderConfig } from '../../models/reminder.model';
import { Guest } from '../../models/guest.model';

@Component({
  selector: 'app-admin-reminders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-reminders.html',
  styleUrl: './admin-reminders.css'
})
export class AdminReminders implements OnInit {
  private reminderService = inject(ReminderService);
  private guestService = inject(GuestService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  config: ReminderConfig = {
    frecuencia: 'mensual',
    diaMensual: 1,
    mensaje: '',
    activo: false,
    fechaBoda: new Date('2026-06-15')
  };

  guests: Guest[] = [];
  loading = true;

  constructor() {
    afterNextRender(() => {
      this.loadData();
    });
  }

  ngOnInit() {}

  async loadData() {
    const savedConfig = await this.reminderService.getConfig();
    if (savedConfig) {
      this.config = savedConfig;
    }

    this.guestService.getGuests().subscribe({
      next: (guests) => {
        this.guests = guests.filter(g => g.confirmado && g.telefono);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  async guardarConfig() {
    await this.reminderService.saveConfig(this.config);
    alert('Configuración guardada');
  }

  async toggleActivo() {
    this.config.activo = !this.config.activo;
    await this.reminderService.updateConfig({ activo: this.config.activo });
    this.cdr.detectChanges();
  }

  async enviarPrueba() {
    if (!this.config.mensaje) {
      alert('Escribe un mensaje primero');
      return;
    }
    
    const link = `${window.location.origin}/test`;
    await this.reminderService.enviarRecordatorio('0997122244', 'Prueba', link, this.config.mensaje);
  }

  async enviarATodos() {
    if (!this.config.mensaje) {
      alert('Escribe un mensaje primero');
      return;
    }

    if (!confirm(`¿Enviar recordatorio a ${this.guestesConTelefono} invitados ahora?`)) {
      return;
    }

    for (const guest of this.guests) {
      const link = `${window.location.origin}/${guest.id}`;
      await this.reminderService.enviarRecordatorio(
        guest.telefono!, 
        guest.nombres, 
        link, 
        this.config.mensaje
      );
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    alert('Recordatorios enviados');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  get guestesConTelefono() {
    return this.guests.length;
  }
}
