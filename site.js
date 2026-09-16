const body = document.body;
const header = document.querySelector('.site-header');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const setupRovingTabs = (buttons, activate) => {
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activate(button.dataset));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
      const next = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? buttons.length - 1
          : (index + direction + buttons.length) % buttons.length;
      buttons[next].focus();
      activate(buttons[next].dataset);
    });
  });
};

const methodData = {
  frame: {
    label: '01 / Frame',
    title: 'Find the question that matters.',
    copy: 'I map people, dependencies, and constraints before deciding which part is actually worth changing.',
    proof: 'Interviews · observation · systems mapping',
  },
  translate: {
    label: '02 / Translate',
    title: 'Make evidence useful together.',
    copy: 'I make relationships, trade-offs, and possible actions visible enough for a team or a user to move through them together.',
    proof: 'Journey mapping · interaction flows · service scenarios',
  },
  test: {
    label: '03 / Test',
    title: 'Test ideas against real behaviour.',
    copy: 'I prototype an interaction, a rule, or a space early so that assumptions can meet real behaviour before they become expensive.',
    proof: 'Interactive prototypes · simulations · iterative refinement',
  },
};

const methodExplorer = document.querySelector('.method-explorer');
const methodButtons = [...document.querySelectorAll('[data-method]')];
const methodPanel = document.querySelector('#method-panel');

