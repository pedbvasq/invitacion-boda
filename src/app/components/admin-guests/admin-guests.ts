import { Component, inject, OnInit, PLATFORM_ID, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { AuthService } from '../../services/auth.service';
import { Guest } from '../../models/guest.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-guests',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-guests.html',
  styleUrl: './admin-guests.css'
})
export class AdminGuests implements OnInit {
  private guestService = inject(GuestService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  guests: Guest[] = [];
  filtroEstado: 'todos' | 'confirmados' | 'pendientes' = 'todos';
  showAddForm = false;
  editingGuest: Guest | null = null;

  // Form fields
  nombres = '';
  apellidos = '';
  cupoPermitido = 1;

  constructor() {
    afterNextRender(() => {
      this.loadGuests();
    });
  }

  ngOnInit() {}

  loadGuests() {
    console.log('Admin loading guests...');
    this.guestService.getGuests().subscribe({
      next: (guests: any) => {
        console.log('Guests received:', guests);
        this.guests = guests.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
          const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime();
          return timeB - timeA;
        });
        console.log('Guests sorted:', this.guests.length);
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading guests:', error);
      }
    });
  }

  async addGuest() {
    if (!this.nombres || !this.apellidos) return;
    await this.guestService.addGuest(this.nombres, this.apellidos, this.cupoPermitido);
    this.resetForm();
  }

  editGuest(guest: Guest) {
    this.editingGuest = guest;
    this.nombres = guest.nombres;
    this.apellidos = guest.apellidos;
    this.cupoPermitido = guest.cupoPermitido;
    this.showAddForm = true;
  }

  async saveEdit() {
    if (!this.editingGuest) return;
    await this.guestService.updateGuest(this.editingGuest.id!, {
      nombres: this.nombres,
      apellidos: this.apellidos,
      cupoPermitido: this.cupoPermitido
    });
    this.resetForm();
  }

  async deleteGuest(id: string) {
    if (confirm('¿Eliminar este invitado?')) {
      await this.guestService.deleteGuest(id);
    }
  }

  resetForm() {
    this.nombres = '';
    this.apellidos = '';
    this.cupoPermitido = 1;
    this.showAddForm = false;
    this.editingGuest = null;
  }

  copyLink(id: string) {
    const link = `${window.location.origin}/${id}`;
    navigator.clipboard.writeText(link);
    alert('Link copiado al portapapeles');
  }

  downloadTemplate() {
    const template = [
      { nombres: 'Juan', apellidos: 'Pérez', cupoPermitido: 2 },
      { nombres: 'María', apellidos: 'García', cupoPermitido: 1 }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invitados');
    XLSX.writeFile(wb, 'plantilla_invitados.xlsx');
  }

  async uploadExcel(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      for (const row of jsonData) {
        if (row.nombres && row.apellidos && row.cupoPermitido) {
          await this.guestService.addGuest(row.nombres, row.apellidos, row.cupoPermitido);
        }
      }
      alert(`${jsonData.length} invitados agregados`);
      event.target.value = '';
    };
    reader.readAsArrayBuffer(file);
  }

  exportGuests() {
    const data = this.guests.map(g => ({
      nombres: g.nombres,
      apellidos: g.apellidos,
      cupoPermitido: g.cupoPermitido,
      confirmado: g.confirmado ? 'Sí' : 'No',
      personasConfirmadas: g.personasConfirmadas,
      link: `${window.location.origin}/${g.id}`
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invitados');
    XLSX.writeFile(wb, 'lista_invitados.xlsx');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  async deleteAllGuests() {
    if (!confirm('¿Estás seguro de que quieres eliminar TODOS los invitados? Esta acción no se puede deshacer.')) {
      return;
    }
    
    for (const guest of this.guests) {
      await this.guestService.deleteGuest(guest.id!);
    }
    alert('Todos los invitados han sido eliminados');
  }

  get guestsFiltrados() {
    if (this.filtroEstado === 'confirmados') {
      return this.guests.filter(g => g.confirmado);
    }
    if (this.filtroEstado === 'pendientes') {
      return this.guests.filter(g => !g.confirmado);
    }
    return this.guests;
  }

  get totalInvitados() {
    return this.guests.length;
  }

  get confirmados() {
    return this.guests.filter(g => g.confirmado).length;
  }

  get totalPersonas() {
    return this.guests.reduce((sum, g) => sum + (g.confirmado ? g.personasConfirmadas : 0), 0);
  }
}
