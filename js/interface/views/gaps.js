import {
  setupCanvas,
  plotArea,
  niceCeiling,
  drawYGrid,
  drawXLabels,
  drawEmptyMessage
} from './canvas-utils.js';

export function drawGaps(canvas, members, scanLimit) {
  const { ctx, width, height, colors } = setupCanvas(canvas);
  const limit = Math.max(1, Number(scanLimit) || 1);

  const values = [...new Set(members)]
    .filter(n => Number.isFinite(n) && n >= 1 && n <= limit)
    .sort((a, b) => a - b);

  const gaps = values.slice(1).map(
    (n, i) => n - values[i]
  );

  if (!gaps.length) {
    drawEmptyMessage(
      ctx,
      width,
      height,
      'Need at least two members to show gaps',
      colors
    );
    return;
  }

  const maxGap = niceCeiling(
    gaps.reduce((max, value) => Math.max(max, value), 0) * 1.12
  );

  const area = plotArea(width, height, {
    left: 44,
    right: 12,
    top: 18,
    bottom: 30
  });

  drawYGrid(
    ctx,
    area,
    maxGap,
    colors,
    value => String(Number(value.toPrecision(2))),
    4
  );

  drawXLabels(
    ctx,
    area,
    '2nd member',
    `${values.length} members`,
    colors
  );

  ctx.save();
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 1.4;
  ctx.beginPath();

  gaps.forEach((gap, i) => {
    const x = area.x +
      (gaps.length === 1 ? .5 : i / (gaps.length - 1)) * area.w;
    const y = area.y + area.h - gap / maxGap * area.h;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  const radius = gaps.length > area.w ? 1.5 : 2.4;

  gaps.forEach((gap, i) => {
    const x = area.x +
      (gaps.length === 1 ? .5 : i / (gaps.length - 1)) * area.w;
    const y = area.y + area.h - gap / maxGap * area.h;

    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}