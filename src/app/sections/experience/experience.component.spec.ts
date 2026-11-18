import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    fixture.detectChanges();
  });

  it('expands and collapses the responsibilities', () => {
    const card: HTMLElement = fixture.nativeElement.querySelector('#job-card');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('#job-toggle');
    expect(card.classList.contains('open')).toBeFalse();
    button.click();
    fixture.detectChanges();
    expect(card.classList.contains('open')).toBeTrue();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(button.textContent).toContain('Show fewer responsibilities');
    button.click();
    fixture.detectChanges();
    expect(card.classList.contains('open')).toBeFalse();
  });
});
