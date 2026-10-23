import {
  setupCanvas,
  plotArea,
  niceCeiling,
  drawYGrid,
  drawXLabels,
  drawEmptyMessage
} from './canvas-utils.js';

export function drawDensity(canvas, members, scanLimit) {
  const { ctx, width, height, colors } = setupCanvas(canvas);
  const limit = Math.max(1, Math.floor(Number(scanLimit) || 1));

  const values = [...new Set(members)]
    .filter(n => Number.isInteger(n) && n >= 1 && n <= limit)
    .sort((a, b) => a - b);

  if (!values.length) {
    drawEmptyMessage(
      ctx,
      width,
      height,
      'No members in this range',
      colors
    );
    return;
  }

  const area = plotArea(width, height, {
    left: 48,
    right: 12,
    top: 18,
    bottom: 30
  });

  const samples = Math.max(2, Math.floor(area.w));
  const points = [];
  let memberIndex = 0;
  let maxDensity = 0;

  for (let i = 0; i < samples; i++) {
    const n = Math.max(
      1,
      Math.round(1 + i / (samples - 1) * (limit - 1))
    );

    while (
      memberIndex < values.length &&
      values[memberIndex] <= n
    ) {
      memberIndex++;
    }

    const density = memberIndex / n * 100;
    points.push({ n, density });
    maxDensity = Math.max(maxDensity, density);
  }

  const maxY = niceCeiling(maxDensity * 1.12 || 1);

  drawYGrid(
    ctx,
    area,
    maxY,
    colors,
    value => `${Number(value.toPrecision(2))}%`,
    4
  );

  drawXLabels(
    ctx,
    area,
    '1',
    limit.toLocaleString(),
    colors
  );

  ctx.save();
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 1.6;
  ctx.lineJoin = 'round';
  ctx.beginPath();

  points.forEach((point, i) => {
    const x = area.x + i / (points.length - 1) * area.w;
    const y = area.y + area.h - point.density / maxY * area.h;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
  ctx.restore();
}