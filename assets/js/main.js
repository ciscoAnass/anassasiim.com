// ===== Vanta.js (Contact) =====
let vantaEffectContact;
function initializeVantaContact() {
  const vantaCanvasElement = document.getElementById('vanta-canvas-contact');
  if (vantaCanvasElement && typeof VANTA !== 'undefined' && VANTA.RINGS) {
    vantaEffectContact = VANTA.RINGS({
      el: vantaCanvasElement,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 400.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: 0xe0f2fe, // sky-50
      color: 0x0ea5e9 // sky-500
    });
  }
}

// ===== Name "decrypt" animation =====
const targetText = "Anass Assim";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
let frame = 0;
let animation;
let duration = 180; // ~4.5s @60fps
let revealFrames = [];

function initQueue() {
  revealFrames = [];
  const step = duration / targetText.length;
  for (let i = 0; i < targetText.length; i++) {
    revealFrames.push(Math.floor(step * (i + 1)));
  }
  frame = 0;
}

function animate(el) {
  let output = "";
  for (let i = 0; i < targetText.length; i++) {
    if (frame >= revealFrames[i]) {
      output += targetText[i];
    } else {
      if (frame % 6 === 0) {
        output += chars[Math.floor(Math.random() * chars.length)];
      } else {
        output += el.textContent[i] || chars[Math.floor(Math.random() * chars.length)];
      }
    }
  }
  el.textContent = output;

  if (frame < duration) {
    frame++;
    animation = requestAnimationFrame(() => animate(el));
  }
}

function decryptEffect(el) {
  initQueue();
  if (animation) cancelAnimationFrame(animation);
  animate(el);
}

// ===== Enhanced JS =====
document.addEventListener('DOMContentLoaded', function () {
  // --- Init Vanta
  initializeVantaContact();

  // --- Init decrypt effect AFTER #decrypt exists
  const decryptEl = document.getElementById("decrypt");
  if (decryptEl) decryptEffect(decryptEl);

  // --- Scroll progress indicator (throttled)
  let ticking = false;

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const bar = document.querySelector('.scroll-indicator');
    if (bar) bar.style.width = scrollPercent + '%';
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScrollProgress);
    }
  }

  window.addEventListener('scroll', requestTick);
  updateScrollProgress();

  // --- Intersection Observer for animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('timeline-item')) {
          entry.target.classList.add('animate');
        }

        if (entry.target.querySelector && entry.target.querySelector('.loading-bar')) {
          const progressBars = entry.target.querySelectorAll('.loading-bar');
          progressBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.animationPlayState = 'running';
            }, index * 200);
          });
        }
      }
    });
  }, observerOptions);

  document
    .querySelectorAll('.section-fade, .timeline-item, .hover-card')
    .forEach(el => observer.observe(el));

  // --- Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Parallax
  window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax').forEach(element => {
      const speed = parseFloat(element.dataset.speed || 0.5);
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // --- Magnetic effect
  document.querySelectorAll('.magnetic').forEach(element => {
    element.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    element.addEventListener('mouseleave', function () {
      this.style.transform = 'translate(0, 0)';
    });
  });

  // --- Typing effect
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    (function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i++);
        setTimeout(type, speed);
      }
    })();
  }

  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const typingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter(entry.target, entry.target.textContent);
          typingObserver.unobserve(entry.target);
        }
      });
    });
    typingObserver.observe(typingElement);
  }

  // --- Contact form fake-submit
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check mr-3"></i>Message Sent!';
        submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        submitBtn.classList.remove('bg-sky-600', 'hover:bg-sky-700');

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
          submitBtn.classList.add('bg-sky-600', 'hover:bg-sky-700');
          this.reset();
        }, 2000);
      }, 2000);
    });
  }

  // --- Fancy cursor (desktop only)
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className =
      'fixed w-4 h-4 bg-sky-500 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out opacity-50';
    cursor.style.left = '-100px';
    cursor.style.top = '-100px';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX - 8 + 'px';
      cursor.style.top = e.clientY - 8 + 'px';
    });
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8)';
    });
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1)';
    });

    document.querySelectorAll('a, button, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => (cursor.style.opacity = '0'));
      el.addEventListener('mouseleave', () => (cursor.style.opacity = '0.5'));
    });
  }

  // --- Page loaded + skill bars
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // --- Current year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Lazy images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  // --- A11y focus rings
  document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function () {
      this.style.outline = '2px solid #0ea5e9';
      this.style.outlineOffset = '2px';
    });
    element.addEventListener('blur', function () {
      this.style.outline = 'none';
    });
  });

  console.log('🚀 Portfolio loaded with fixed mobile menu + animations');

  // --- Mobile menu toggle (fixed) ---
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileBtn.setAttribute('aria-expanded', String(isHidden));
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

// ===== Header shadow (outside DOMContentLoaded to be safe) =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('shadow-lg', 'bg-white/90');
  } else {
    navbar.classList.remove('shadow-lg', 'bg-white/90');
  }
});
