document.addEventListener('DOMContentLoaded', () => {
  setupFaqAccordion();
  setupSmoothAnchors();
  setupBlueprintDottedSurface();
  setupBlueprintOfferWaveShader();

  const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

  if (hasGsap) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    setupHeroAnimation();
    setupScrollRevealGsap();
    setupTransformationShowcase(true);
    setupDecorativeMotion();
    setupEngineInteractions(true);
    setupPyramidJourney(true);
    return;
  }

  setupScrollRevealFallback();
  setupTransformationShowcase(false);
  setupEngineInteractions(false);
  setupPyramidJourney(false);
});

function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((el) => {
        el.classList.remove('active');
        el.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function setupSmoothAnchors() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupHeroAnimation() {
  const gsap = window.gsap;
  const heroItems = gsap.utils.toArray('[data-hero-item]');
  const heroPanel = document.querySelector('[data-hero-panel]');

  if (!heroItems.length) {
    return;
  }

  gsap.set(heroItems, { opacity: 0, y: 22 });

  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  timeline.to(heroItems, {
    opacity: 1,
    y: 0,
    duration: 0.75,
    stagger: 0.1,
  });

  if (heroPanel) {
    timeline.fromTo(heroPanel, {
      opacity: 0,
      y: 20,
      scale: 0.98,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
    }, '-=0.45');
  }
}

function setupScrollRevealGsap() {
  const gsap = window.gsap;

  gsap.utils.toArray('.fade-up').forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.82,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

function setupDecorativeMotion() {
  const gsap = window.gsap;

  gsap.to('.hero__glow--left', {
    xPercent: 14,
    yPercent: 8,
    duration: 10,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  gsap.to('.hero__glow--right', {
    xPercent: -10,
    yPercent: 7,
    duration: 12,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  gsap.to('.hero__glow', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
  });
}

function setupScrollRevealFallback() {
  const elements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px',
  });

  elements.forEach((element) => observer.observe(element));
}

function setupTransformationShowcase(useGsap) {
  const grid = document.querySelector('.transformation__grid');
  if (!grid) {
    return;
  }

  const without = document.querySelector('.transformation__reveal--left');
  const divider = document.querySelector('.transformation__reveal--center');
  const withMethod = document.querySelector('.transformation__reveal--right');
  const revealItems = [without, divider, withMethod].filter(Boolean);

  if (!revealItems.length) {
    return;
  }

  if (useGsap) {
    const gsap = window.gsap;

    gsap.set(without, { opacity: 0, x: -56, y: 16 });
    gsap.set(divider, { opacity: 0, scale: 0.75, y: 10 });
    gsap.set(withMethod, { opacity: 0, x: 56, y: -8, scale: 0.97 });

    gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: grid,
        start: 'top 78%',
        once: true,
      },
    })
      .to(without, { opacity: 1, x: 0, y: 0, duration: 0.72 })
      .to(divider, { opacity: 1, scale: 1, y: 0, duration: 0.46 }, '-=0.35')
      .to(withMethod, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.74 }, '-=0.28');

    return;
  }

  revealItems.forEach((element) => {
    element.style.transition = 'opacity 0.72s ease, transform 0.72s cubic-bezier(0.22,1,0.36,1)';
    element.style.opacity = '0';

    if (element.classList.contains('transformation__reveal--left')) {
      element.style.transform = 'translate3d(-40px, 12px, 0)';
    } else if (element.classList.contains('transformation__reveal--right')) {
      element.style.transform = 'translate3d(40px, -8px, 0)';
    } else {
      element.style.transform = 'translate3d(0, 12px, 0) scale(0.8)';
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      revealItems.forEach((element, index) => {
        window.setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translate3d(0, 0, 0) scale(1)';
        }, 110 * index);
      });

      observer.disconnect();
    });
  }, {
    threshold: 0.22,
    rootMargin: '0px 0px -20px 0px',
  });

  observer.observe(grid);
}

