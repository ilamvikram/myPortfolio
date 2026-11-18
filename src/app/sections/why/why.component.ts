import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RevealDirective } from '../../core/reveal.directive';
import { WHY_CARDS } from '../../data/why.data';

const EVERY = 3600; // ms between automatic slides
const IDLE = 4500; // ms to wait after the visitor touches the carousel

/** "Why choose me" carousel: autoplay, arrows, dots, mouse drag, keyboard and a pause button. */
@Component({
  selector: 'app-why',
  imports: [RevealDirective],
  templateUrl: './why.component.html',
})
export class WhyComponent {
  readonly cards = WHY_CARDS;
  readonly playing = signal(true);
  readonly current = signal(0);
  readonly pageCount = signal(1);
  readonly dragging = signal(false);
  readonly pages = computed(() => Array.from({ length: this.pageCount() }, (_, i) => i));

  private readonly vp = viewChild.required<ElementRef<HTMLElement>>('vp');
  private readonly wrap = viewChild.required<ElementRef<HTMLElement>>('wrap');
  private lastTouch = 0;
  private anim = 0;
  private onScreen = true;
  private down = false;
  private moved = false;
  private startX = 0;
  private startLeft = 0;
  private scrollTick = false;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      this.measure();
      if (typeof IntersectionObserver !== 'undefined') {
        const io = new IntersectionObserver((e) => (this.onScreen = e[0].isIntersecting), { threshold: 0.2 });
        io.observe(this.wrap().nativeElement);
        destroy.onDestroy(() => io.disconnect());
      }
      // autoplay stays on (even when the OS asks for less motion) and only waits after you use it
      const timer = setInterval(() => {
        if (!this.playing() || document.hidden || !this.onScreen || this.down) {
          return;
        }
        if (Date.now() - this.lastTouch < IDLE) {
          return;
        }
        this.next();
      }, EVERY);
      destroy.onDestroy(() => {
        clearInterval(timer);
        cancelAnimationFrame(this.anim);
      });
    });
  }

  // ---- measurements ----
  private items(): HTMLElement[] {
    return Array.from(this.vp().nativeElement.querySelectorAll<HTMLElement>('.why'));
  }
  private stepWidth(): number {
    const items = this.items();
    return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : this.vp().nativeElement.clientWidth;
  }
  private perView(): number {
    return Math.max(1, Math.round(this.vp().nativeElement.clientWidth / (this.stepWidth() || 1)));
  }
  private pagesNow(): number {
    return Math.max(1, this.items().length - this.perView() + 1);
  }
  private currentNow(): number {
    const x = this.vp().nativeElement.scrollLeft;
    return Math.min(this.pagesNow() - 1, Math.max(0, Math.round(x / (this.stepWidth() || 1))));
  }
  private measure(): void {
    this.pageCount.set(this.pagesNow());
    this.current.set(this.currentNow());
  }

  // ---- movement ----
  private stopAnim(): void {
    cancelAnimationFrame(this.anim);
    this.vp().nativeElement.style.scrollSnapType = '';
  }

  private animateTo(x: number): void {
    const vp = this.vp().nativeElement;
    this.stopAnim();
    const from = vp.scrollLeft;
    const dist = x - from;
    if (Math.abs(dist) < 2) {
      return;
    }
    let t0: number | null = null;
    const dur = 560;
    vp.style.scrollSnapType = 'none';
    const step = (ts: number) => {
      t0 ??= ts;
      const k = Math.min(1, (ts - t0) / dur);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      vp.scrollLeft = from + dist * e;
      if (k < 1) {
        this.anim = requestAnimationFrame(step);
      } else {
        vp.style.scrollSnapType = '';
      }
    };
    this.anim = requestAnimationFrame(step);
  }

  goTo(i: number): void {
    this.touched();
    const page = Math.max(0, Math.min(this.pagesNow() - 1, i));
    this.animateTo(page * this.stepWidth());
  }
  next(): void {
    const c = this.currentNow();
    this.animateTo((c >= this.pagesNow() - 1 ? 0 : c + 1) * this.stepWidth());
  }
  prev(): void {
    const c = this.currentNow();
    this.animateTo((c <= 0 ? this.pagesNow() - 1 : c - 1) * this.stepWidth());
  }
  togglePlay(): void {
    this.playing.update((p) => !p);
    this.touched();
  }
  touched(): void {
    this.lastTouch = Date.now();
  }

  // ---- events ----
  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      this.touched();
      e.key === 'ArrowRight' ? this.next() : this.prev();
    }
  }
  onScroll(): void {
    if (!this.scrollTick) {
      this.scrollTick = true;
      requestAnimationFrame(() => {
        this.scrollTick = false;
        this.current.set(this.currentNow());
      });
    }
  }
  onTouch(): void {
    this.touched();
    this.stopAnim();
  }
  onPointerDown(e: PointerEvent): void {
    this.touched();
    if (e.pointerType !== 'mouse' || e.button !== 0) {
      return;
    }
    this.stopAnim();
    this.down = true;
    this.moved = false;
    this.startX = e.clientX;
    this.startLeft = this.vp().nativeElement.scrollLeft;
  }
  @HostListener('window:pointermove', ['$event'])
  onPointerMove(e: PointerEvent): void {
    if (!this.down) {
      return;
    }
    const dx = e.clientX - this.startX;
    if (!this.moved && Math.abs(dx) > 5) {
      this.moved = true;
      this.dragging.set(true);
    }
    if (this.moved) {
      this.touched();
      this.vp().nativeElement.scrollLeft = this.startLeft - dx;
    }
  }
  @HostListener('window:pointerup')
  @HostListener('window:pointercancel')
  onPointerEnd(): void {
    if (!this.down) {
      return;
    }
    this.down = false;
    if (this.moved) {
      this.dragging.set(false);
      this.touched();
      this.animateTo(this.currentNow() * this.stepWidth());
    }
  }
  /** A drag must not count as a click on whatever is under the cursor. */
  onClickCapture(e: Event): void {
    if (this.moved) {
      e.stopPropagation();
      e.preventDefault();
      this.moved = false;
    }
  }
  @HostListener('window:resize')
  onResize(): void {
    this.measure();
  }
}
