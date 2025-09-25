export function buildStarLayer(count: number, spread: number) {
  const arr: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * spread;
    const y = Math.random() * spread;
    arr.push(`${x}px ${y}px var(--color-star)`);
  }
  return arr.join(',');
}