function setupEngineInteractions(useGsap) {
  const steps = Array.from(document.querySelectorAll('.engine-step[data-engine]'));
  const nodes = Array.from(document.querySelectorAll('.wheel-node[data-engine]'));
  const spokes = Array.from(document.querySelectorAll('.wheel-spoke[data-engine]'));
  const section = document.querySelector('.engines-story');
  const wheel = document.querySelector('.engines-wheel__svg');
  const isMobileLayout = window.matchMedia('(max-width: 820px)').matches;

  if (!steps.length || !nodes.length || !spokes.length || !section) {
    return;
  }

  const spokesData = spokes.map((line) => {
    if (typeof line.getTotalLength !== 'function') {
      return { element: line, length: 0 };
    }

    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = useGsap ? `${length}` : '0';
    return { element: line, length };
  });

  let activeEngine = null;
  const totalEngines = steps.length;

  const setActiveEngine = (engine) => {
    if (activeEngine === engine) {
      return;
    }
    activeEngine = engine;

    steps.forEach((step) => step.classList.toggle('is-active', step.dataset.engine === engine));
    nodes.forEach((node) => node.classList.toggle('is-active', node.dataset.engine === engine));
    spokes.forEach((spoke) => spoke.classList.toggle('is-active', spoke.dataset.engine === engine));
  };

  const engineByProgress = (progress) => {
    const index = Math.min(totalEngines - 1, Math.round(progress * (totalEngines - 1)));
    return String(index + 1);
  };

  steps.forEach((step) => {
    step.addEventListener('mouseenter', () => setActiveEngine(step.dataset.engine));
    step.addEventListener('focusin', () => setActiveEngine(step.dataset.engine));
  });

  setActiveEngine(steps[0].dataset.engine);

  if (useGsap) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const pinLength = () => `+=${window.innerHeight * (steps.length + 1.1)}`;

    if (!isMobileLayout) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: pinLength,
        pin: true,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        snap: {
          snapTo: (value) => {
            const points = totalEngines - 1;
            return Math.round(value * points) / points;
          },
          duration: { min: 0.1, max: 0.2 },
          delay: 0,
          ease: 'power1.out',
        },
        onUpdate: (self) => {
          const progress = self.progress;
          setActiveEngine(engineByProgress(progress));

          if (wheel) {
            gsap.set(wheel, { rotate: progress * 320, transformOrigin: '50% 50%' });
          }

          gsap.set('.engines-story__orb--one', {
            xPercent: progress * 12,
            yPercent: progress * -30,
          });

          gsap.set('.engines-story__orb--two', {
            xPercent: progress * -8,
            yPercent: progress * 24,
          });

          const drawProgress = Math.min(1, progress * 1.35);

          spokesData.forEach((item, index) => {
            if (!item.length) {
              return;
            }
            const local = Math.max(0, Math.min(1, drawProgress - (index * 0.12)));
            item.element.style.strokeDashoffset = `${item.length * (1 - local)}`;
          });
        },
        onLeaveBack: () => setActiveEngine(steps[0].dataset.engine),
      });

      return;
    }

    gsap.to(spokes, {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    return;
  }

  const updateByScroll = () => {
    if (isMobileLayout) {
      setActiveEngine(steps[0].dataset.engine);
      return;
    }

    const start = section.offsetTop;
    const end = start + section.offsetHeight - window.innerHeight;
    const progress = end > start ? (window.scrollY - start) / (end - start) : 0;
    const clamped = Math.max(0, Math.min(1, progress));
    setActiveEngine(engineByProgress(clamped));
  };

  window.addEventListener('scroll', updateByScroll, { passive: true });
  window.addEventListener('resize', updateByScroll);
  updateByScroll();
}

