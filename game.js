// ==========================================================================
// DESAFIO DA RECICLAGEM - MOTOR PRINCIPAL DO JOGO (GAME ENGINE)
// ==========================================================================

// Suporta execução autônoma (standalone offline) e módulos
const getBINS = () => (typeof window !== 'undefined' && window.BINS) ? window.BINS : {};
const getPhases = () => (typeof window !== 'undefined' && window.GAME_PHASES) ? window.GAME_PHASES : [];
const getSounds = () => (typeof window !== 'undefined' && window.sounds) ? window.sounds : {
  playPickup: () => {},
  playBinHover: () => {},
  playSuccess: () => {},
  playError: () => {},
  playFanfare: () => {},
  toggleMute: () => false,
  isMuted: () => false,
  resume: () => {}
};
const getConfetti = () => (typeof window !== 'undefined' && window.confetti) ? window.confetti : {
  burst: () => {}
};

class RecyclingGame {
  constructor() {
    this.currentPhaseIndex = 0;
    this.currentItemIndex = 0;
    this.score = 0;
    this.hits = 0;
    this.errors = 0;
    this.streak = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.selectedItemForClick = false;
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.isEvaluating = false;

    this.dom = {
      screens: {
        start: document.getElementById('start-screen'),
        game: document.getElementById('game-screen'),
        results: document.getElementById('results-screen')
      },
      hud: {
        score: document.getElementById('hud-score'),
        hits: document.getElementById('hud-hits'),
        errors: document.getElementById('hud-errors'),
        phaseBadge: document.getElementById('hud-phase-badge'),
        timerChip: document.getElementById('hud-timer-chip'),
        timerVal: document.getElementById('hud-timer-val'),
        progressBar: document.getElementById('phase-progress-fill'),
        muteBtn: document.getElementById('btn-mute'),
        restartBtn: document.getElementById('btn-restart')
      },
      gameplay: {
        instructions: document.getElementById('game-instructions'),
        wasteCard: document.getElementById('waste-item-card'),
        wasteEmoji: document.getElementById('waste-emoji'),
        wasteName: document.getElementById('waste-name'),
        wasteHint: document.getElementById('waste-hint'),
        binsContainer: document.getElementById('bins-container')
      },
      modal: {
        overlay: document.getElementById('edu-modal-overlay'),
        icon: document.getElementById('edu-item-icon'),
        title: document.getElementById('edu-item-title'),
        destBin: document.getElementById('edu-bin-destination'),
        explanation: document.getElementById('edu-explanation'),
        curiosity: document.getElementById('edu-curiosity-text'),
        nextBtn: document.getElementById('edu-next-btn')
      },
      levelUp: {
        overlay: document.getElementById('level-up-modal'),
        title: document.getElementById('level-up-title'),
        desc: document.getElementById('level-up-desc'),
        score: document.getElementById('level-up-score'),
        nextBtn: document.getElementById('level-up-next-btn')
      },
      results: {
        score: document.getElementById('result-final-score'),
        hits: document.getElementById('result-final-hits'),
        errors: document.getElementById('result-final-errors'),
        accuracy: document.getElementById('result-accuracy'),
        rank: document.getElementById('result-eco-rank'),
        restartBtn: document.getElementById('btn-play-again')
      },
      toast: document.getElementById('toast-feedback')
    };

    this.init();
  }

  init() {
    this.renderBins();
    this.bindEvents();
    this.updateMuteButtonVisual();
  }

  // Renderiza as 6 lixeiras dinamicamente conforme padrão CONAMA (ou preserva as do HTML)
  renderBins() {
    const container = this.dom.gameplay.binsContainer;
    if (!container) return;

    // Se já existem as 6 lixeiras no HTML, preserva
    if (container.querySelectorAll('.bin').length === 6) {
      return;
    }

    container.innerHTML = '';
    const bins = getBINS();
    Object.values(bins).forEach(bin => {
      const binEl = document.createElement('div');
      binEl.className = 'bin';
      binEl.dataset.type = bin.id;
      binEl.setAttribute('role', 'button');
      binEl.setAttribute('aria-label', `Lixeira ${bin.name} (${bin.colorName})`);
      binEl.setAttribute('tabindex', '0');

      binEl.innerHTML = `
        <div class="bin-lid">
          <div class="bin-lid-handle"></div>
        </div>
        <div class="bin-body">
          <div class="bin-ribs">
            <span class="bin-rib"></span>
            <span class="bin-rib"></span>
            <span class="bin-rib"></span>
          </div>
          <div class="bin-recycle-symbol">♻️</div>
          <div class="bin-label">${bin.name}</div>
          <div class="bin-sublabel">${bin.colorName}</div>
        </div>
      `;

      container.appendChild(binEl);
    });
  }

