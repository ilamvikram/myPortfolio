import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SKILLS } from '../../data/skills.data';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let fixture: ComponentFixture<SkillsComponent>;
  let component: SkillsComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const cards = () => fixture.nativeElement.querySelectorAll('.skill') as NodeListOf<HTMLElement>;

  it('shows every skill by default', () => {
    expect(cards().length).toBe(SKILLS.length);
  });

  it('filters by group with signals', () => {
    component.filter.set('ops');
    fixture.detectChanges();
    const expected = SKILLS.filter((s) => s.group === 'ops').length;
    expect(component.visible().length).toBe(expected);
    expect(cards().length).toBe(expected);
  });

  it('marks the active tab with aria-pressed', () => {
    const tabs = fixture.nativeElement.querySelectorAll('.tab') as NodeListOf<HTMLButtonElement>;
    tabs[1].click();
    fixture.detectChanges();
    expect(component.filter()).toBe('front');
    expect(tabs[1].getAttribute('aria-pressed')).toBe('true');
    expect(tabs[0].getAttribute('aria-pressed')).toBe('false');
  });

  it('includes the Signals and Unit Testing skills', () => {
    const names = SKILLS.map((s) => s.name);
    expect(names).toContain('Angular Signals');
    expect(names.some((n) => /unit testing/i.test(n))).toBeTrue();
  });
});
