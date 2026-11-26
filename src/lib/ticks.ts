/**
 * "Nice" ticks for a value axis: steps of 1, 2, 2.5 or 5 times a power of ten, covering min..max,
 * with one number of decimals for all labels (so 42.6 | 42.8 | 43.0, never 42,6 | 42,675 | 42,75).
 */
export function niceTicks(min: number, max: number, target = 4): { ticks: number[]; decimals: number } {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return { ticks: [0, 1], decimals: 0 };
  if (min === max) {
    const pad = Math.abs(min) > 0 ? Math.abs(min) * 0.1 : 1;
    min -= pad;
    max += pad;
  }
  const rough = (max - min) / target;
  const power = Math.floor(Math.log10(rough));
  const base = Math.pow(10, power);
  const candidates = [1, 2, 2.5, 5, 10];
  const factor = candidates.find((c) => c * base >= rough) ?? 10;
  const step = factor * base;
  // decimals needed to write the step exactly: 0.25 -> 2, 0.5 -> 1, 20 -> 0
  const stepPower = factor === 10 ? power + 1 : power;
  const decimals = Math.max(0, -stepPower + (factor === 2.5 ? 1 : 0));
  const scale = Math.pow(10, decimals);
  const first = Math.floor(min / step + 1e-9);
  const last = Math.ceil(max / step - 1e-9);
  const ticks: number[] = [];
  for (let i = first; i <= last; i++) ticks.push(Math.round(i * step * scale) / scale);
  return { ticks, decimals };
}
