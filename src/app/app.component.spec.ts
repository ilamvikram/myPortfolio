import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('renders every section of the portfolio', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    for (const id of ['home', 'about', 'why', 'services', 'skills', 'experience', 'projects', 'contact']) {
      expect(root.querySelector(`main section#${id}`)).withContext(id).not.toBeNull();
    }
  });

  it('keeps a single floating WhatsApp button and no scroll arrow', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelectorAll('.fab-wa').length).toBe(1);
    expect(root.querySelector('.fab-scroll')).toBeNull();
  });

  it('highlights a card on click and clears it on the next click elsewhere', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.proj') as HTMLElement;
    card.click();
    expect(card.classList.contains('sel')).toBeTrue();
    document.body.click();
    expect(card.classList.contains('sel')).toBeFalse();
  });
});
