import { setupCanvas } from './canvas-utils.js';

function spiralCoordinate(n) {
  if (n <= 1) return [0, 0];

  const ring = Math.ceil((Math.sqrt(n) - 1) / 2);
  const max = (2 * ring + 1) ** 2;
  const offset = max - n;
  const side = 2 * ring;

  if (offset < side) {
    return [ring - offset, -ring];
  }

  if (offset < 2 * side) {
    return [-ring, -ring + offset - side];
  }

  if (offset < 3 * side) {
    return [-ring + offset - 2 * side, ring];
  }

  return [ring, ring - offset + 3 * side];
}

export function drawSquareSpiral(canvas, members, scanLimit) {
  const { ctx, width, height, colors } = setupCanvas(canvas);
  const limit = Math.max(1, Number(scanLimit) || 1);
  const radius = Math.max(
    1,
    Math.ceil((Math.sqrt(limit) - 1) / 2)
  );

  const margin = 14;
  const cell = Math.min(
    (width - margin * 2) / (radius * 2 + 1),
    (height - margin * 2) / (radius * 2 + 1)
  );

  const centerX = width / 2;
  const centerY = height / 2;
  const dot = Math.max(1, Math.min(3.4, cell * .72));

  const included = [...new Set(members)].filter(
    n => Number.isInteger(n) && n >= 1 && n <= limit
  );

  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin, centerY + .5);
  ctx.lineTo(width - margin, centerY + .5);
  ctx.moveTo(centerX + .5, margin);
  ctx.lineTo(centerX + .5, height - margin);
  ctx.stroke();

  for (const n of included) {
    const [x, y] = spiralCoordinate(n);
    const px = centerX + x * cell;
    const py = centerY - y * cell;

    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(px, py, Math.max(.7, dot / 2), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = colors.muted;
  ctx.font = '10px "IBM Plex Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(
    `${included.length.toLocaleString()} members`,
    10,
    8
  );
}