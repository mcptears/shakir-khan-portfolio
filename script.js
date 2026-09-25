// ---------- Typing effect ----------
const roles = [
  'Full Stack Developer',
  'React & Next.js Expert',
  'Node.js Engineer',
  'UI/UX Enthusiast',
  'Open Source Contributor'
];
const typedEl = document.getElementById('typed');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const word = roles[roleIdx];
  typedEl.textContent = word.slice(0, charIdx);
  let delay = deleting ? 45 : 90;
  if (!deleting && charIdx === word.length) { delay = 1600; deleting = true; }
  else if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 350; }
  charIdx += deleting ? -1 : 1;
  setTimeout(typeLoop, delay);
}
typeLoop();

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.bar span').forEach((s) => s.classList.add('filled'));
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Animated counters ----------
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const dur = 1400, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-num').forEach((el) => counterObserver.observe(el));

// ---------- Nav scroll + mobile menu ----------
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ---------- Particle canvas ----------
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
addEventListener('resize', resize);
const COLORS = ['124,92,255', '0,224,198', '255,92,168'];
for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 2.4 + 0.6,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    c: COLORS[i % 3],
    o: Math.random() * 0.5 + 0.15
  });
}
(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},${p.o})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
})();

// ---------- Contact form (demo) ----------
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Thanks for reaching out! I\'ll get back to you soon. 🚀';
  e.target.reset();
  setTimeout(() => (note.textContent = ''), 5000);
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
