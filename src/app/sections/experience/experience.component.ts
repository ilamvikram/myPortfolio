import { Component, ElementRef, HostListener, afterNextRender, signal, viewChild, viewChildren } from '@angular/core';
import { RevealDirective } from '../../core/reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  /** Is the "more responsibilities" part of the job card open? */
  readonly open = signal(false);
  /** How far the timeline line is drawn, in percent. */
  readonly progress = signal(0);
  /** Which timeline nodes the line has reached. */
  readonly nodesOn = signal<boolean[]>([false, false]);

  private readonly timeline = viewChild<ElementRef<HTMLElement>>('timeline');
  private readonly nodes = viewChildren<ElementRef<HTMLElement>>('node');
  private ticking = false;

  constructor() {
    afterNextRender(() => this.update());
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        this.ticking = false;
        this.update();
      });
    }
  }

  private update(): void {
    const tl = this.timeline()?.nativeElement;
    if (!tl) {
      return;
    }
    const line = window.innerHeight * 0.6;
    const r = tl.getBoundingClientRect();
    const p = r.height > 0 ? Math.min(1, Math.max(0, (line - r.top) / r.height)) : 0;
    this.progress.set(p * 100);
    this.nodesOn.set(this.nodes().map((n) => n.nativeElement.getBoundingClientRect().top + 28 < line));
  }
}
