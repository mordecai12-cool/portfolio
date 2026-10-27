(() => {
  const canvas = document.querySelector('.ambient-particles');
  const button = document.querySelector('.motion-toggle');
  if (!canvas || !button) return;
  const context = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = reduced.matches;
  const finePointer = window.matchMedia('(pointer: fine)');
  let paused = false;
  try { paused = localStorage.getItem('portfolio-motion-paused') === 'true'; } catch {}
  let width = 0, height = 0, points = [], frame = 0, lastTime = 0;
  let pointer = null;
  const label = button.querySelector('[data-motion-label]');

  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
    if (context) context.setTransform(scale, 0, 0, scale, 0, 0);
    const count = width < 600 ? 16 : 32;
    points = Array.from({length: count}, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .12, vy: (Math.random() - .5) * .12,
      radius: Math.random() * 1.4 + .7
    }));
    if (context) draw(0);
  }

  function draw(delta) {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    for (const point of points) {
      point.x += point.vx * delta; point.y += point.vy * delta;
      if (point.x < -10) point.x = width + 10;
      if (point.x > width + 10) point.x = -10;
      if (point.y < -10) point.y = height + 10;
      if (point.y > height + 10) point.y = -10;
      context.beginPath(); context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(83, 121, 165, .25)'; context.fill();
    }
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 125) {
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(83, 121, 165, ${(1 - distance / 125) * .13})`;
          context.lineWidth = .7; context.stroke();
        }
      }
    }
    if (pointer && finePointer.matches && !paused && !reduceMotion) {
      for (const point of points) {
        const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
        if (distance < 160) {
          context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(pointer.x, pointer.y);
          context.strokeStyle = `rgba(83, 121, 165, ${(1 - distance / 160) * .24})`;
          context.lineWidth = .8; context.stroke();
        }
      }
    }
  }

  function animate(time) {
    if (paused || reduceMotion || document.hidden) { frame = 0; return; }
    if (time - lastTime >= 40) {
      const delta = Math.min((time - lastTime) / 16.67, 3);
      draw(delta); lastTime = time;
    }
    frame = requestAnimationFrame(animate);
  }

  function sync() {
    cancelAnimationFrame(frame); frame = 0; lastTime = 0;
    const stopped = paused || reduceMotion;
    document.body.dataset.motion = stopped || document.hidden ? 'paused' : 'running';
    button.hidden = false; button.disabled = reduceMotion;
    button.setAttribute('aria-pressed', String(stopped));
    label.textContent = reduceMotion ? 'Motion reduced' : paused ? 'Play motion' : 'Pause motion';
    if (!stopped && !document.hidden) frame = requestAnimationFrame(animate);
    else draw(0);
  }

  button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('portfolio-motion-paused', String(paused)); } catch {}
    sync();
  });
  window.addEventListener('pointermove', event => { if (finePointer.matches) pointer = {x: event.clientX, y: event.clientY}; }, {passive:true});
  document.addEventListener('pointerleave', () => { pointer = null; });
  window.addEventListener('blur', () => { pointer = null; });
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); }, {passive:true});
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', event => { reduceMotion = event.matches; sync(); });
  window.addEventListener('focus', () => { reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; sync(); });
  resize(); sync();
})();
