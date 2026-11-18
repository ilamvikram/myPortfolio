import { Injectable, signal } from '@angular/core';

/** Page scroll progress (0 to 1) as a signal, updated at most once per animation frame. */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  readonly progress = signal(0);
  private ticking = false;

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }
    const schedule = () => {
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(() => {
          this.ticking = false;
          this.update();
        });
      }
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    this.update();
  }

  update(): void {
    const el = document.documentElement;
    const max = el.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
  }
}
