export function animateCounter(element: HTMLElement, duration = 2000): void {
  const target = parseInt(element.dataset.target || '0');
  const suffix = element.dataset.suffix || '';
  const shouldFormat = element.dataset.format === 'true';
  const startTime = performance.now();

  const updateCounter = (currentTime: number): void => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);

    const formatted = shouldFormat
      ? current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      : current.toString();

    element.textContent = formatted + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };

  requestAnimationFrame(updateCounter);
}
