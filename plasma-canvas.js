// Plasma Cell Canvas Animation
(function () {
  const canvas = document.getElementById('plasma-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initCells(); });

  class Cell {
    constructor() { this.init(true); }
    init(randomY) {
      this.x = Math.random() * canvas.width;
      this.y = randomY ? Math.random() * canvas.height : canvas.height + 60;
      this.r = 10 + Math.random() * 50;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = -(0.12 + Math.random() * 0.35);
      this.alpha = 0.04 + Math.random() * 0.1;
      this.phase = Math.random() * Math.PI * 2;
      this.phaseSpeed = 0.008 + Math.random() * 0.015;
      this.hue = Math.random() > 0.55 ? 'red' : 'blue';
    }
    update() {
      this.x += this.vx + Math.sin(this.phase * 0.7) * 0.15;
      this.y += this.vy;
      this.phase += this.phaseSpeed;
      if (this.y < -this.r * 3) this.init(false);
      if (this.x < -this.r) this.x = canvas.width + this.r;
      if (this.x > canvas.width + this.r) this.x = -this.r;
    }
    draw() {
      const pr = this.r * (1 + 0.08 * Math.sin(this.phase));
      const rgb = this.hue === 'red' ? '235,50,80' : '80,170,255';
      const g = ctx.createRadialGradient(this.x, this.y, pr * 0.1, this.x, this.y, pr * 2.6);
      g.addColorStop(0, `rgba(${rgb},${this.alpha * 0.7})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, pr * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, pr, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb},${this.alpha * 2.2})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(this.x, this.y, pr * 0.38, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb},${this.alpha * 1.4})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  }

  let cells = [];
  function initCells() {
    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
    cells = Array.from({ length: count }, () => new Cell());
  }
  initCells();

  let mx = canvas.width / 2, my = canvas.height / 2;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cells.forEach(c => { c.update(); c.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();