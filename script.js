/* ============================================================
   PORTFOLIO JS — Afshan PN
============================================================ */

// ── TYPEWRITER ──────────────────────────────────────────────
const typewriterTexts = [
  "AI Developer Intern",
  "Python Developer",
  "Data Science",
  "Data Analyst"
];
let twIndex = 0, twChar = 0, twDeleting = false;
const twEl = document.getElementById("typewriter-text");

function typewrite() {
  if (!twEl) return;
  const current = typewriterTexts[twIndex];
  if (twDeleting) {
    twEl.textContent = current.substring(0, twChar--);
    if (twChar < 0) {
      twDeleting = false;
      twIndex = (twIndex + 1) % typewriterTexts.length;
      setTimeout(typewrite, 500);
      return;
    }
    setTimeout(typewrite, 45);
  } else {
    twEl.textContent = current.substring(0, twChar++);
    if (twChar > current.length) {
      twDeleting = true;
      setTimeout(typewrite, 2200);
      return;
    }
    setTimeout(typewrite, 75);
  }
}
window.addEventListener("DOMContentLoaded", () => setTimeout(typewrite, 600));


// ── SIDEBAR MENU LOGIC ───────────────────────────────────────
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    sidebar.classList.toggle("active");
  });

  // Close sidebar on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      sidebar.classList.remove("active");
    });
  });
}

// ── SCROLL INDICATOR LOGIC ───────────────────────────────────
const scrollIndicator = document.getElementById("scroll-indicator");

window.addEventListener("scroll", () => {
  if (scrollIndicator) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.height = scrolled + "%";
  }
});

// ── PLEXUS CANVAS (Adapted for Dark Neon Theme) ─────────────
(function () {
  const canvas = document.getElementById("plexus-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, nodes, animFrame;

  const COUNT = 60;
  const MAX_DIST = 150;
  const SPEED = 0.3;
  // Neon green colors
  const COLOR = "0, 255, 102";

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeNode() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r: Math.random() * 1.5 + 1,
      pulse: Math.random() * Math.PI * 2
    };
  }

  function initNodes() { nodes = Array.from({ length: COUNT }, makeNode); }

  function draw(ts) {
    ctx.clearRect(0, 0, W, H);

    // Lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const a = (1 - dist / MAX_DIST) * 0.3; // opacity based on distance
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${COLOR}, ${a})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach(n => {
      const glow = 0.5 + 0.5 * Math.sin(ts * 0.001 + n.pulse);

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, ${0.5 + 0.3 * glow})`;
      ctx.fill();
    });
  }

  function update() {
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0) { n.x = 0; n.vx *= -1; }
      if (n.x > W) { n.x = W; n.vx *= -1; }
      if (n.y < 0) { n.y = 0; n.vy *= -1; }
      if (n.y > H) { n.y = H; n.vy *= -1; }
    });
  }

  function loop(ts) { draw(ts); update(); animFrame = requestAnimationFrame(loop); }

  function start() {
    resize(); initNodes();
    if (animFrame) cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(loop);
  }

  start();
  let resizeTimer;
  window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(start, 150); });
})();
