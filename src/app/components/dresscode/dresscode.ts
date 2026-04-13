import { Component, inject } from '@angular/core';
import { InvitationLanguageService } from '../../services/invitation-language.service';

@Component({
  selector: 'app-dresscode',
  imports: [],
  templateUrl: './dresscode.html',
  styleUrl: './dresscode.css',
})
export class Dresscode {
  lang = inject(InvitationLanguageService);
}
