// ---------------------------
// Page Fade-In on Load
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 1;
  try {
    setupNavToggle();
    setupActiveLinkObserver();
    setupScrollReveal();
    setupHeroVideoLoop();
    setupHomeLinks();
  } catch (err) {
    console.warn("Non-fatal JS error:", err);
  }
});

// ---------------------------
// Enter Site Function
// ---------------------------
function enterSite() {
  const content = document.querySelector(".content") || document.body;
  content.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "home.html";
  }, 1200);
}

// ---------------------------
// Smooth Scroll Function
// ---------------------------
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const y = target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}

// ---------------------------
// Hero Button Scroll
// ---------------------------
document.querySelectorAll('button[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-scroll-to');
    scrollToSection(id);
  });
});

// ===========================
// NAV TOGGLE + LINK SCROLL FIX
// ===========================
function setupNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggle || !navLinks) return;

  // Create overlay
  let overlay = document.querySelector(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
  }

  let lastFocused = null;

  function openNav() {
    lastFocused = document.activeElement;
    navLinks.classList.add("open");
    overlay.classList.add("visible");
    toggle.setAttribute("aria-expanded", "true");
    toggle.innerText = "✕";
    toggle.classList.add("open");
    document.body.classList.add("nav-open");

    document.addEventListener("keydown", onKeyDown);
  }

  function closeNav() {
    navLinks.classList.remove("open");
    overlay.classList.remove("visible");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerText = "☰";
    toggle.classList.remove("open");
    document.body.classList.remove("nav-open");

    document.removeEventListener("keydown", onKeyDown);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") closeNav();
  }

  toggle.addEventListener("click", () => {
    navLinks.classList.contains("open") ? closeNav() : openNav();
  });

  overlay.addEventListener("click", closeNav);

  // ---------------------------
  // Mobile + Desktop Scroll FIX
  // ---------------------------
  navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      // Close mobile menu if open
      closeNav();

      // Smooth scroll
      if (targetId) scrollToSection(targetId);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

// ---------------------------
// ScrollSpy: Active Nav Links
// ---------------------------
function setupActiveLinkObserver() {
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = document.querySelectorAll("section[id], div[id]");
  if (!sections.length || !navLinks.length) return;

  const navHeight =
    document.querySelector(".navbar")?.getBoundingClientRect().height || 0;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => a.classList.remove("active"));
          const link = document.querySelector(
            `.nav-links a[href="#${id}"]`
          );
          if (link) link.classList.add("active");
        }
      });
    },
    {
      root: null,
      rootMargin: `-${navHeight}px 0px -40% 0px`,
      threshold: 0.1
    }
  );

  sections.forEach(s => observer.observe(s));
}

// ---------------------------
// Scroll Reveal
// ---------------------------
function setupScrollReveal() {
  const selectors = [
    "section",
    ".card",
    ".project",
    ".home-content h1",
    ".home-content p",
    ".btn"
  ];

  const els = Array.from(document.querySelectorAll(selectors.join(",")));
  if (!els.length) return;

  els.forEach(el => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );

  els.forEach(el => revealObserver.observe(el));
}

// ---------------------------
// Home Logo + Home Link FIX
// ---------------------------
function setupHomeLinks() {
  const homeLink = document.getElementById("home-link");
  const logo = document.querySelector(".logo");

  function scrollHome(e) {
    e.preventDefault();
    scrollToSection("home");
  }

  if (homeLink) homeLink.addEventListener("click", scrollHome);
  if (logo) logo.addEventListener("click", scrollHome);
}



// ---------------------------
const navLinks = document.querySelectorAll('.nav-links a');
const scrollButtons = document.querySelectorAll('button[data-scroll-to]');

function smoothScroll(targetId) {
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Handle nav links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const targetId = href.startsWith('#') ? href.substring(1) : href;
    smoothScroll(targetId);

    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Handle buttons
scrollButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-scroll-to');
    smoothScroll(targetId);
  });
});


const homeLink = document.getElementById('home-link');

homeLink.addEventListener('click', function(e) {
  e.preventDefault();
  location.reload();
});


document.addEventListener('DOMContentLoaded', () => {
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.style.top = '0';
      return;
    }

    if (currentScroll > lastScroll) {
      // scrolling down → hide
      navbar.style.top = `-100px`; // adjust if your navbar height is different
    } else {
      // scrolling up → show
      navbar.style.top = '0';
    }

    lastScroll = currentScroll;
  });
});



const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  location.reload();
});
