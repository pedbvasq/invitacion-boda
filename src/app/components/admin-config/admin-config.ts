import { Component, inject, OnInit, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { AuthService } from '../../services/auth.service';
import { AppConfig } from '../../models/config.model';

@Component({
  selector: 'app-admin-config',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-config.html',
  styleUrl: './admin-config.css'
})
export class AdminConfig implements OnInit {
  private configService = inject(ConfigService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  googlePhotosLink = '';
  loading = true;
  mostrarInstrucciones = false;

  constructor() {
    afterNextRender(() => {
      this.loadConfig();
    });
  }

  ngOnInit() {}

  async loadConfig() {
    const config = await this.configService.getConfig();
    this.googlePhotosLink = config.googlePhotosLink;
    this.loading = false;
    this.cdr.detectChanges();
  }

  async guardarLink() {
    if (!this.googlePhotosLink.trim()) {
      alert('El link no puede estar vacío');
      return;
    }

    if (!this.googlePhotosLink.includes('photos.app.goo.gl') && !this.googlePhotosLink.includes('photos.google.com')) {
      alert('Por favor ingresa un link válido de Google Photos');
      return;
    }

    if (!confirm('¿Estás seguro de guardar/actualizar este link?')) {
      return;
    }

    await this.configService.saveConfig({ googlePhotosLink: this.googlePhotosLink });
    alert('Link guardado correctamente');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
