import {
  setupCanvas,
  plotArea,
  niceCeiling,
  drawYGrid,
  drawEmptyMessage
} from './canvas-utils.js';

const MODULUS = 12;

export function drawModular(canvas, members, scanLimit) {
  const { ctx, width, height, colors } = setupCanvas(canvas);
  const limit = Math.max(1, Number(scanLimit) || 1);

  const values = [...new Set(members)].filter(
    n => Number.isInteger(n) && n >= 1 && n <= limit
  );

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

  const counts = Array(MODULUS).fill(0);

  for (const n of values) {
    counts[n % MODULUS]++;
  }

  const maxY = niceCeiling(Math.max(...counts) * 1.12);

  const area = plotArea(width, height, {
    left: 42,
    right: 12,
    top: 18,
    bottom: 32
  });

  drawYGrid(
    ctx,
    area,
    maxY,
    colors,
    value => String(Math.round(value)),
    4
  );

  const slot = area.w / MODULUS;
  const barWidth = Math.max(2, slot * .62);

  counts.forEach((count, residue) => {
    const barHeight = count / maxY * area.h;
    const x = area.x + residue * slot + (slot - barWidth) / 2;
    const y = area.y + area.h - barHeight;

    ctx.fillStyle = colors.accent;
    ctx.fillRect(
      x,
      y,
      barWidth,
      Math.max(count ? 1 : 0, barHeight)
    );

    ctx.fillStyle = colors.muted;
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(
      String(residue),
      x + barWidth / 2,
      area.y + area.h + 9
    );
  });

  ctx.fillStyle = colors.muted;
  ctx.font = '10px "IBM Plex Mono", monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`n mod ${MODULUS}`, width - 12, height - 2);
}