import { Component, NgZone, OnDestroy, OnInit, signal, ChangeDetectorRef, inject } from '@angular/core';

@Component({
  selector: 'app-fecha',
  imports: [],
   standalone: true,
  templateUrl: './fecha.html',
  styleUrl: './fecha.css',
})
export class Fecha implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  targetDate = new Date('2026-08-15T13:30:00');
  timer: any;

  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);

  ngOnInit(): void {
    this.updateCountdown();
    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.updateCountdown();
        this.cdr.detectChanges();
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateCountdown() {
    const distance = this.targetDate.getTime() - Date.now();

    if (distance <= 0) {
      this.days.set(0);
      this.hours.set(0);
      this.minutes.set(0);
      this.seconds.set(0);
      return;
    }

    this.days.set(Math.floor(distance / (1000 * 60 * 60 * 24)));
    this.hours.set(Math.floor((distance / (1000 * 60 * 60)) % 24));
    this.minutes.set(Math.floor((distance / (1000 * 60)) % 60));
    this.seconds.set(Math.floor((distance / 1000) % 60));
  }

}
