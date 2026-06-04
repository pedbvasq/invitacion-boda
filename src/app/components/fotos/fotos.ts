import { Component, inject, OnInit, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { InvitationLanguageService } from '../../services/invitation-language.service';

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
  lang = inject(InvitationLanguageService);

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
      alert(this.lang.isEnglish() ? 'Google Photos link is not configured yet' : 'El enlace de Google Photos no está configurado');
      return;
    }
    window.open(this.googlePhotosLink, '_blank');
  }
}
