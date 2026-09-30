// Sistema de Partículas e Confetes em Canvas para Comemorações

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animating = false;
    this.initCanvas();
  }

  initCanvas() {
    // Aguarda o DOM estar pronto se necessário
    if (!document.body) {
      window.addEventListener('DOMContentLoaded', () => this.initCanvas());
      return;
    }
    if (document.getElementById('confetti-canvas')) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
    this.canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
    if (this.ctx) {
      this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
  }

  burst(x, y, count = 40, spread = 360) {
    if (!this.canvas) this.initCanvas();
    const colors = ['#43a047', '#1e88e5', '#fbc02d', '#e53935', '#795548', '#00e676', '#ffeb3b'];
    const originX = (x !== null && x !== undefined) ? x : window.innerWidth / 2;
    const originY = (y !== null && y !== undefined) ? y : window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 180) * (spread === 360 ? Math.random() * 360 : 270 + (Math.random() * spread - spread / 2));
      const speed = Math.random() * 8 + 4;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.012,
        gravity: 0.18
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.loop();
    }
  }

  loop() {
    if (!this.animating || !this.ctx) return;

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
}

const confetti = new ConfettiEngine();
if (typeof window !== 'undefined') {
  window.confetti = confetti;
}

