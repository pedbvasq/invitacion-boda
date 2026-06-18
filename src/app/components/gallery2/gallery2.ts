import { Component, AfterViewInit, PLATFORM_ID, inject, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery2',
  standalone: true,
  templateUrl: './gallery2.html',
  styleUrl: './gallery2.css'
})
export class Gallery2 implements AfterViewInit {
  @ViewChild('galleryImage', { static: false }) galleryImage?: ElementRef;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  isVisible = false;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const reveal = () => {
      if (this.isVisible) return;
      this.isVisible = true;
      this.cdr.detectChanges();
    };

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    setTimeout(() => {
      if (this.galleryImage?.nativeElement) {
        observer.observe(this.galleryImage.nativeElement);
        setTimeout(reveal, 1200);
      }
    }, 100);
  }
}
