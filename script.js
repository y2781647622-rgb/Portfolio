const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.querySelector('.menu-label').textContent = isOpen ? 'Close' : 'Menu';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.querySelector('.menu-label').textContent = 'Menu';
    });
  });
}

document.querySelectorAll('#year').forEach((item) => {
  item.textContent = new Date().getFullYear();
});

document.querySelectorAll('[data-scroll-target]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector(button.dataset.scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const approachExplorer = document.querySelector('.approach-explorer');
const lensPanel = document.querySelector('.lens-stage');
const lensButtons = [...document.querySelectorAll('.lens-button')];
const systemSatellites = [...document.querySelectorAll('.system-satellite')];
const lensContent = {
  frame: { index: '01', marker: 'Before making', title: 'Find the question hidden inside the brief.', text: 'I map people, dependencies, and constraints before deciding what is worth changing.', proof: 'Interviews, observation, systems mapping' },
  translate: { index: '02', marker: 'While shaping', title: 'Make evidence usable.', text: 'I make research visible through stories, models, and prototypes that keep the problem intact.', proof: 'Narratives, workshop tools, flows, prototypes' },
  verify: { index: '03', marker: 'Before committing', title: 'Test confidence in use.', text: 'I revise ideas against behaviour, feedback, and the conditions around their use.', proof: 'Usability sessions, comparison, iteration' }
};

function selectTab(buttons, selectedName, attribute, focusButton = false) {
  buttons.forEach((button) => {
    const isSelected = button.dataset[attribute] === selectedName;
    button.classList.toggle('is-active', isSelected);
    button.setAttribute('aria-selected', String(isSelected));
    if (isSelected && focusButton) button.focus();
  });
}

function setLens(name, focusButton = false) {
  if (!approachExplorer || !lensPanel || !lensContent[name]) return;
  const content = lensContent[name];
  approachExplorer.dataset.activeLens = name;
  selectTab(lensButtons, name, 'lens', focusButton);
  systemSatellites.forEach((satellite) => {
    const isSelected = satellite.dataset.lens === name;
    satellite.classList.toggle('is-active', isSelected);
    satellite.setAttribute('aria-pressed', String(isSelected));
  });
  lensPanel.setAttribute('aria-labelledby', `lens-${name}`);
  lensPanel.querySelector('.stage-index').textContent = content.index;
  lensPanel.querySelector('.stage-kind').textContent = content.marker;
  lensPanel.querySelector('.stage-title').textContent = content.title;
  lensPanel.querySelector('.stage-text').textContent = content.text;
  lensPanel.querySelector('.stage-proof').innerHTML = `<span>In practice</span>${content.proof}`;
}

function bindArrowTabs(buttons, attribute, update) {
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => update(button.dataset[attribute]));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
      const next = (index + direction + buttons.length) % buttons.length;
      update(buttons[next].dataset[attribute], true);
    });
  });
}

bindArrowTabs(lensButtons, 'lens', setLens);
bindArrowTabs(systemSatellites, 'lens', setLens);

const systemMap = document.querySelector('.system-map');
const reducedSystemMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const orbitalSystem = {
  width: 0,
  height: 0,
  frame: 0,
  satellites: [
    { lens: 'frame', phase: 3.83, speed: .105, radiusX: .34, radiusY: .18 },
    { lens: 'translate', phase: 5.6, speed: -.082, radiusX: .37, radiusY: .22 },
    { lens: 'verify', phase: 2, speed: .14, radiusX: .27, radiusY: .13 }
  ]
};

function positionSystemSatellites(time = 0) {
  if (!systemMap || !orbitalSystem.width || !orbitalSystem.height) return;
  const centreX = orbitalSystem.width * .5;
  const centreY = orbitalSystem.height * .5;
  const tilt = -.38;
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);

  orbitalSystem.satellites.forEach((orbit) => {
    const satellite = systemSatellites.find((item) => item.dataset.lens === orbit.lens);
    if (!satellite) return;
    const angle = orbit.phase + time * orbit.speed;
    const x = Math.cos(angle) * orbitalSystem.width * orbit.radiusX;
    const y = Math.sin(angle) * orbitalSystem.height * orbit.radiusY;
    const positionX = centreX + x * cosTilt - y * sinTilt;
    const positionY = centreY + x * sinTilt + y * cosTilt;
    satellite.style.transform = `translate3d(${positionX}px, ${positionY}px, 0) translate3d(-50%, -50%, 0)`;
  });
}

function measureSystemMap() {
  if (!systemMap) return;
  const bounds = systemMap.getBoundingClientRect();
  orbitalSystem.width = bounds.width;
  orbitalSystem.height = bounds.height;
  positionSystemSatellites(performance.now() / 1000);
}

function animateSystem(now) {
  positionSystemSatellites(now / 1000);
  orbitalSystem.frame = requestAnimationFrame(animateSystem);
}