if (methodExplorer && methodPanel && methodButtons.length) {
  const updateMethod = ({ method }) => {
    const content = methodData[method];
    if (!content) return;
    methodExplorer.dataset.activeMethod = method;
    methodButtons.forEach((button) => {
      const active = button.dataset.method === method;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    methodPanel.setAttribute('aria-labelledby', `method-${method}`);
    methodPanel.querySelector('.method-label').textContent = content.label;
    methodPanel.querySelector('h3').textContent = content.title;
    methodPanel.querySelector('.method-panel > p:not(.eyebrow):not(.method-proof)').textContent = content.copy;
    methodPanel.querySelector('.method-proof').innerHTML = `<span>In practice</span>${content.proof}`;
  };
  setupRovingTabs(methodButtons, updateMethod);
}

const aiData = {
  language: {
    label: 'Language / Doubao + Gemini',
    title: 'Turn research into a clear story.',
    copy: 'I use them to explore narrative directions, project plans, and video storyboards from my own research notes. I select, rewrite, and set the final voice.',
    src: 'assets/ai-gemini-v2.png',
    alt: 'A dark research installation with translucent layers and a red inquiry line',
    caption: 'Research / synthesis',
  },
  logic: {
    label: 'Logic / Codex + DeepSeek',
    title: 'Turn systems into working logic.',
    copy: 'I use them to prototype interfaces, interaction rules, and mathematical logic. I test behaviour, review edge cases, and refine the implementation myself.',
    src: 'assets/ai-codex-v2.png',
    alt: 'A graphite and glass system model with finely lit connections',
    caption: 'Code / logic',
  },
  form: {
    label: 'Form / Hunyuan',
    title: 'Turn spatial ideas into tangible form.',
    copy: 'I use it to make spatial, material, and 3D hypotheses visible, then decide which forms genuinely support the design.',
    src: 'assets/ai-hunyuan-v2.png',
    alt: 'A layered terrain model in clay, resin, and brass',
    caption: 'Modelling / 3D',
  },
};

const aiExplorer = document.querySelector('.ai-explorer');
const aiButtons = [...document.querySelectorAll('[data-ai]')];
const aiPanel = document.querySelector('#ai-panel');

if (aiExplorer && aiPanel && aiButtons.length) {
  const updateAi = ({ ai }) => {
    const content = aiData[ai];
    if (!content) return;
    aiExplorer.dataset.activeAi = ai;
    aiButtons.forEach((button) => {
      const active = button.dataset.ai === ai;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    aiPanel.setAttribute('aria-labelledby', `ai-${ai}`);
    aiPanel.querySelector('.ai-label').textContent = content.label;
    aiPanel.querySelector('h3').textContent = content.title;
    aiPanel.querySelector('.ai-copy > p:last-child').textContent = content.copy;
    const image = aiPanel.querySelector('img');
    image.src = content.src;
    image.alt = content.alt;
    aiPanel.querySelector('figcaption').textContent = content.caption;
  };
  setupRovingTabs(aiButtons, updateAi);
}

const cosmos = document.querySelector('.method-cosmos');
const cosmosCore = cosmos?.querySelector('.cosmos-core');
const cosmosBodies = cosmos ? [...cosmos.querySelectorAll('.cosmos-body')] : [];
const cosmosTrailCanvas = cosmos?.querySelector('.cosmos-trails');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (cosmos && cosmosCore && cosmosBodies.length === 3 && !prefersReducedMotion.matches) {
  const tau = Math.PI * 2;
  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
  const trailContext = cosmosTrailCanvas?.getContext('2d');
  const trailLifetime = 13_500;
  const trailSampleInterval = 130;
  const trailColors = ['126, 216, 229', '240, 181, 104', '145, 211, 182'];
  const satellites = cosmosBodies.map((element, index) => ({
    element,
    phase: (tau / cosmosBodies.length) * index,
    seed: Math.random() * tau,
    frequency: .15 + Math.random() * .035,
  }));
  const state = {
    width: 0,
    height: 0,
    coreRadius: 0,
    bodyRadius: 0,
    inView: false,
    frame: 0,
  };
  const trails = satellites.map(() => []);
  let trailPixelRatio = 1;
  let lastTrailSample = 0;
  let trailsReady = false;

  const clearTrails = () => {
    trails.forEach((trail) => {
      trail.length = 0;
    });
    lastTrailSample = 0;
    trailsReady = false;
    if (trailContext && state.width && state.height) {
      trailContext.clearRect(0, 0, state.width, state.height);
    }
  };

  const resizeTrailCanvas = () => {
    if (!trailContext || !cosmosTrailCanvas || !state.width || !state.height) return;
    trailPixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    cosmosTrailCanvas.width = Math.round(state.width * trailPixelRatio);
    cosmosTrailCanvas.height = Math.round(state.height * trailPixelRatio);
    trailContext.setTransform(trailPixelRatio, 0, 0, trailPixelRatio, 0, 0);
    clearTrails();
  };

  const measureCosmos = () => {
    const bounds = cosmos.getBoundingClientRect();
    state.width = bounds.width;
    state.height = bounds.height;
    state.coreRadius = cosmosCore.getBoundingClientRect().width / 2;
    state.bodyRadius = Math.max(...cosmosBodies.map((body) => body.getBoundingClientRect().width / 2));
    resizeTrailCanvas();
  };

  const restoreFallbackPositions = () => {
    cosmosBodies.forEach((body) => {
      body.style.removeProperty('left');
      body.style.removeProperty('top');
      body.style.removeProperty('transform');
    });
  };

  const calculateSatellitePositions = (now) => {
    const { width, height, coreRadius, bodyRadius } = state;
    if (!width || !height || !coreRadius || !bodyRadius) return null;

    const edge = Math.max(8, Math.min(18, Math.min(width, height) * .05));
    const clearance = Math.max(8, bodyRadius * .2);
    const phaseJitter = .075;
    const minimumPhaseGap = (tau / cosmosBodies.length) - (phaseJitter * 2);
    const coreClearance = coreRadius + bodyRadius + clearance;
    const bodyClearance = ((bodyRadius * 2) + clearance) / (2 * Math.sin(minimumPhaseGap / 2));
    const minimumOrbit = Math.max(coreClearance, bodyClearance);
    const horizontalLimit = (width / 2) - bodyRadius - edge;
    const verticalLimit = (height / 2) - bodyRadius - edge;

    if (horizontalLimit < minimumOrbit || verticalLimit < minimumOrbit) {
      return null;
    }

    const radialWobble = .014;
    const horizontalDrift = Math.min(width * .012, (horizontalLimit - minimumOrbit) * .24);
    const verticalDrift = Math.min(height * .012, (verticalLimit - minimumOrbit) * .24);
    const safeHorizontalRadius = (horizontalLimit - horizontalDrift) / (1 + radialWobble);
    const safeVerticalRadius = (verticalLimit - verticalDrift) / (1 + radialWobble);

    if (safeHorizontalRadius < minimumOrbit || safeVerticalRadius < minimumOrbit) {
      return null;
    }

    const horizontalRadius = clamp(width * .38, minimumOrbit, safeHorizontalRadius);
    const verticalRadius = clamp(height * .36, minimumOrbit, safeVerticalRadius);
    const time = now / 1000;
    const centerX = (width / 2) + (horizontalDrift * Math.sin((time * .11) + .9));
    const centerY = (height / 2) + (verticalDrift * Math.cos((time * .09) + 1.6));
    const radiusScale = 1 + (radialWobble * Math.sin((time * .14) + .35));
    const orbitAngle = time * .085;

    return satellites.map((satellite) => {
      const phase = orbitAngle
        + satellite.phase
        + (phaseJitter * Math.sin((time * satellite.frequency) + satellite.seed));
      const x = centerX + (horizontalRadius * radiusScale * Math.cos(phase));
      const y = centerY + (verticalRadius * radiusScale * Math.sin(phase));
      return { satellite, x, y };
    });
  };

  const seedTrails = (now, currentPositions) => {
    trails.forEach((trail) => {
      trail.length = 0;
    });
    for (let sampleTime = now - trailLifetime; sampleTime < now; sampleTime += trailSampleInterval) {
      const historicalPositions = calculateSatellitePositions(sampleTime);
      if (!historicalPositions) {
        clearTrails();
        return;
      }
      historicalPositions.forEach(({ x, y }, index) => {
        trails[index].push({ x, y, time: sampleTime });
      });
    }
    currentPositions.forEach(({ x, y }, index) => {
      trails[index].push({ x, y, time: now });
    });
    lastTrailSample = now;
    trailsReady = true;
  };

  const drawTrails = (now) => {
    if (!trailContext) return;
    trailContext.clearRect(0, 0, state.width, state.height);
    trailContext.save();
    trailContext.globalCompositeOperation = 'lighter';
    trailContext.lineCap = 'round';
    trailContext.lineJoin = 'round';
    trails.forEach((trail, index) => {
      const color = trailColors[index];
      for (let pointIndex = 1; pointIndex < trail.length; pointIndex += 1) {
        const previousPoint = trail[pointIndex - 1];
        const point = trail[pointIndex];
        const age = Math.max(0, now - point.time);
        const progress = Math.max(0, 1 - (age / trailLifetime));
        if (!progress) continue;
        const strength = progress ** 1.8;
        trailContext.beginPath();
        trailContext.moveTo(previousPoint.x, previousPoint.y);
        trailContext.lineTo(point.x, point.y);
        trailContext.strokeStyle = `rgba(${color}, ${.025 + (strength * .38)})`;
        trailContext.lineWidth = .5 + (strength * .85);
        trailContext.shadowColor = `rgba(${color}, ${.08 + (strength * .42)})`;
        trailContext.shadowBlur = strength > .2 ? 3.5 : 0;
        trailContext.stroke();
      }
    });
    trailContext.restore();
  };

  const renderTrails = (positions, now) => {
    if (!trailContext) return;
    if (!positions) {
      clearTrails();
      return;
    }
    if (!trailsReady || (now - lastTrailSample) > trailLifetime) {
      seedTrails(now, positions);
    } else if ((now - lastTrailSample) >= trailSampleInterval) {
      positions.forEach(({ x, y }, index) => {
        trails[index].push({ x, y, time: now });
      });
      lastTrailSample = now;
    }
    trails.forEach((trail) => {
      while (trail.length && (now - trail[0].time) > trailLifetime) {
        trail.shift();
      }
    });
    drawTrails(now);
  };

  const placeSatellites = (now) => {
    const positions = calculateSatellitePositions(now);
    if (!positions) {
      restoreFallbackPositions();
      return null;
    }
    positions.forEach(({ satellite, x, y }) => {
      satellite.element.style.left = '0px';
      satellite.element.style.top = '0px';
      satellite.element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    });
    return positions;
  };

  const stopCosmos = () => {
    if (state.frame) {
      window.cancelAnimationFrame(state.frame);
      state.frame = 0;
    }
    clearTrails();
  };

  const renderCosmos = (now) => {
    state.frame = 0;
    const positions = placeSatellites(now);
    renderTrails(positions, now);
    if (state.inView && document.visibilityState === 'visible') {
      state.frame = window.requestAnimationFrame(renderCosmos);
    }
  };

  const startCosmos = () => {
    if (!state.inView || document.visibilityState !== 'visible' || state.frame) return;
    state.frame = window.requestAnimationFrame(renderCosmos);
  };

  measureCosmos();
  const initialTime = performance.now();
  renderTrails(placeSatellites(initialTime), initialTime);

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(() => {
      measureCosmos();
      const resizeTime = performance.now();
      renderTrails(placeSatellites(resizeTime), resizeTime);
    });
    resizeObserver.observe(cosmos);
  } else {
    window.addEventListener('resize', () => {
      measureCosmos();
      const resizeTime = performance.now();
      renderTrails(placeSatellites(resizeTime), resizeTime);
    }, { passive: true });
  }

  if ('IntersectionObserver' in window) {
    const cosmosObserver = new IntersectionObserver((entries) => {
      state.inView = entries.some((entry) => entry.isIntersecting);
      if (state.inView) startCosmos();
      else stopCosmos();
    }, { threshold: .12 });
    cosmosObserver.observe(cosmos);
  } else {
    state.inView = true;
    startCosmos();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') startCosmos();
    else stopCosmos();
  });
}

const memoryKey = 'ways-through:v3:scroll';
const isHome = body.classList.contains('home-page');

if (isHome && !window.location.hash) {
  const rememberedScroll = Number.parseInt(localStorage.getItem(memoryKey) || '', 10);
  if (Number.isFinite(rememberedScroll) && rememberedScroll > 0) {
    window.setTimeout(() => window.scrollTo(0, rememberedScroll), 0);
  }
  const rememberPosition = () => localStorage.setItem(memoryKey, String(Math.round(window.scrollY)));
  window.addEventListener('pagehide', rememberPosition);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') rememberPosition();
  });
}

const revealTargets = [
  ...document.querySelectorAll('.section-intro, .work-chapter, .method-explorer, .ai-explorer, .project-hero, .project-evidence, .project-film'),
];

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  body.classList.add('is-ready');
  revealTargets.forEach((element) => element.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .13 });
  revealTargets.forEach((element) => observer.observe(element));
}

document.querySelectorAll('#year').forEach((year) => {
  year.textContent = new Date().getFullYear();
});
