// Audio Engine utilizando Web Audio API nativo
// Totalmente independente de arquivos externos, sem latência e com suporte a mudo

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
    try {
      this.muted = localStorage.getItem('reciclagem_sound_muted') === 'true';
    } catch (e) {
      this.muted = false;
    }
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !this.ctx) {
      try {
        this.ctx = new AudioContextClass();
      } catch (e) {
        console.warn('Web Audio API não suportado:', e);
      }
    }
  }

  resume() {
    this.initAudioContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('reciclagem_sound_muted', this.muted);
    } catch (e) {}
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playPickup() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playBinHover() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.05);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  playSuccess() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch (e) {}
  }

  playError() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playFanfare() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const chords = [
        { notes: [523.25, 659.25], time: 0, dur: 0.15 },
        { notes: [587.33, 698.46], time: 0.15, dur: 0.15 },
        { notes: [659.25, 783.99], time: 0.3, dur: 0.18 },
        { notes: [783.99, 1046.5], time: 0.48, dur: 0.4 }
      ];

      const now = this.ctx.currentTime;

      chords.forEach(item => {
        item.notes.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const startTime = now + item.time;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.18, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + item.dur);
        });
      });
    } catch (e) {}
  }
}

const sounds = new SoundController();
if (typeof window !== 'undefined') {
  window.sounds = sounds;
}