function updateSystemMotion() {
  if (!systemMap) return;
  cancelAnimationFrame(orbitalSystem.frame);
  orbitalSystem.frame = 0;
  measureSystemMap();
  if (!reducedSystemMotion.matches && !document.hidden) {
    orbitalSystem.frame = requestAnimationFrame(animateSystem);
  }
}

if (systemMap) {
  if ('ResizeObserver' in window) new ResizeObserver(measureSystemMap).observe(systemMap);
  document.addEventListener('visibilitychange', updateSystemMotion);
  reducedSystemMotion.addEventListener('change', updateSystemMotion);
  updateSystemMotion();
}

const personalExplorer = document.querySelector('.personal-explorer');
const personalDetail = document.querySelector('.personal-detail');
const personalTabs = [...document.querySelectorAll('.personal-tab')];
const personalContent = {
  game: { id: 'P/03', label: 'abyss kitchen', type: 'Independent game / interactive world', title: 'Abyss Kitchen', text: 'A darkly playful management game: hunt for ingredients by day, then run a kitchen for monsters and followers of old gods at night.', format: 'Browser game / visual world-building / game interface', pageHref: 'project-abyss.html', liveHref: 'https://y2781647622-rgb.github.io/Game/', imageSrc: 'assets/abyss-cover.png', imageAlt: 'A warm underground kitchen in a dark fantasy world' },
  crossing: { id: 'P/04', label: 'four crossings', type: 'Interactive historical storytelling', title: 'Four Crossings of the Chishui River', text: 'A bilingual digital narrative that turns a decisive 1935 campaign into an explorable tactical map.', format: 'Interactive narrative / information design / tactical simulation', pageHref: 'project-crossings.html', liveHref: 'https://y2781647622-rgb.github.io/IDV-Final-Project/', imageSrc: 'assets/crossings-cover.png', imageAlt: 'A crimson topographic landscape with routes crossing a winding river' }
};

function setPersonalPiece(name, focusButton = false) {
  if (!personalExplorer || !personalDetail || !personalContent[name]) return;
  const content = personalContent[name];
  personalExplorer.dataset.activePiece = name;
  selectTab(personalTabs, name, 'piece', focusButton);
  personalDetail.setAttribute('aria-labelledby', `personal-${name}`);
  personalDetail.querySelector('.personal-type').textContent = content.type;
  personalDetail.querySelector('.personal-title').textContent = content.title;
  personalDetail.querySelector('.personal-text').textContent = content.text;
  personalDetail.querySelector('.personal-meta b').textContent = content.format;
  personalDetail.querySelector('.personal-link').href = content.pageHref;
  personalDetail.querySelector('.personal-live-link').href = content.liveHref;
  document.querySelector('.canvas-id').textContent = content.id;
  document.querySelector('.canvas-title').textContent = content.label;
  const cover = document.querySelector('.personal-cover-image');
  if (cover) {
    cover.src = content.imageSrc;
    cover.alt = content.imageAlt;
  }
}

bindArrowTabs(personalTabs, 'piece', setPersonalPiece);

const aiWorkflow = document.querySelector('.ai-workflow');
const aiPanel = document.querySelector('.ai-tool-panel');
const aiButtons = [...document.querySelectorAll('.ai-tool')];
const aiContent = {
  gemini: { label: 'Doubao + Gemini / language, planning, video', title: 'Turn research into a direction people can enter.', text: 'I use Doubao and Gemini to explore copy, shape early project plans, and storyboard short video directions from my own research. I select, rewrite, and set the final voice.', imageSrc: 'assets/ai-gemini.png', imageAlt: 'Research fragments connected by a red thread on a dark desk', imageLabel: 'Copy / planning / video' },
  codex: { label: 'Codex + DeepSeek / code and logic', title: 'Turn a chosen direction into a working system.', text: 'I use Codex and DeepSeek to build website interactions, prototypes, and the mathematical logic behind them. I review the behaviour, test edge cases, and refine the result myself.', imageSrc: 'assets/ai-codex.png', imageAlt: 'Modular interface components connected in a luminous blue flow', imageLabel: 'Code / logic' },
  hunyuan: { label: 'Hunyuan / modelling and 3D', title: 'Make early form visible.', text: 'I use Hunyuan to explore physical form, material, and spatial mood through 3D model studies. The output stays a starting point for design judgment, not the final answer.', imageSrc: 'assets/ai-hunyuan.png', imageAlt: 'An abstract architectural model made from clay and wire', imageLabel: 'Modelling / 3D' }
};

