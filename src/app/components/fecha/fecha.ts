import { Component, NgZone, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-fecha',
  imports: [],
   standalone: true,
  templateUrl: './fecha.html',
  styleUrl: './fecha.css',
})
export class Fecha implements OnInit, OnDestroy {

  targetDate = new Date('2026-08-07T19:00:00');
  timer: any;

  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);

  ngOnInit(): void {
    this.updateCountdown(); // 👈 inicial
    this.timer = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
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
