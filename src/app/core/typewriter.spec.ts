import { initialTypeState, nextTypeStep } from './typewriter';

describe('typewriter', () => {
  const roles = ['Ab', 'Cde'];

  it('deletes the current word, then types the next one', () => {
    let state = initialTypeState(roles);
    const seen: string[] = [];
    for (let i = 0; i < 8; i++) {
      const step = nextTypeStep(roles, state);
      state = step.state;
      seen.push(step.text);
    }
    expect(seen).toEqual(['A', '', 'C', 'Cd', 'Cde', 'Cd', 'C', '']);
  });

  it('pauses longer once a word is complete', () => {
    let state = { roleIndex: 1, length: 2, direction: 1 as const };
    const step = nextTypeStep(roles, state);
    expect(step.text).toBe('Cde');
    expect(step.delay).toBe(2200);
    expect(step.state.direction).toBe(-1);
  });

  it('wraps around to the first role', () => {
    let state = { roleIndex: 1, length: 1, direction: -1 as const };
    const step = nextTypeStep(roles, state);
    expect(step.state.roleIndex).toBe(0);
    expect(step.state.direction).toBe(1);
  });
});
