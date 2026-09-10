(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  const extra = document.createElement('style');
  extra.textContent = `.mask-line{overflow:hidden;display:block}.mask-line>span{display:block;transform:translateY(110%);opacity:0}.mask-line.revealed>span{transform:none;opacity:1;transition:transform 1s cubic-bezier(.16,1,.3,1),opacity .7s ease}.hero-stage{position:absolute;z-index:3;right:7vw;top:18%;width:min(32vw,430px);height:min(32vw,430px);pointer-events:none;perspective:900px;opacity:.8}.stage-orb,.stage-ring,.stage-plane{position:absolute;inset:0;border-radius:50%;transform-style:preserve-3d}.stage-orb{inset:22%;background:radial-gradient(circle at 32% 25%,#e7ffb0 0 3%,#b7ff3c 12%,#3c6920 45%,transparent 70%);box-shadow:0 0 65px rgba(183,255,60,.4);animation:stage-float 7s ease-in-out infinite}.stage-ring{border:1px solid rgba(183,255,60,.55);animation:stage-spin 18s linear infinite;transform:rotateX(66deg) rotateY(20deg)}.stage-ring:nth-child(2){inset:8%;border-color:rgba(244,247,239,.23);animation-duration:25s;animation-direction:reverse;transform:rotateY(66deg) rotateX(18deg)}.stage-ring:nth-child(3){inset:31%;border-color:rgba(183,255,60,.24);animation-duration:12s;transform:rotateX(52deg) rotateZ(30deg)}.stage-plane{inset:13%;border:1px solid rgba(183,255,60,.12);border-radius:18px;transform:rotateX(60deg) rotateZ(-15deg);background:linear-gradient(135deg,rgba(183,255,60,.08),transparent 50%);animation:plane-drift 9s ease-in-out infinite}.stage-screen{position:absolute;inset:21% 16% 30%;border:1px solid rgba(183,255,60,.62);border-radius:18px;background:linear-gradient(145deg,rgba(30,49,35,.94),rgba(7,14,9,.88));box-shadow:inset 0 0 35px rgba(183,255,60,.12),0 0 38px rgba(183,255,60,.16);transform:rotateX(9deg) rotateY(-12deg) translateZ(30px);overflow:hidden;animation:screen-breathe 6s ease-in-out infinite}.stage-screen:before,.stage-screen:after{content:"";position:absolute;background:rgba(183,255,60,.15)}.stage-screen:before{inset:18% 10% 24%;border:1px solid rgba(244,247,239,.2);background:linear-gradient(135deg,rgba(183,255,60,.28),transparent 42%),linear-gradient(45deg,transparent 49%,rgba(183,255,60,.25) 50%,transparent 51%)}.stage-screen:after{left:10%;right:10%;bottom:13%;height:1px;background:linear-gradient(90deg,var(--lime) 0 34%,rgba(244,247,239,.18) 34% 100%)}.stage-play{position:absolute;left:50%;top:48%;z-index:2;display:grid;place-items:center;width:42px;height:42px;border:1px solid var(--lime);border-radius:50%;color:var(--lime);font-size:14px;transform:translate(-50%,-50%);animation:play-pulse 2.4s ease-in-out infinite}.stage-timecode{position:absolute;right:11%;bottom:6%;z-index:2;color:rgba(244,247,239,.7);font:600 9px/1 Manrope,sans-serif;letter-spacing:.16em}.stage-timeline{position:absolute;left:11%;right:8%;bottom:17%;height:8%;display:flex;gap:5px;align-items:center;transform:rotateX(54deg) rotateZ(-9deg) translateZ(5px);opacity:.9}.stage-timeline i{display:block;height:100%;flex:1;border-radius:3px;background:linear-gradient(90deg,rgba(183,255,60,.8),rgba(183,255,60,.12));animation:timeline-pulse 3.2s ease-in-out infinite}.stage-timeline i:nth-child(2){animation-delay:.4s}.stage-timeline i:nth-child(3){animation-delay:.8s}.stage-timeline i:nth-child(4){animation-delay:1.2s}.stage-timeline i:nth-child(5){animation-delay:1.6s}.stage-keyframes{position:absolute;left:16%;right:14%;bottom:8%;height:8px;display:flex;justify-content:space-between;align-items:center}.stage-keyframes i{width:8px;height:8px;background:var(--lime);transform:rotate(45deg);box-shadow:0 0 10px rgba(183,255,60,.55);animation:keyframe-blink 2.6s ease-in-out infinite}.stage-keyframes i:nth-child(2){animation-delay:.45s}.stage-keyframes i:nth-child(3){animation-delay:.9s}.stage-keyframes i:nth-child(4){animation-delay:1.35s}.depth-card{transform-style:preserve-3d;will-change:transform}.parallax-layer{will-change:transform}.page-wipe{position:fixed;inset:0;z-index:190;background:var(--lime);transform:scaleY(0);transform-origin:bottom;pointer-events:none}`;
  document.head.appendChild(extra);

  const hero = $('.hero');
  if (hero && !reduced) {
    const stage = document.createElement('div');
    stage.className = 'hero-stage';
    stage.innerHTML = '<div class="stage-orb"></div><div class="stage-ring"></div><div class="stage-ring"></div><div class="stage-ring"></div><div class="stage-plane"></div><div class="stage-screen"><span class="stage-play">▶</span><span class="stage-timecode">00:00:24:18</span></div><div class="stage-timeline"><i></i><i></i><i></i><i></i><i></i></div><div class="stage-keyframes"><i></i><i></i><i></i><i></i></div>';
    hero.appendChild(stage);
  }

  if (window.Lenis && !reduced) {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false, wheelMultiplier: .9 });
    lenis.on('scroll', () => {});
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.__faizanLenis = lenis;
  }

  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    if (hero) {
      gsap.to('.hero-inner', { y: -86, opacity: .5, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-stage', { y: 110, scale: .82, opacity: .25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.scroll-cue', { y: 24, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '35% top', scrub: true } });
    }
    const splitTargets = $$('.section-head h2, .resume-card h2, .big-question-inner h2').filter(el => !el.closest('.modern-contact'));
    splitTargets.forEach(el => {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = '1';
      if (el.querySelector('em')) {
        gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .95, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play reverse play reverse' } });
        return;
      }
      const original = el.innerHTML;
      const words = original.split(/(\s+)/);
      el.innerHTML = words.map((word) => /\s+/.test(word) ? word : `<span class="mask-line"><span>${word}</span></span>`).join('');
      gsap.to(el.querySelectorAll('.mask-line>span'), { y: 0, opacity: 1, stagger: .045, duration: 1.05, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play reverse play reverse' } });
    });
    $$('.project-media, .design-media, .uiux-preview').forEach((media, i) => {
      gsap.fromTo(media, { clipPath: 'inset(14% 9% 14% 9%)', scale: .92 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.15, ease: 'power4.out', scrollTrigger: { trigger: media, start: 'top 92%', toggleActions: 'play reverse play reverse' }, delay: (i % 3) * .05 });
    });
    $$('.project, .design-card, .tool-card, .timeline-item, .contact-link').forEach((el, i) => {
      gsap.fromTo(el, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: .9, delay: (i % 4) * .06, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play reverse play reverse' } });
    });
    $$('.tool-card').forEach((el, i) => gsap.fromTo(el, { rotateX: 18, y: 70, opacity: 0 }, { rotateX: 0, y: 0, opacity: 1, duration: 1.1, delay: (i % 4) * .1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play reverse play reverse' } }));
    $$('.project-media, .design-media, .uiux-preview').forEach(el => {
      const image = $('img, iframe', el);
      if (!image) return;
      gsap.to(image, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  const makeMagnetic = (el) => {
    if (!fine || reduced) return;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * .16}px`);
      el.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * .18}px`);
      el.style.transform = 'translate3d(var(--mx),var(--my),0)';
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; el.style.setProperty('--mx','0px'); el.style.setProperty('--my','0px'); });
  };
  $$('.button, .hire-button, .project-meta>a, .text-link, .back-to-top').forEach(makeMagnetic);

  $$('.project, .design-card, .tool-card, .uiux-card').forEach(card => {
    card.classList.add('depth-card');
    if (!fine || reduced) return;
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 8;
      const y = ((e.clientY - r.top) / r.height - .5) * -8;
      card.style.transform = `perspective(1100px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  if (fine && !reduced) {
    const dot = Object.assign(document.createElement('div'), { className: 'cursor-dot' });
    const ring = Object.assign(document.createElement('div'), { className: 'cursor-ring' });
    const label = Object.assign(document.createElement('div'), { className: 'cursor-label' });
    const glow = $('.cursor-glow');
    document.body.append(dot, ring, label);
    let tx = innerWidth / 2, ty = innerHeight / 2, rx = tx, ry = ty;
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; glow?.style.setProperty('--cursor-x', `${tx}px`); glow?.style.setProperty('--cursor-y', `${ty}px`); document.body.classList.add('cursor-active'); });
    const cursorLoop = () => { rx += (tx-rx)*.18; ry += (ty-ry)*.18; dot.style.left=`${tx}px`;dot.style.top=`${ty}px`;ring.style.left=`${rx}px`;ring.style.top=`${ry}px`;label.style.left=`${rx}px`;label.style.top=`${ry}px`;requestAnimationFrame(cursorLoop); }; cursorLoop();
    $$('a,button,.project-media,.design-media,.uiux-preview').forEach(el => { el.addEventListener('pointerenter', () => { document.body.classList.add('cursor-hover'); label.textContent = el.matches('.project-media,.design-media,.uiux-preview') ? (el.closest('.project') ? 'View project' : 'Explore') : 'Open'; }); el.addEventListener('pointerleave', () => document.body.classList.remove('cursor-hover')); });
  }

  const reel = $('#showreel video');
  if (reel) {
    reel.muted = true; reel.setAttribute('playsinline','');
    const io = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting ? reel.play().catch(()=>{}) : reel.pause()), { threshold: .45 });
    io.observe(reel);
  }

  const wipe = document.createElement('div'); wipe.className = 'page-wipe'; document.body.appendChild(wipe);
  $$('a[href^="#"]').forEach(link => link.addEventListener('click', () => { if (reduced || !window.gsap) return; window.gsap.fromTo(wipe, { scaleY: 0 }, { scaleY: 1, duration: .28, transformOrigin: 'bottom', yoyo: true, repeat: 1, ease: 'power2.inOut' }); }));

  addEventListener('pointermove', e => { if (!fine || reduced) return; const stage = $('.hero-stage'); if (stage) { const x=(e.clientX/innerWidth-.5)*18, y=(e.clientY/innerHeight-.5)*-18; stage.style.transform=`translate3d(${x}px,${y}px,0) rotateX(${y*.18}deg) rotateY(${x*.18}deg)`; } });
})();
