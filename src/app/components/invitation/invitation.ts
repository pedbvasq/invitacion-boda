import { Component, AfterViewInit, OnInit, PLATFORM_ID, inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InvitationLanguageService } from '../../services/invitation-language.service';

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
  lang = inject(InvitationLanguageService);

  initialM = 'hidden';
  initialJ = 'hidden';
  flowerState = 'hidden';
  showInitials = true;
  showExpanding = false;
  yState = 'y';
  showFlowerInName = false;
  showRomanticPhrase = false;
  isPlaying = false;

  nombreCompleto1 = 'Hugo';
  nombreCompleto2 = 'María';
  inicial1 = 'H';
  inicial2 = 'M';

  get letrasAdicionales1(): string[] {
    return this.nombreCompleto1.slice(1).split('');
  }

  get letrasAdicionales2(): string[] {
    return this.nombreCompleto2.slice(1).split('');
  }

  ngOnInit() {
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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.initialM = 'visible';
          this.cdr.detectChanges();
        }, 100);

        setTimeout(() => {
          this.initialJ = 'visible';
          this.cdr.detectChanges();
        }, 250);

        setTimeout(() => {
          this.flowerState = 'visible';
          this.cdr.detectChanges();
        }, 1100);

        setTimeout(() => {
          this.showExpanding = true;
          this.cdr.detectChanges();
        }, 3500);

        setTimeout(() => {
          this.yState = 'flower';
          this.cdr.detectChanges();

          setTimeout(() => {
            this.showFlowerInName = true;
            this.cdr.detectChanges();
          }, 600);
        }, 4000);

        setTimeout(() => {
          this.showRomanticPhrase = true;
          this.cdr.detectChanges();
        }, 5000);
      });
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMusic() {
    if (!this.audioPlayer?.nativeElement) return;

    const audio = this.audioPlayer.nativeElement;

    if (this.isPlaying) {
      audio.pause();
      this.isPlaying = false;
    } else {
      audio.volume = 0.3;
      audio.play();
      this.isPlaying = true;
    }
  }
}
