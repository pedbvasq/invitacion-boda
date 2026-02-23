import { Component, OnInit, AfterViewInit, PLATFORM_ID, inject, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-story',
  imports: [],
  templateUrl: './story.html',
  styleUrl: './story.css',
})
export class Story implements OnInit, AfterViewInit {
  @ViewChild('storySection', { static: false }) storySection?: ElementRef;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  
  showIntro = false;
  showPhrase = false;
  showPhotoText = false;
  hasAnimated = false;

  ngOnInit() {
    this.showIntro = false;
    this.showPhrase = false;
    this.showPhotoText = false;
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.startAnimations();
          }
        });
      },
      { threshold: 0.3 }
    );

    setTimeout(() => {
      if (this.storySection?.nativeElement) {
        observer.observe(this.storySection.nativeElement);
      }
    }, 100);
  }

  private startAnimations() {
    setTimeout(() => {
      this.showIntro = true;
      this.cdr.detectChanges();
    }, 300);

    setTimeout(() => {
      this.showPhrase = true;
      this.cdr.detectChanges();
    }, 1500);

    setTimeout(() => {
      this.showPhotoText = true;
      this.cdr.detectChanges();
    }, 3500);
  }
}