function setupBlueprintDottedSurface() {
  const section = document.querySelector('section.blueprint');
  const surface = section ? section.querySelector('.blueprint__surface') : null;
  const THREE = window.THREE;

  if (!section || !surface || !THREE) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf3efeb, 700, 3200);

  const camera = new THREE.PerspectiveCamera(58, 1, 1, 5000);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  surface.innerHTML = '';
  surface.appendChild(renderer.domElement);

  let points = null;
  let geometry = null;
  let material = null;
  let rafId = 0;
  let resizeTimeout = 0;
  let amountX = 0;
  let amountY = 0;
  let count = 0;
  let isVisible = true;

  const baseBlue = new THREE.Color('#2e4157');
  const accentGold = new THREE.Color('#b98b61');
  const softBlue = new THREE.Color('#6f7f92');
  const blendBlueGold = baseBlue.clone().lerp(accentGold, 0.22);

  const disposePoints = () => {
    if (!points) {
      return;
    }

    scene.remove(points);

    if (geometry) {
      geometry.dispose();
      geometry = null;
    }

    if (material) {
      material.dispose();
      material = null;
    }

    points = null;
  };

  const buildSurface = () => {
    const rect = surface.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const isMobile = window.matchMedia('(max-width: 820px)').matches;

    amountX = clamp(Math.round(width / (isMobile ? 34 : 30)), 18, 56);
    amountY = clamp(Math.round((height * 1.35) / (isMobile ? 34 : 30)) + 10, 24, 86);

    const separationX = width / Math.max(1, amountX - 1);
    const separationY = height / Math.max(1, amountY - 1);
    const gridWidth = separationX * (amountX - 1);
    const gridDepth = separationY * (amountY - 1);
    const total = amountX * amountY;

    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);

    let i = 0;
    for (let ix = 0; ix < amountX; ix += 1) {
      for (let iy = 0; iy < amountY; iy += 1) {
        const index = i * 3;
        positions[index] = ix * separationX - gridWidth / 2;
        positions[index + 1] = 0;
        positions[index + 2] = iy * separationY - gridDepth / 2;

        const seed = (ix * 31 + iy * 17) % 19;
        const color = seed === 0 ? accentGold : seed < 5 ? blendBlueGold : softBlue;
        colors[index] = color.r;
        colors[index + 1] = color.g;
        colors[index + 2] = color.b;

        i += 1;
      }
    }

    disposePoints();

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({
      size: isMobile ? 4 : 4.8,
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.5 : 0.58,
      sizeAttenuation: true,
      depthWrite: false,
    });

    points = new THREE.Points(geometry, material);
    points.position.y = isMobile ? -20 : -30;
    points.position.z = -40;
    points.rotation.x = -0.44;
    scene.add(points);

    camera.aspect = width / height;
    camera.position.set(0, isMobile ? 300 : 340, isMobile ? 760 : 920);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const animate = () => {
    rafId = window.requestAnimationFrame(animate);

    if (!isVisible || !points || !geometry) {
      return;
    }

    const positions = geometry.attributes.position.array;
    const isMobile = window.matchMedia('(max-width: 820px)').matches;
    const waveA = isMobile ? 22 : 30;
    const waveB = isMobile ? 18 : 24;
    let i = 0;

    for (let ix = 0; ix < amountX; ix += 1) {
      for (let iy = 0; iy < amountY; iy += 1) {
        const index = i * 3;
        positions[index + 1] =
          Math.sin((ix + count) * 0.32) * waveA +
          Math.cos((iy + count * 1.08) * 0.48) * waveB;
        i += 1;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    points.rotation.z = Math.sin(count * 0.22) * 0.024;
    renderer.render(scene, camera);
    count += 0.08;
  };

  const start = () => {
    if (reduceMotion || rafId) {
      return;
    }
    rafId = window.requestAnimationFrame(animate);
  };

  const stop = () => {
    if (!rafId) {
      return;
    }
    window.cancelAnimationFrame(rafId);
    rafId = 0;
  };

  const onResize = () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      buildSurface();
      renderer.render(scene, camera);
    }, 140);
  };

  let observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isVisible = Boolean(entry && entry.isIntersecting);

      if (isVisible) {
        if (reduceMotion) {
          renderer.render(scene, camera);
        } else {
          start();
        }
      } else {
        stop();
      }
    }, { threshold: 0.08 });

    observer.observe(section);
  }

  const cleanup = () => {
    stop();
    window.clearTimeout(resizeTimeout);
    window.removeEventListener('resize', onResize);

    if (observer) {
      observer.disconnect();
    }

    disposePoints();
    renderer.dispose();

    if (surface.contains(renderer.domElement)) {
      surface.removeChild(renderer.domElement);
    }
  };

  buildSurface();
  window.addEventListener('resize', onResize);
  window.addEventListener('pagehide', cleanup, { once: true });

  if (reduceMotion) {
    renderer.render(scene, camera);
  } else {
    start();
  }
}

