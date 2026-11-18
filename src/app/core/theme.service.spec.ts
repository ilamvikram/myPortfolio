import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('iv-theme');
    document.documentElement.removeAttribute('data-theme');
  });

  it('toggles between dark and light and remembers the choice', () => {
    const service = TestBed.inject(ThemeService);
    const start = service.dark();
    service.toggle();
    expect(service.dark()).toBe(!start);
    expect(document.documentElement.getAttribute('data-theme')).toBe(start ? 'light' : 'dark');
    expect(localStorage.getItem('iv-theme')).toBe(start ? 'light' : 'dark');
  });

  it('restores a saved theme', () => {
    localStorage.setItem('iv-theme', 'dark');
    const service = TestBed.inject(ThemeService);
    expect(service.dark()).toBeTrue();
  });
});
