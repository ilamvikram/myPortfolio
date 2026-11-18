import { Component, computed, signal } from '@angular/core';
import { RevealDirective } from '../../core/reveal.directive';
import { SKILLS, SKILL_TABS, SkillGroup } from '../../data/skills.data';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  readonly tabs = SKILL_TABS;
  readonly filter = signal<'all' | SkillGroup>('all');
  readonly visible = computed(() => {
    const f = this.filter();
    return f === 'all' ? SKILLS : SKILLS.filter((s) => s.group === f);
  });
}