function setupBlueprintOfferWaveShader() {
  const container = document.querySelector('.blueprint-offer-wave');
  const THREE = window.THREE;

  if (!container || !THREE) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const clock = new THREE.Clock();

  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision mediump float;

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_waveCount;
    uniform float u_amplitude;
    uniform float u_frequency;
    uniform float u_brightness;
    uniform float u_colorSeparation;

    float pattern(vec2 uv, float offset) {
      float intensity = 0.0;

      for (int i = 0; i < 20; i++) {
        if (float(i) >= u_waveCount) break;
        float fi = float(i);

        float x = uv.x +
          sin(
            u_time * (0.9 + fi * 0.24) +
            uv.y * (u_frequency + fi * 0.07) +
            offset
          ) * u_amplitude;

        intensity += u_brightness / (abs(x) + 0.0038);
      }

      return intensity;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

      // Compress vertical range to keep the wave as a horizontal luminous band
      uv.y *= 2.5;

      float bandMask = exp(-pow(uv.y * 6.8, 2.0));

      float p1 = pattern(uv, 0.0);
      float p2 = pattern(uv + vec2(0.0, u_colorSeparation), 1.4);
      float p3 = pattern(uv - vec2(0.0, u_colorSeparation), -1.2);

      vec3 warmTint = vec3(1.0, 0.98, 0.84);
      vec3 pinkTint = vec3(1.0, 0.89, 0.95);
      vec3 blueTint = vec3(0.88, 0.92, 1.0);

      vec3 coloredGlow = p1 * warmTint + p2 * pinkTint + p3 * blueTint;
      float core = (p1 + p2 + p3) * 0.4;
      vec3 whiteCore = vec3(core * 1.42);

      vec3 color = (coloredGlow * 0.62 + whiteCore) * bandMask;
      color = min(color, vec3(1.0));

      float alpha = clamp((p1 + p2 + p3) * bandMask * 0.86, 0.0, 0.96);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const uniforms = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_waveCount: { value: 5.0 },
    u_amplitude: { value: 0.095 },
    u_frequency: { value: 2.6 },
    u_brightness: { value: 0.0037 },
    u_colorSeparation: { value: 0.085 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const resize = () => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    renderer.setSize(width, height, false);
    uniforms.u_resolution.value.set(width, height);
  };

  let isVisible = true;
  let observer = null;

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isVisible = Boolean(entry && entry.isIntersecting);
    }, { threshold: 0.01 });

    observer.observe(container);
  }

  const animate = () => {
    if (!isVisible) {
      return;
    }

    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  };

  window.addEventListener('resize', resize);
  resize();

  if (reduceMotion) {
    uniforms.u_time.value = 1.4;
    renderer.render(scene, camera);
  } else {
    renderer.setAnimationLoop(animate);
  }

  const cleanup = () => {
    window.removeEventListener('resize', resize);
    renderer.setAnimationLoop(null);

    if (observer) {
      observer.disconnect();
    }

    geometry.dispose();
    material.dispose();
    renderer.dispose();

    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };

  window.addEventListener('pagehide', cleanup, { once: true });
}

