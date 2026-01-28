import { Component } from '@angular/core';

@Component({
  selector: 'app-invitation',
  imports: [],
  templateUrl: './invitation.html',
  styleUrl: './invitation.css',
})
export class Invitation {

  iniciales = 'H & M';

scrollTo(id: string) {
  document.getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth' });
}


}
