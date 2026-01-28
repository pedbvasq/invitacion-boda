import { Component } from '@angular/core';
import { Invitation } from "../invitation/invitation";
import { Story } from '../story/story';
import { Fecha } from '../fecha/fecha';
import { Ubicacion } from '../ubicacion/ubicacion';
import { Footer } from '../footer/footer';
import { Confirmacion } from '../confirmacion/confirmacion';
import { Dresscode } from '../dresscode/dresscode';

@Component({
  selector: 'app-home',
   standalone: true,
  imports: [Invitation,Story,Fecha,Ubicacion,Dresscode,Confirmacion,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