function setupPyramidJourney(useGsap) {
  const section = document.querySelector('.pyramid-journey__story');
  const layers = Array.from(document.querySelectorAll('.pyramid-layer[data-level]'));
  const cards  = Array.from(document.querySelectorAll('.pyramid-card[data-level]'));
  const cardsWrap = document.querySelector('.pyramid-cards');
  const layerNums  = Array.from(document.querySelectorAll('.pyramid-layer-num[data-level]'));
  const layerNames = Array.from(document.querySelectorAll('.pyramid-layer-name[data-level]'));
  const visualGroup = document.querySelector('.pyramid-visual-group');
  const isMobileLayout = window.matchMedia('(max-width: 820px)').matches;

  if (!section || !layers.length || !cards.length) {
    return;
  }

  let activeLevel = null;
  const totalLevels = cards.length; // 7

  /* ── apply active / past states ── */
  const setActiveLevel = (level) => {
    if (activeLevel === level) return;
    activeLevel = level;

    const active = Number(level);

    layers.forEach((el) => {
      const n = Number(el.dataset.level);
      el.classList.toggle('is-active', n === active);
      el.classList.toggle('is-past',   n > active); /* já percorridos = acima */
    });

    cards.forEach((el) => {
      const n = Number(el.dataset.level);
      el.classList.toggle('is-active', n === active);
      el.classList.toggle('is-past',   n < active); /* já visitados = abaixo */
    });

    /* sync SVG text labels */
    [...layerNums, ...layerNames].forEach((el) => {
      const n = Number(el.dataset.level);
      el.classList.toggle('is-active', n === active);
      el.classList.toggle('is-past',   n < active);
    });
  };

  /* progress 0→1 mapeia nível 1 (base) → 7 (topo) */
  const levelByProgress = (progress) => {
    const index = Math.min(totalLevels - 1, Math.floor(progress * totalLevels));
    return String(index + 1); /* 1→7 conforme scroll avança */
  };

  const updateMobileCardHeight = () => {
    if (!cardsWrap || !isMobileLayout) {
      return;
    }

    let maxHeight = 0;
    cards.forEach((card) => {
      const height = card.scrollHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    if (maxHeight > 0) {
      cardsWrap.style.height = `${Math.ceil(maxHeight + 8)}px`;
      if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
        window.ScrollTrigger.refresh();
      }
    }
  };

  setActiveLevel('1'); /* começa na base: nível 1 */
  updateMobileCardHeight();
  window.addEventListener('resize', updateMobileCardHeight);

  if (useGsap) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    /* estado inicial: zoom na base (nível 1) antes de qualquer scroll */
    if (visualGroup) {
      gsap.set(visualGroup, { y: 40, scale: 1.12, transformOrigin: '50% 88%' });
    }

    if (!isMobileLayout) {
      const pinLength = () => `+=${window.innerHeight * (totalLevels * 0.58 + 0.9)}`;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        /* shorter pin length so each stage changes with less scroll */
        end: pinLength,
        pin: true,
        pinSpacing: true,
        scrub: 0.36,          /* smoother while remaining responsive */
        anticipatePin: 2,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const eased = progress * progress * (3 - 2 * progress); // smoothstep

          /*
           * Centros Y de cada etapa no viewBox (nível 1→7, base→topo):
           *  1: 475  2: 407  3: 338  4: 270  5: 201  6: 133  7: 66
           * Conforme o scroll avança (0→1), o foco sobe da base ao ápice.
           */
          const stageCenters = [475, 407, 338, 270, 201, 133, 66]; /* índice 0=nível1, 6=nível7 */
          const track = eased * (stageCenters.length - 1);
          const from  = Math.floor(track);
          const to    = Math.min(stageCenters.length - 1, from + 1);
          const mix   = track - from;
          const focusY = stageCenters[from] + (stageCenters[to] - stageCenters[from]) * mix;
          const focusPercent = (focusY / 540) * 100;

          setActiveLevel(levelByProgress(progress));

          if (visualGroup) {
            gsap.set(visualGroup, {
              /*
               * Começa deslocado para baixo (y=+40) mostrando a base,
               * termina deslocado para cima (y=-40) mostrando o ápice.
               * transformOrigin segue o centro da etapa ativa.
               */
              y: 40 - eased * 80,
              scale: 1 + eased * 0.12,  /* zoom cresce gradualmente ao subir */
              transformOrigin: `50% ${focusPercent}%`,
            });
          }

          gsap.set('.pyramid-journey__orb--one', {
            xPercent: progress * -10,
            yPercent: progress * -22,
          });
          gsap.set('.pyramid-journey__orb--two', {
            xPercent: progress * 7,
            yPercent: progress * 18,
          });
        },
        onLeaveBack: () => {
          setActiveLevel('1'); /* volta ao nível 1 (base) */
          if (visualGroup) {
            gsap.set(visualGroup, { y: 40, scale: 1, transformOrigin: '50% 88%' });
          }
        },
      });
      return;
    }

    /* mobile: keep pyramid pinned while cards switch below it */
    const mobilePinLength = () => `+=${window.innerHeight * (totalLevels * 0.62 + 0.6)}`;
    const stageCenters = [475, 407, 338, 270, 201, 133, 66];

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: mobilePinLength,
      pin: true,
      pinSpacing: true,
      scrub: 0.46,
      anticipatePin: 2,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const eased = progress * progress * (3 - 2 * progress);
        setActiveLevel(levelByProgress(progress));

        if (visualGroup) {
          const track = eased * (stageCenters.length - 1);
          const from = Math.floor(track);
          const to = Math.min(stageCenters.length - 1, from + 1);
          const mix = track - from;
          const focusY = stageCenters[from] + (stageCenters[to] - stageCenters[from]) * mix;
          const focusPercent = (focusY / 540) * 100;

          gsap.set(visualGroup, {
            y: 28 - eased * 56,
            scale: 1 + eased * 0.1,
            transformOrigin: `50% ${focusPercent}%`,
          });
        }

        gsap.set('.pyramid-journey__orb--one', {
          xPercent: progress * -7,
          yPercent: progress * -14,
        });
        gsap.set('.pyramid-journey__orb--two', {
          xPercent: progress * 5,
          yPercent: progress * 10,
        });
      },
      onLeaveBack: () => {
        setActiveLevel('1');
        if (visualGroup) {
          gsap.set(visualGroup, { y: 28, scale: 1, transformOrigin: '50% 88%' });
        }
      },
    });

    return;
  }

  /* fallback sem GSAP */
  const updateByScroll = () => {
    if (isMobileLayout) {
      const start = section.offsetTop - (window.innerHeight * 0.22);
      const range = window.innerHeight * 1.9;
      const progress = (window.scrollY - start) / range;
      setActiveLevel(levelByProgress(Math.max(0, Math.min(1, progress))));
      return;
    }

    const start = section.offsetTop;
    const end   = start + section.offsetHeight - window.innerHeight;
    const progress = end > start ? (window.scrollY - start) / (end - start) : 0;
    setActiveLevel(levelByProgress(Math.max(0, Math.min(1, progress))));
  };

  window.addEventListener('scroll', updateByScroll, { passive: true });
  window.addEventListener('resize', updateByScroll);
  updateByScroll();
}
