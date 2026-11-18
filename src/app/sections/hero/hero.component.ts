import { Component, DestroyRef, inject, signal, afterNextRender } from '@angular/core';
import { initialTypeState, nextTypeStep } from '../../core/typewriter';

export const ROLES = ['Frontend Developer', 'Angular Developer', 'TypeScript Developer'];

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  /** The role that is currently typed out in the hero. */
  readonly role = signal(ROLES[0]);

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      let state = initialTypeState(ROLES);
      let timer: ReturnType<typeof setTimeout>;
      const tick = () => {
        const step = nextTypeStep(ROLES, state);
        state = step.state;
        this.role.set(step.text);
        timer = setTimeout(tick, step.delay);
      };
      timer = setTimeout(tick, 3200);
      destroy.onDestroy(() => clearTimeout(timer));
    });
  }
}
