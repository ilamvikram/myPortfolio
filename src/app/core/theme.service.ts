import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

const KEY = 'iv-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly dark = signal(false);

  constructor() {
    const saved = this.read();
    if (saved) {
      this.doc.documentElement.setAttribute('data-theme', saved);
    }
    this.dark.set(this.detectDark());
  }

  toggle(): void {
    const next = this.dark() ? 'light' : 'dark';
    this.doc.documentElement.setAttribute('data-theme', next);
    this.dark.set(next === 'dark');
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage can be blocked, the toggle still works for this visit */
    }
  }

  private detectDark(): boolean {
    const attr = this.doc.documentElement.getAttribute('data-theme');
    if (attr) {
      return attr === 'dark';
    }
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  }

  private read(): string | null {
    try {
      const v = localStorage.getItem(KEY);
      return v === 'dark' || v === 'light' ? v : null;
    } catch {
      return null;
    }
  }
}