  bindEvents() {
    const btnStart = document.getElementById('btn-start-game');
    if (btnStart) {
      btnStart.addEventListener('click', () => this.startGame());
    }

    if (this.dom.results.restartBtn) {
      this.dom.results.restartBtn.addEventListener('click', () => this.startGame());
    }

    if (this.dom.hud.restartBtn) {
      this.dom.hud.restartBtn.addEventListener('click', () => {
        if (confirm('Deseja reiniciar a partida?')) {
          this.startGame();
        }
      });
    }

    if (this.dom.hud.muteBtn) {
      this.dom.hud.muteBtn.addEventListener('click', () => {
        getSounds().toggleMute();
        this.updateMuteButtonVisual();
      });
    }

    if (this.dom.modal.nextBtn) {
      this.dom.modal.nextBtn.addEventListener('click', () => this.closeEduModalAndAdvance());
    }

    if (this.dom.levelUp && this.dom.levelUp.nextBtn) {
      this.dom.levelUp.nextBtn.addEventListener('click', () => {
        this.dom.levelUp.overlay.classList.remove('active');
        this.startCurrentPhase();
      });
    }

    // Tecla Espaço ou Enter para avançar modais
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        if (this.dom.levelUp && this.dom.levelUp.overlay && this.dom.levelUp.overlay.classList.contains('active')) {
          e.preventDefault();
          this.dom.levelUp.overlay.classList.remove('active');
          this.startCurrentPhase();
        } else if (this.dom.modal.overlay.classList.contains('active')) {
          e.preventDefault();
          this.closeEduModalAndAdvance();
        }
      }
    });

    this.setupInteractions();
  }

  updateMuteButtonVisual() {
    if (this.dom.hud.muteBtn) {
      const isMuted = getSounds().isMuted();
      this.dom.hud.muteBtn.textContent = isMuted ? '🔇' : '🔊';
      this.dom.hud.muteBtn.setAttribute('title', isMuted ? 'Ativar som' : 'Silenciar');
    }
  }

  // Interações de Arrastar e Soltar (PointerEvents) e Toque/Clique Acessível
  setupInteractions() {
    const card = this.dom.gameplay.wasteCard;
    if (!card) return;

    // Pointer Events no Cartão (Suporta Mouse, Touchpad e Touchscreen)
    card.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      getSounds().resume();
      getSounds().playPickup();
      this.activePointerId = e.pointerId;
      card.setPointerCapture(e.pointerId);

      const rect = card.getBoundingClientRect();
      this.originalCardRect = rect;
      this.dragOffsetX = e.clientX - rect.left;
      this.dragOffsetY = e.clientY - rect.top;

      this.isDragging = false;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
    });

    card.addEventListener('pointermove', (e) => {
      if (this.activePointerId !== e.pointerId) return;

      const dist = Math.hypot(e.clientX - this.dragStartX, e.clientY - this.dragStartY);
      if (dist > 5 && !this.isDragging) {
        this.isDragging = true;
        card.classList.add('dragging');
        card.classList.remove('selected');
        this.selectedItemForClick = false;
        this.setBinsClickableState(false);
      }

      if (this.isDragging) {
        card.style.position = 'fixed';
        card.style.zIndex = '9999';
        card.style.pointerEvents = 'none';
        card.style.left = `${e.clientX - this.dragOffsetX}px`;
        card.style.top = `${e.clientY - this.dragOffsetY}px`;

        const hoveredBin = this.getBinUnderPoint(e.clientX, e.clientY, card);
        const bins = document.querySelectorAll('.bin');
        bins.forEach(bin => {
          if (bin === hoveredBin) {
            if (!bin.classList.contains('drag-over')) {
              bin.classList.add('drag-over');
              getSounds().playBinHover();
            }
          } else {
            bin.classList.remove('drag-over');
          }
        });
      }
    });

    const finishPointer = (e) => {
      if (this.activePointerId !== e.pointerId) return;
      const pointerId = this.activePointerId;
      this.activePointerId = null;

      try {
        card.releasePointerCapture(pointerId);
      } catch (err) {}

      document.querySelectorAll('.bin').forEach(bin => bin.classList.remove('drag-over'));

      if (this.isDragging) {
        this.isDragging = false;
        card.classList.remove('dragging');

        // Detecção geométrica precisa da lixeira antes de resetar a posição
        const targetBin = this.getBinUnderPoint(e.clientX, e.clientY, card);
        this.resetCardTransform(card);

        if (targetBin) {
          const binType = targetBin.dataset.type;
          this.handleDropEvaluation(binType, targetBin);
        }
      } else {
        // Foi apenas um clique ou toque -> Ativa/desativa modo de seleção por toque
        this.toggleSelectItemMode();
      }
    };

    card.addEventListener('pointerup', finishPointer);
    card.addEventListener('pointercancel', finishPointer);

    // Suporte a Clique/Tap e Teclado direto nas Lixeiras
    this.dom.gameplay.binsContainer.addEventListener('click', (e) => {
      const bin = e.target.closest('.bin');
      if (bin) {
        this.handleDropEvaluation(bin.dataset.type, bin);
      }
    });

    this.dom.gameplay.binsContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const bin = e.target.closest('.bin');
        if (bin) {
          e.preventDefault();
          this.handleDropEvaluation(bin.dataset.type, bin);
        }
      }
    });
  }

  // Detecção geométrica 100% confiável da lixeira sob o cursor ou sobreposta pelo cartão
  getBinUnderPoint(x, y, cardElement) {
    const bins = document.querySelectorAll('.bin');
    const margin = 20;

    // 1. Verificação por coordenadas do cursor/toque (x, y)
    for (const bin of bins) {
      const rect = bin.getBoundingClientRect();
      if (
        x >= rect.left - margin &&
        x <= rect.right + margin &&
        y >= rect.top - margin &&
        y <= rect.bottom + margin
      ) {
        return bin;
      }
    }

    // 2. Verificação por sobreposição física do cartão com a lixeira
    if (cardElement) {
      const cRect = cardElement.getBoundingClientRect();
      for (const bin of bins) {
        const bRect = bin.getBoundingClientRect();
        const overlapX = Math.max(0, Math.min(cRect.right, bRect.right) - Math.max(cRect.left, bRect.left));
        const overlapY = Math.max(0, Math.min(cRect.bottom, bRect.bottom) - Math.max(cRect.top, bRect.top));
        if (overlapX > 25 && overlapY > 20) {
          return bin;
        }
      }
    }

    return null;
  }

  resetCardTransform(card) {
    card.style.position = '';
    card.style.zIndex = '';
    card.style.left = '';
    card.style.top = '';
    card.style.pointerEvents = '';
  }

  toggleSelectItemMode() {
    this.selectedItemForClick = !this.selectedItemForClick;
    const card = this.dom.gameplay.wasteCard;
    const instructions = this.dom.gameplay.instructions;

    if (this.selectedItemForClick) {
      card.classList.add('selected');
      instructions.textContent = '👇 Agora toque na lixeira correspondente!';
      instructions.classList.add('item-selected');
      this.setBinsClickableState(true);
    } else {
      card.classList.remove('selected');
      instructions.textContent = 'Arraste o objeto para a lixeira correta';
      instructions.classList.remove('item-selected');
      this.setBinsClickableState(false);
    }
  }

  setBinsClickableState(active) {
    document.querySelectorAll('.bin').forEach(bin => {
      if (active) {
        bin.classList.add('clickable-target');
      } else {
        bin.classList.remove('clickable-target');
      }
    });
  }

  startGame() {
    this.score = 0;
    this.hits = 0;
    this.errors = 0;
    this.streak = 0;
    this.currentPhaseIndex = 0;
    this.currentItemIndex = 0;
    this.selectedItemForClick = false;

    this.showScreen('game');
    this.startCurrentPhase();
  }

  startCurrentPhase() {
    const phases = getPhases();
    const phase = phases[this.currentPhaseIndex];
    if (!phase) return;

    this.currentItemIndex = 0;
    this.dom.hud.phaseBadge.textContent = phase.badge;

    if (this.timerInterval) clearInterval(this.timerInterval);

    if (phase.timeLimit) {
      this.timerSeconds = phase.timeLimit;
      this.dom.hud.timerChip.classList.add('active');
      this.dom.hud.timerVal.textContent = `${this.timerSeconds}s`;

      this.timerInterval = setInterval(() => {
        this.timerSeconds--;
        this.dom.hud.timerVal.textContent = `${this.timerSeconds}s`;

        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.handleTimeOut();
        }
      }, 1000);
    } else {
      this.dom.hud.timerChip.classList.remove('active');
    }

    this.updateHUD();
    this.loadCurrentItem();
  }

  loadCurrentItem() {
    const phases = getPhases();
    const phase = phases[this.currentPhaseIndex];
    if (!phase) return;

    const item = phase.items[this.currentItemIndex];
    if (!item) {
      this.handlePhaseComplete();
      return;
    }

    const card = this.dom.gameplay.wasteCard;
    this.resetCardTransform(card);
    card.classList.remove('correct-drop', 'shake-error', 'selected', 'pop-in');

    // Força reflow para reiniciar animação pop-in do novo resíduo
    void card.offsetWidth;
    card.classList.add('pop-in');

    this.selectedItemForClick = false;
    this.setBinsClickableState(false);

    this.dom.gameplay.instructions.textContent = 'Toque na lixeira certa ou arraste o resíduo!';
    // Renderiza SVG vetorial nítido (elimina retângulos vazios / fontes ausentes)
    this.dom.gameplay.wasteEmoji.innerHTML = item.svg || item.emoji;
    this.dom.gameplay.wasteName.textContent = item.name;
    this.dom.gameplay.wasteHint.textContent = item.tip;

    const progressPercent = ((this.currentItemIndex) / phase.items.length) * 100;
    this.dom.hud.progressBar.style.width = `${progressPercent}%`;
  }

  handleDropEvaluation(binType, targetBinElement) {
    if (this.isEvaluating) return;

    const phases = getPhases();
    const phase = phases[this.currentPhaseIndex];
    const item = phase.items[this.currentItemIndex];
    const card = this.dom.gameplay.wasteCard;
    if (!item || !card) return;

    this.selectedItemForClick = false;
    card.classList.remove('selected');
    this.setBinsClickableState(false);

    const isCorrect = (binType === item.bin);

    if (isCorrect) {
      this.isEvaluating = true;
      // ✅ ACERTOU: +10 pontos
      this.hits++;
      this.streak++;
      this.score += 10;
      getSounds().playSuccess();

      if (targetBinElement) {
        const rect = targetBinElement.getBoundingClientRect();
        getConfetti().burst(rect.left + rect.width / 2, rect.top, 25, 120);
        targetBinElement.classList.add('drag-over');
        setTimeout(() => targetBinElement.classList.remove('drag-over'), 300);
      } else {
        getConfetti().burst(null, null, 25);
      }

      // O resíduo desaparece suavemente caindo na lixeira
      card.classList.add('correct-drop');

      const bins = getBINS();
      const binInfo = bins[item.bin] || { name: '' };
      this.showToast(`Muito bem! ♻️ +10 | ${item.name} ➔ ${binInfo.name}!`, 'success');
      this.updateHUD();

      // Próximo resíduo aparece em seguida!
      setTimeout(() => {
        this.advanceToNextItem();
      }, 350);

    } else {
      // ❌ ERROU: -5 pontos
      this.errors++;
      this.streak = 0;
      this.score = Math.max(0, this.score - 5);
      getSounds().playError();

      this.showToast('Ops! Tente novamente. (-5 pontos)', 'error');
      this.updateHUD();

      card.classList.add('shake-error');
      setTimeout(() => {
        card.classList.remove('shake-error');
        this.resetCardTransform(card);
      }, 450);
    }
  }

  advanceToNextItem() {
    this.isEvaluating = false;
    this.currentItemIndex++;
    const phases = getPhases();
    const phase = phases[this.currentPhaseIndex];

    if (this.currentItemIndex >= phase.items.length) {
      this.handlePhaseComplete();
    } else {
      this.loadCurrentItem();
    }
  }

  updateHUD() {
    this.dom.hud.score.textContent = this.score;
    this.dom.hud.hits.textContent = this.hits;
    this.dom.hud.errors.textContent = this.errors;
  }

  showToast(message, type = 'success') {
    const toast = this.dom.toast;
    toast.textContent = message;
    toast.className = `toast-feedback ${type} show`;

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 1600);
  }

  openEduModal(item) {
    const bins = getBINS();
    const binInfo = bins[item.bin] || { name: 'Desconhecido', emoji: '♻️', colorName: '', color: '#2e7d32' };

    this.dom.modal.icon.innerHTML = item.svg || item.emoji;
    this.dom.modal.title.textContent = item.name;
    this.dom.modal.destBin.textContent = `Lixeira: ${binInfo.emoji} ${binInfo.name} (${binInfo.colorName})`;
    this.dom.modal.destBin.style.background = binInfo.color;
    this.dom.modal.explanation.textContent = item.explanation;
    this.dom.modal.curiosity.textContent = item.curiosity;

    this.dom.modal.overlay.classList.add('active');
  }

  closeEduModalAndAdvance() {
    this.dom.modal.overlay.classList.remove('active');
    this.advanceToNextItem();
  }

  handlePhaseComplete() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    getSounds().playFanfare();
    getConfetti().burst(window.innerWidth / 2, window.innerHeight / 3, 80);

    const phases = getPhases();
    const hasNextPhase = (this.currentPhaseIndex + 1 < phases.length);

    if (hasNextPhase) {
      this.currentPhaseIndex++;
      const nextPhase = phases[this.currentPhaseIndex];
      this.showLevelUpModal(nextPhase);
    } else {
      setTimeout(() => {
        this.showFinalResults();
      }, 700);
    }
  }

  showLevelUpModal(nextPhase) {
    if (this.dom.levelUp && this.dom.levelUp.overlay) {
      this.dom.levelUp.title.textContent = `Avançando para o ${nextPhase.name}!`;
      this.dom.levelUp.desc.textContent = nextPhase.description;
      this.dom.levelUp.score.textContent = this.score;
      this.dom.levelUp.overlay.classList.add('active');
    } else {
      this.showToast(`Parabéns! Avançando para o ${nextPhase.name}! 🌟`, 'success');
      setTimeout(() => {
        this.startCurrentPhase();
      }, 1200);
    }
  }

  handleTimeOut() {
    getSounds().playError();
    alert('⏱️ O tempo acabou na Fase Desafio!');
    this.showFinalResults();
  }

  showFinalResults() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.showScreen('results');
    getSounds().playFanfare();
    getConfetti().burst(window.innerWidth / 2, window.innerHeight / 3, 100);

    const totalQuestions = this.hits + this.errors;
    const accuracy = totalQuestions > 0 ? Math.round((this.hits / totalQuestions) * 100) : 0;

    this.dom.results.score.textContent = this.score;
    this.dom.results.hits.textContent = this.hits;
    this.dom.results.errors.textContent = this.errors;
    this.dom.results.accuracy.textContent = `${accuracy}%`;

    let rankTitle = '🌱 Aprendiz da Reciclagem';
    if (this.score >= 180 && accuracy >= 85) {
      rankTitle = '🏆 Mestre Supremo da Sustentabilidade!';
    } else if (this.score >= 120 && accuracy >= 70) {
      rankTitle = '🌟 Guardião da Natureza!';
    } else if (this.score >= 70) {
      rankTitle = '🌿 Amigo do Meio Ambiente!';
    }

    this.dom.results.rank.textContent = rankTitle;
  }

  showScreen(screenName) {
    Object.keys(this.dom.screens).forEach(key => {
      if (key === screenName) {
        this.dom.screens[key].classList.add('active');
      } else {
        this.dom.screens[key].classList.remove('active');
      }
    });
  }
}

// Inicializa o jogo quando o DOM carregar
window.addEventListener('DOMContentLoaded', () => {
  window.recyclingGame = new RecyclingGame();
});
