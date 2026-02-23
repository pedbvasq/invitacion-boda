import { Component, AfterViewInit, OnInit, PLATFORM_ID, inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-invitation',
  imports: [CommonModule],
  templateUrl: './invitation.html',
  styleUrl: './invitation.css',
  animations: [
    trigger('initialFade', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.85)', filter: 'blur(10px)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)', filter: 'blur(0)' })),
      transition('hidden => visible', animate('1000ms cubic-bezier(0.22, 1, 0.36, 1)'))
    ]),
    trigger('flowerBloom', [
      state('hidden', style({ opacity: 0, transform: 'scale(0) rotate(-15deg)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1) rotate(0deg)' })),
      transition('hidden => visible', animate('700ms cubic-bezier(0.22, 1, 0.36, 1)'))
    ]),
    trigger('letterExpand', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-5px)' }),
        animate('300ms {{delay}}ms cubic-bezier(0.22, 1, 0.36, 1)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ], { params: { delay: 0 } })
    ]),
    trigger('yToFlower', [
      state('y', style({ opacity: 1 })),
      state('flower', style({ opacity: 0 })),
      transition('y => flower', animate('600ms cubic-bezier(0.22, 1, 0.36, 1)'))
    ])
  ]
})
export class Invitation implements OnInit, AfterViewInit {
  @ViewChild('audioPlayer', { static: false }) audioPlayer?: ElementRef<HTMLAudioElement>;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  // Estados de animación
  initialM = 'hidden';
  initialJ = 'hidden';
  flowerState = 'hidden';
  showInitials = true;
  showExpanding = false;
  yState = 'y';
  showFlowerInName = false;
  showRomanticPhrase = false;

  // Datos
  nombreCompleto1 = 'Hugo';
  nombreCompleto2 = 'Maria';
  inicial1 = 'H';
  inicial2 = 'M';

  // Letras adicionales para expansión
  get letrasAdicionales1(): string[] {
    return this.nombreCompleto1.slice(1).split('');
  }

  get letrasAdicionales2(): string[] {
    return this.nombreCompleto2.slice(1).split('');
  }

  ngOnInit() {
    // Resetear estados cada vez que se carga el componente
    this.initialM = 'hidden';
    this.initialJ = 'hidden';
    this.flowerState = 'hidden';
    this.showExpanding = false;
    this.yState = 'y';
    this.showFlowerInName = false;
    this.showRomanticPhrase = false;
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Intentar reproducir el audio
    if (this.audioPlayer?.nativeElement) {
      this.audioPlayer.nativeElement.volume = 0.3;
      this.audioPlayer.nativeElement.play().catch(() => {
        // Si falla el autoplay, esperar interacción del usuario
        document.addEventListener('click', () => {
          this.audioPlayer?.nativeElement?.play();
        }, { once: true });
      });
    }

    // Usar requestAnimationFrame para evitar NG0100
    requestAnimationFrame(() => {
      // Fase 1: Iniciales aparecen con stagger
      setTimeout(() => {
        this.initialM = 'visible';
        this.cdr.detectChanges();
      }, 100);
      
      setTimeout(() => {
        this.initialJ = 'visible';
        this.cdr.detectChanges();
      }, 250);

      // Fase 2: "Y" aparece
      setTimeout(() => {
        this.flowerState = 'visible';
        this.cdr.detectChanges();
      }, 1100);

      // Fase 3: Expansión de nombres
      setTimeout(() => {
        this.showExpanding = true;
        this.cdr.detectChanges();
      }, 3500);

      // Fase 4: Y se convierte en flor
      setTimeout(() => {
        this.yState = 'flower';
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.showFlowerInName = true;
          this.cdr.detectChanges();
        }, 600);
      }, 4000);

      // Fase 5: Frase romántica aparece
      setTimeout(() => {
        this.showRomanticPhrase = true;
        this.cdr.detectChanges();
      }, 5000);
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
