import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';
import { countUp } from './count-up';

const siblingIndex = new WeakMap<Element, number>();

/**
 * Applies to every element with class "rv". Blocks that start below the fold fade/slide in
 * when they scroll into view (numbers marked with data-count also count up). Blocks that are
 * already visible are left alone, so nothing flashes.
 */
@Directive({ selector: '.rv' })
export class RevealDirective implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => this.init());
  }

  private init(): void {
    const el = this.host.nativeElement;
    const parent = el.parentElement;
    let index = 0;
    if (parent) {
      index = siblingIndex.get(parent) ?? 0;
      siblingIndex.set(parent, index + 1);
    }
    el.style.setProperty('--rd', Math.min(index, 5) * 0.09 + 's');

    const belowFold = el.getBoundingClientRect().top > window.innerHeight * 0.92;
    if (!belowFold || typeof IntersectionObserver === 'undefined') {
      this.counts().forEach((c) => countUp(c));
      el.classList.remove('rv');
      return;
    }
    el.classList.add('pre');
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) {
          return;
        }
        this.observer?.disconnect();
        el.classList.remove('pre');
        this.counts().forEach((c) => countUp(c));
        this.timer = setTimeout(() => {
          el.classList.remove('rv');
          el.style.removeProperty('--rd');
        }, 1800);
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    this.observer.observe(el);
  }

  private counts(): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('[data-count]'));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    clearTimeout(this.timer);
  }
}
