import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

interface Confirmacion {
  nombres: string;
  apellidos: string;
  asistencia: string;
  fecha: any;
}

@Component({
  selector: 'app-admin-confirmaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-confirmaciones.html',
  styleUrl: './admin-confirmaciones.css'
})
export class AdminConfirmaciones implements OnInit, OnDestroy {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private subscription?: Subscription;

  confirmaciones: Confirmacion[] = [];
  totalAsistentes = 0;
  asistentesSi = 0;
  asistentesNo = 0;

  ngOnInit() {
    const confirmacionesRef = collection(this.firestore, 'confirmaciones');
    
    this.subscription = collectionData(confirmacionesRef).subscribe({
      next: (data: any[]) => {
        console.log('Datos recibidos:', data);
        this.confirmaciones = data.sort((a, b) => {
          const fechaA = a.fecha?.toDate ? a.fecha.toDate() : new Date(a.fecha);
          const fechaB = b.fecha?.toDate ? b.fecha.toDate() : new Date(b.fecha);
          return fechaB.getTime() - fechaA.getTime();
        });
        this.calcularEstadisticas();
        this.cdr.detectChanges();
        console.log('Total:', this.totalAsistentes);
      },
      error: (error: any) => {
        console.error('Error al cargar confirmaciones:', error);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  calcularEstadisticas() {
    this.totalAsistentes = this.confirmaciones.length;
    this.asistentesSi = this.confirmaciones.filter(c => 
      c.asistencia.toLowerCase() === 'sí' || c.asistencia.toLowerCase() === 'si'
    ).length;
    this.asistentesNo = this.confirmaciones.filter(c => 
      c.asistencia.toLowerCase() === 'no'
    ).length;
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return 'N/A';
    const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  exportarExcel() {
    const headers = ['Nombres', 'Apellidos', 'Asistencia', 'Fecha'];
    const rows = this.confirmaciones.map(c => [
      c.nombres,
      c.apellidos,
      c.asistencia,
      this.formatearFecha(c.fecha)
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `confirmaciones_boda_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async cerrarSesion() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