function setAiTool(name, focusButton = false) {
  if (!aiWorkflow || !aiPanel || !aiContent[name]) return;
  const content = aiContent[name];
  aiWorkflow.dataset.activeAi = name;
  selectTab(aiButtons, name, 'ai', focusButton);
  aiPanel.setAttribute('aria-labelledby', `ai-${name}`);
  aiPanel.innerHTML = `<p class="eyebrow ai-tool-label">${content.label}</p><div class="ai-tool-copy"><h3>${content.title}</h3><p>${content.text}</p></div><figure class="ai-tool-visual"><img class="ai-tool-image" src="${content.imageSrc}" alt="${content.imageAlt}" /><figcaption>${content.imageLabel}</figcaption></figure>`;
}

bindArrowTabs(aiButtons, 'ai', setAiTool);

const heroVisual = document.querySelector('.hero-visual');
const heroBeacons = [...document.querySelectorAll('.hero-beacon')];
const heroRouteContent = {
  observe: { status: '01 / Observe', title: 'Frame the question.', copy: 'Find human signals before deciding what to change.', jump: 'Open / Approach' },
  map: { status: '02 / Map', title: 'Make complexity legible.', copy: 'Turn research into a shared view of the system.', jump: 'Open / Selected work' },
  test: { status: '03 / Test', title: 'Test the confidence.', copy: 'Prototype and revise before committing to a direction.', jump: 'Open / AI practice' }
};

function setHeroRoute(route) {
  if (!heroVisual || !heroRouteContent[route]) return;
  const content = heroRouteContent[route];
  heroVisual.dataset.activeRoute = route;
  heroBeacons.forEach((beacon) => {
    const isActive = beacon.dataset.route === route;
    beacon.classList.toggle('is-active', isActive);
    if (isActive) {
      beacon.setAttribute('aria-current', 'true');
    } else {
      beacon.removeAttribute('aria-current');
    }
  });
  heroVisual.querySelector('.hero-route-status').textContent = content.status;
  heroVisual.querySelector('.hero-route-title').textContent = content.title;
  heroVisual.querySelector('.hero-route-copy').textContent = content.copy;
  heroVisual.querySelector('.hero-route-jump').textContent = content.jump;
}

heroBeacons.forEach((beacon) => {
  beacon.addEventListener('pointerenter', () => setHeroRoute(beacon.dataset.route));
  beacon.addEventListener('focus', () => setHeroRoute(beacon.dataset.route));
  beacon.addEventListener('click', () => setHeroRoute(beacon.dataset.route));
});

function positionHeroBeacons() {
  if (!heroVisual || !heroBeacons.length) return;
  const image = heroVisual.querySelector('img');
  if (!image || !image.naturalWidth || !image.naturalHeight) return;

  const visualBounds = heroVisual.getBoundingClientRect();
  const imageBounds = image.getBoundingClientRect();
  const layoutWidth = image.offsetWidth;
  const layoutHeight = image.offsetHeight;
  if (!visualBounds.width || !visualBounds.height || !layoutWidth || !layoutHeight) return;

  const scale = Math.max(layoutWidth / image.naturalWidth, layoutHeight / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  const position = getComputedStyle(image).objectPosition.split(/\s+/);
  const horizontalPosition = Number.parseFloat(position[0]) / 100 || .5;
  const verticalPosition = Number.parseFloat(position[1] || position[0]) / 100 || .5;
  const offsetX = (layoutWidth - renderedWidth) * horizontalPosition;
  const offsetY = (layoutHeight - renderedHeight) * verticalPosition;

  heroBeacons.forEach((beacon) => {
    const sourceX = Number.parseFloat(beacon.dataset.sourceX) / 100;
    const sourceY = Number.parseFloat(beacon.dataset.sourceY) / 100;
    if (!Number.isFinite(sourceX) || !Number.isFinite(sourceY)) return;

    const localX = sourceX * renderedWidth + offsetX;
    const localY = sourceY * renderedHeight + offsetY;
    const pointX = imageBounds.left + (localX / layoutWidth) * imageBounds.width;
    const pointY = imageBounds.top + (localY / layoutHeight) * imageBounds.height;
    beacon.style.left = `${((pointX - visualBounds.left) / visualBounds.width) * 100}%`;
    beacon.style.top = `${((pointY - visualBounds.top) / visualBounds.height) * 100}%`;
    beacon.style.right = 'auto';
    beacon.style.bottom = 'auto';
  });
}

const heroImage = heroVisual?.querySelector('img');
if (heroImage?.complete) positionHeroBeacons();
heroImage?.addEventListener('load', positionHeroBeacons, { once: true });
if (heroVisual && 'ResizeObserver' in window) new ResizeObserver(positionHeroBeacons).observe(heroVisual);

const progress = document.querySelector('.progress-meter i');
function updateProgress() {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const motionItems = document.querySelectorAll('.section-heading, .live-project-list, .case-card, .personal-explorer, .ai-workflow, .about-grid, .project-hero, .project-notes, .project-end');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  motionItems.forEach((item) => { item.classList.add('motion-item'); observer.observe(item); });
}
