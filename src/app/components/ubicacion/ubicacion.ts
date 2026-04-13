import { Component, inject } from '@angular/core';
import { InvitationLanguageService } from '../../services/invitation-language.service';

@Component({
  selector: 'app-ubicacion',
  imports: [],
  templateUrl: './ubicacion.html',
  styleUrl: './ubicacion.css',
})
export class Ubicacion {
  lang = inject(InvitationLanguageService);
}
