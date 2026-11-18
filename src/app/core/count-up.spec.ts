import { formatCount, parseCount } from './count-up';

describe('count-up helpers', () => {
  it('parses plain, suffixed and prefixed numbers', () => {
    expect(parseCount('300+')).toEqual({ prefix: '', end: 300, suffix: '+' });
    expect(parseCount('~25%')).toEqual({ prefix: '~', end: 25, suffix: '%' });
    expect(parseCount('20+')?.end).toBe(20);
  });

  it('returns null when there is no number', () => {
    expect(parseCount('n/a')).toBeNull();
  });

  it('starts at 0 and ends on the final value', () => {
    const p = parseCount('~30%')!;
    expect(formatCount(p, 0)).toBe('~0%');
    expect(formatCount(p, 1)).toBe('~30%');
  });

  it('never goes past the final value', () => {
    expect(formatCount(parseCount('300+')!, 5)).toBe('300+');
  });
});
