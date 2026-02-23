import { Component, AfterViewInit, PLATFORM_ID, inject, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery1',
  standalone: true,
  templateUrl: './gallery1.html',
  styleUrl: './gallery1.css'
})
export class Gallery1 implements AfterViewInit {
  @ViewChild('galleryImage', { static: false }) galleryImage?: ElementRef;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  isVisible = false;

  ngAfterViewInit() {
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
      if (this.galleryImage?.nativeElement) {
        observer.observe(this.galleryImage.nativeElement);
      }
    }, 100);
  }
}
