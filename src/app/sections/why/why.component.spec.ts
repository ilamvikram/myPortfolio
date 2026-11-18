import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WHY_CARDS } from '../../data/why.data';
import { WhyComponent } from './why.component';

describe('WhyComponent', () => {
  let fixture: ComponentFixture<WhyComponent>;
  let component: WhyComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders every card', () => {
    expect(fixture.nativeElement.querySelectorAll('.why').length).toBe(WHY_CARDS.length);
  });

  it('starts playing and the pause button toggles it', () => {
    const pp: HTMLButtonElement = fixture.nativeElement.querySelector('.c-pp');
    expect(component.playing()).toBeTrue();
    pp.click();
    fixture.detectChanges();
    expect(component.playing()).toBeFalse();
    expect(pp.getAttribute('aria-label')).toBe('Play auto-play');
    pp.click();
    fixture.detectChanges();
    expect(component.playing()).toBeTrue();
    expect(pp.getAttribute('aria-label')).toBe('Pause auto-play');
  });

  it('has at least one dot', () => {
    expect(fixture.nativeElement.querySelectorAll('.c-dot').length).toBeGreaterThan(0);
  });
});
