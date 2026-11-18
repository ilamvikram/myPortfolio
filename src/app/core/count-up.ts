export interface ParsedCount {
  prefix: string;
  end: number;
  suffix: string;
}

/** "~25%" -> { prefix: '~', end: 25, suffix: '%' }, "300+" -> { '', 300, '+' } */
export function parseCount(text: string): ParsedCount | null {
  const m = /^([^\d]*)(\d+)(.*)$/.exec(text.trim());
  return m ? { prefix: m[1], end: parseInt(m[2], 10), suffix: m[3] } : null;
}

export const easeOutCubic = (k: number): number => 1 - Math.pow(1 - k, 3);

export function formatCount(parsed: ParsedCount, k: number): string {
  return parsed.prefix + Math.round(parsed.end * easeOutCubic(Math.min(1, Math.max(0, k)))) + parsed.suffix;
}

/** Animates the number inside an element from 0 to its final value. */
export function countUp(el: HTMLElement, duration = 1400): void {
  const parsed = parseCount(el.textContent ?? '');
  if (!parsed) {
    return;
  }
  let t0: number | null = null;
  const step = (t: number) => {
    t0 ??= t;
    const k = Math.min(1, (t - t0) / duration);
    el.textContent = formatCount(parsed, k);
    if (k < 1) {
      requestAnimationFrame(step);
    }
  };
  el.textContent = formatCount(parsed, 0);
  requestAnimationFrame(step);
}
