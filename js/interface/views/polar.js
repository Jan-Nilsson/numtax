export function drawPolar(canvas, members, scanLimit) {
  const size = canvas.offsetWidth * devicePixelRatio;

  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const scale = (size / 2 - 6) / Math.sqrt(scanLimit);

  context.clearRect(0, 0, size, size);

  const theme = document.documentElement.dataset.theme;
  const pointColor =
    theme === 'light'
      ? 'rgba(0,0,0,0.12)'
      : 'rgba(255,255,255,0.06)';

  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent')
    .trim();

  const step =
    scanLimit >= 500000
      ? 4
      : scanLimit >= 100000
        ? 2
        : 1;

  context.fillStyle = pointColor;

  for (let n = 1; n <= scanLimit; n += step) {
    const angle = n;
    const radius = Math.sqrt(n) * scale;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    context.fillRect(Math.round(x), Math.round(y), 1, 1);
  }

  context.fillStyle = accent;

  for (const n of members) {
    const angle = n;
    const radius = Math.sqrt(n) * scale;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    context.fillRect(
      Math.round(x) - 1,
      Math.round(y) - 1,
      2,
      2
    );
  }
}