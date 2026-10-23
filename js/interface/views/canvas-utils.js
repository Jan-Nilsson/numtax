export function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, rect.width || 320);
  const height = Math.max(1, rect.height || 180);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const root = getComputedStyle(document.documentElement);
  const color = (name, fallback) =>
    root.getPropertyValue(name).trim() || fallback;

  return {
    ctx,
    width,
    height,
    colors: {
      bg: color('--bg', '#ffffff'),
      bg2: color('--bg2', '#f5f5f5'),
      border: color('--border', 'rgba(128,128,128,.3)'),
      fg: color('--fg', '#242424'),
      muted: color('--fg-muted', '#777777'),
      accent: color('--accent', '#7865d8')
    }
  };
}

export function plotArea(width, height, options = {}) {
  const left = options.left ?? 42;
  const right = options.right ?? 14;
  const top = options.top ?? 18;
  const bottom = options.bottom ?? 30;

  return {
    x: left,
    y: top,
    w: Math.max(1, width - left - right),
    h: Math.max(1, height - top - bottom)
  };
}

export function niceCeiling(value) {
  if (!Number.isFinite(value) || value <= 0) return 1;

  const power = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / power;
  const step = normalized <= 1
    ? 1
    : normalized <= 2
      ? 2
      : normalized <= 5
        ? 5
        : 10;

  return step * power;
}

export function drawYGrid(
  ctx,
  area,
  maxY,
  colors,
  format = value => String(Math.round(value)),
  ticks = 4
) {
  ctx.save();
  ctx.font = '10px "IBM Plex Mono", monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let i = 0; i <= ticks; i++) {
    const fraction = i / ticks;
    const y = area.y + area.h - fraction * area.h;
    const value = maxY * fraction;

    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(area.x, Math.round(y) + .5);
    ctx.lineTo(area.x + area.w, Math.round(y) + .5);
    ctx.stroke();

    ctx.fillStyle = colors.muted;
    ctx.fillText(format(value), area.x - 7, y);
  }

  ctx.restore();
}

export function drawXLabels(ctx, area, leftLabel, rightLabel, colors) {
  ctx.save();
  ctx.font = '10px "IBM Plex Mono", monospace';
  ctx.fillStyle = colors.muted;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillText(leftLabel, area.x, area.y + area.h + 9);

  ctx.textAlign = 'right';
  ctx.fillText(rightLabel, area.x + area.w, area.y + area.h + 9);
  ctx.restore();
}

export function drawEmptyMessage(ctx, width, height, message, colors) {
  ctx.save();
  ctx.fillStyle = colors.muted;
  ctx.font = '12px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(message, width / 2, height / 2);
  ctx.restore();
}