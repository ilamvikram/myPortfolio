import { Component, DestroyRef, inject, signal, afterNextRender } from '@angular/core';
import { ScrollService } from '../core/scroll.service';
import { ThemeService } from '../core/theme.service';

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experiences' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact Me' },
];

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  readonly theme = inject(ThemeService);
  readonly scroll = inject(ScrollService);
  readonly links = NAV_LINKS;
  readonly active = signal('home');

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              // the "Why choose me" block belongs to the About link
              const id = entry.target.id === 'why' ? 'about' : entry.target.id;
              this.active.set(id);
              this.centerLink(id);
            }
          }
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
      destroy.onDestroy(() => observer.disconnect());
    });
  }

  /** Keeps the active link visible inside the scrollable nav strip on small screens. */
  private centerLink(id: string): void {
    const a = document.querySelector<HTMLElement>(`.nav-links a[href="#${id}"]`);
    const strip = a?.closest<HTMLElement>('.nav-links');
    if (a && strip) {
      strip.scrollLeft = a.offsetLeft - (strip.clientWidth - a.offsetWidth) / 2;
    }
  }
}
