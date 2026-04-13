/* ============================================================
   PORTFOLIO JS — Afshan PN
   Google Sheets Integration via Google Apps Script Web App
   → Paste your Apps Script Web App URL below after deploying
============================================================ */

// ── GOOGLE SHEETS CONFIG ─────────────────────────────────────
// After deploying your Apps Script as a Web App, paste the URL here:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzykQZ-1Bmo4zjTrXTIZD8UUvXQ8d2cOKwNqAlu75IdkxkPgALzED-JUc06IQAH7fRk/exec"; // ← replace after setup

// ── TYPEWRITER ──────────────────────────────────────────────
const typewriterTexts = [
  "AI Developer",
  "Data Science Enthusiast",
  "Machine Learning Engineer",
  "Python Developer",
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

// ── PLEXUS CANVAS (Full Hero Fill) ──────────────────────────
(function () {
  const canvas = document.getElementById("plexus-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, nodes, animFrame;

  const COUNT = 80;
  const MAX_DIST = 155;
  const SPEED = 0.35;

  function resize() {
    const hero = canvas.parentElement;
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  function makeNode() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r: Math.random() * 2 + 1.2,
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
          const a = (1 - dist / MAX_DIST) * 0.42;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139,90,43,${a})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach(n => {
      const glow = 0.5 + 0.5 * Math.sin(ts * 0.001 + n.pulse);

      // Soft glow ring
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
      grad.addColorStop(0, `rgba(139,90,43,${0.2 * glow})`);
      grad.addColorStop(1, `rgba(139,90,43,0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,90,43,${0.65 + 0.25 * glow})`;
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

// ── NAVBAR SCROLL & ACTIVE LINK ──────────────────────────────
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove("active"));
      const a = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (a) a.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateNavbar, { passive: true });

// ── HAMBURGER ────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open");
});
document.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", () => {
  hamburger.classList.remove("open");
  mobileNav.classList.remove("open");
}));

// ── BACK TO TOP ──────────────────────────────────────────────
const btt = document.getElementById("back-to-top");
window.addEventListener("scroll", () => btt.classList.toggle("visible", window.scrollY > 400), { passive: true });
btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ── SCROLL ANIMATIONS (custom AOS) ──────────────────────────
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("aos-animate"); });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
document.querySelectorAll("[data-aos]").forEach(el => aosObserver.observe(el));

// ── SKILL BARS ───────────────────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.width + "%";
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll(".skill-category").forEach(c => skillObserver.observe(c));

// ── 3D CARD TILT ─────────────────────────────────────────────
document.querySelectorAll(".project-card, .service-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5);
    const dy = ((e.clientY - r.top) / r.height - 0.5);
    card.style.transform = `translateY(-5px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

// ── CONTACT FORM (Google Sheets via Apps Script) ─────────────
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("contact-submit-btn");
const formStatus = document.getElementById("form-status");

function setStatus(type, msg) {
  formStatus.className = "form-status " + type;
  formStatus.textContent = msg;
}

function sendWithMailto(data) {
  const body = `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`;
  window.location.href =
    `mailto:afshanpn2005@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
}

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  const data = {
    name: document.getElementById("contact-name").value.trim(),
    email: document.getElementById("contact-email").value.trim(),
    subject: document.getElementById("contact-subject").value.trim(),
    message: document.getElementById("contact-message").value.trim(),
  };

  btnText.style.display = "none";
  btnLoading.style.display = "flex";
  submitBtn.disabled = true;
  formStatus.className = "form-status";

  let sent = false;

  // ── Send to Google Sheets ──────────────────────────────────
  if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_URL") {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",   // Apps Script Web Apps require no-cors
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // no-cors means we can't read response status, but if no Error thrown = success
      sent = true;
    } catch (err) {
      console.warn("Google Sheets submission failed, falling back to mailto:", err);
    }
  }

  if (sent) {
    setStatus("success", "✅ Message sent! I'll get back to you within 24 hours.");
    contactForm.reset();
  } else {
    // Fallback: open mailto
    sendWithMailto(data);
    setStatus("info", "📬 Opening your email client to send the message...");
    contactForm.reset();
  }

  btnText.style.display = "flex";
  btnLoading.style.display = "none";
  submitBtn.disabled = false;

  setTimeout(() => { formStatus.className = "form-status"; }, 7000);
});

console.log("%c Afshan PN Portfolio", "font-size:16px; font-weight:bold; color:#8DA750;");
console.log("%cAI Developer & Data Science Enthusiast | Kerala, India", "font-size:12px; color:#537B2F;");
