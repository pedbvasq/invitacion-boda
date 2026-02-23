import { Component, OnInit, PLATFORM_ID, inject, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery2',
  standalone: true,
  templateUrl: './gallery2.html',
  styleUrl: './gallery2.css'
})
export class Gallery2 implements OnInit {
  @ViewChild('galleryImage', { static: false }) galleryImage?: ElementRef;
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
      if (this.galleryImage?.nativeElement) {
        observer.observe(this.galleryImage.nativeElement);
      }
    }, 100);
  }
}
