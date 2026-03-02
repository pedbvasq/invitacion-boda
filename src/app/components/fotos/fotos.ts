import { Component, inject, OnInit, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fotos.html',
  styleUrl: './fotos.css'
})
export class Fotos implements OnInit {
  private configService = inject(ConfigService);
  private cdr = inject(ChangeDetectorRef);
  
  googlePhotosLink = '';
  loading = true;

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

  abrirGooglePhotos() {
    if (!this.googlePhotosLink) {
      alert('El link de Google Photos no está configurado');
      return;
    }
    window.open(this.googlePhotosLink, '_blank');
  }
}

