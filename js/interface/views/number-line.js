export function drawNumberLine(canvas, members, scanLimit) {
  const ratio = window.devicePixelRatio || 1;
  const width = Math.floor(canvas.clientWidth * ratio);
  const height = Math.floor(canvas.clientHeight * ratio);

  if (!width || !height) return;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue('--accent').trim() || '#888';
  const axisColor = styles.getPropertyValue('--border').trim() || 'rgba(128,128,128,.5)';
  const textColor = styles.getPropertyValue('--text-muted').trim() || 'rgba(128,128,128,.9)';

  const left = 22 * ratio;
  const right = width - 16 * ratio;
  const axisY = height * 0.52;
  const span = right - left;

  context.clearRect(0, 0, width, height);
  context.lineWidth = ratio;
  context.strokeStyle = axisColor;

  context.beginPath();
  context.moveTo(left, axisY);
  context.lineTo(right, axisY);
  context.stroke();

  const tickRatios = [0, 0.25, 0.5, 0.75, 1];

  context.font = `${10 * ratio}px "IBM Plex Mono", monospace`;
  context.fillStyle = textColor;

  tickRatios.forEach((fraction, index) => {
    const x = left + span * fraction;
    const value = Math.round(1 + (scanLimit - 1) * fraction);

    context.beginPath();
    context.moveTo(x, axisY - 4 * ratio);
    context.lineTo(x, axisY + 4 * ratio);
    context.stroke();

    context.textAlign = index === 0
      ? 'left'
      : index === tickRatios.length - 1
        ? 'right'
        : 'center';

    context.fillText(value.toLocaleString(), x, axisY + 22 * ratio);
  });

  context.strokeStyle = accent;
  context.lineWidth = ratio;
  context.beginPath();

  for (const n of members) {
    const x = left + ((n - 1) / Math.max(1, scanLimit - 1)) * span;
    context.moveTo(x, axisY - 7 * ratio);
    context.lineTo(x, axisY + 7 * ratio);
  }

  context.stroke();
}