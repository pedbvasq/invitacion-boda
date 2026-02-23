import { Component, OnInit, PLATFORM_ID, inject, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-rings',
  standalone: true,
  templateUrl: './rings.html',
  styleUrl: './rings.css'
})
export class Rings implements OnInit {
  @ViewChild('ringsImage', { static: false }) ringsImage?: ElementRef;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  isVisible = false;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.cdr.detectChanges();
          }
        });
      },
      { threshold: 0.3 }
    );

    setTimeout(() => {
      if (this.ringsImage?.nativeElement) {
        observer.observe(this.ringsImage.nativeElement);
      }
    }, 100);
  }
}
