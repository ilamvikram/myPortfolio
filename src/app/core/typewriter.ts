export interface TypeState {
  roleIndex: number;
  length: number;
  direction: 1 | -1;
}

export interface TypeStep {
  state: TypeState;
  text: string;
  /** milliseconds to wait before the next step */
  delay: number;
}

export function initialTypeState(roles: string[]): TypeState {
  return { roleIndex: 0, length: roles[0].length, direction: -1 };
}

/** One tick of the "delete the word, type the next one" animation. Pure, so it is easy to test. */
export function nextTypeStep(roles: string[], s: TypeState): TypeStep {
  if (s.direction === -1) {
    const length = s.length - 1;
    const text = roles[s.roleIndex].slice(0, length);
    if (length <= 0) {
      return { state: { roleIndex: (s.roleIndex + 1) % roles.length, length, direction: 1 }, text, delay: 300 };
    }
    return { state: { ...s, length }, text, delay: 45 };
  }
  const word = roles[s.roleIndex];
  const length = s.length + 1;
  const text = word.slice(0, length);
  if (length >= word.length) {
    return { state: { ...s, length, direction: -1 }, text, delay: 2200 };
  }
  return { state: { ...s, length }, text, delay: 85 };
}
