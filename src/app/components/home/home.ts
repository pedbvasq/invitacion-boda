import { Component } from '@angular/core';
import { Invitation } from "../invitation/invitation";
import { Story } from '../story/story';
import { Rings } from '../rings/rings';
import { Fecha } from '../fecha/fecha';
import { Ubicacion } from '../ubicacion/ubicacion';
import { Gallery1 } from '../gallery1/gallery1';
import { Dresscode } from '../dresscode/dresscode';
import { Gallery2 } from '../gallery2/gallery2';
import { Confirmacion } from '../confirmacion/confirmacion';
import { Fotos } from '../fotos/fotos';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
   standalone: true,
  imports: [Invitation,Story,Rings,Fecha,Ubicacion,Gallery1,Dresscode,Gallery2,Confirmacion,Fotos,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
