// ========== Preloader ==========
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    initAnimations();
  }, 500);
});

// ========== Header Scroll Effect ==========
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== Mobile Menu ==========
const menuBtn   = document.getElementById('menu-btn');
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navbar.classList.toggle('active');
  menuBtn.setAttribute('aria-expanded', menuBtn.classList.contains('active'));
  document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    navbar.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ========== Active Navigation Link ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top    = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === id) link.classList.add('active');
      });
    }
  });
});

// ========== Typing Effect ==========
if (document.querySelector('.typing-text')) {
  new Typed('.typing-text', {
    strings: ['Frontend Developer', 'HTML-верстальщик', 'React Developer', 'UI Enthusiast'],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    cursorChar: ''
  });
}

// ========== AOS-like Animations ==========
function initAnimations() {
  const animatedEls = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-aos-delay') || 0);
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedEls.forEach(el => observer.observe(el));
}

// ========== Skill Bars ==========
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(c => skillObserver.observe(c));

// ========== Number Counter ==========
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const target   = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step     = target / (duration / 16);
        let current    = 0;
        const update   = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target === 100 ? target + '' : target + '+';
          }
        };
        update();
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.home-stats');
if (statsSection) counterObserver.observe(statsSection);

// ========== Portfolio Filter ==========
const filterBtns      = document.querySelectorAll('.filter-btn');
const portfolioItems  = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.getAttribute('data-category') === filter;
      item.classList.toggle('hidden', !match);
      if (match) item.style.animation = 'fadeIn 0.4s ease forwards';
    });
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ========== Scroll Top Button ==========
const scrollTopBtn   = document.getElementById('scroll-top');
const scrollProgress = document.querySelector('.scroll-progress circle');
const pathLength     = 126;

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('scroll', () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPct    = scrollTop / docHeight;

  scrollTopBtn.classList.toggle('visible', scrollTop > 300);

  if (scrollProgress) {
    scrollProgress.style.strokeDashoffset = pathLength - scrollPct * pathLength;
  }
});

// ========== Contact Form — Formspree AJAX ==========
/*
  ╔══════════════════════════════════════════════════════════════╗
  ║  КАК ПОДКЛЮЧИТЬ FORMSPREE (делается один раз, бесплатно):   ║
  ║                                                              ║
  ║  1. Зайдите на https://formspree.io и зарегистрируйтесь     ║
  ║  2. Нажмите "+ New Form"                                     ║
  ║  3. Имя: "Portfolio Contact", Email: nnaarraa@mail.ru        ║
  ║  4. Нажмите "Create Form"                                    ║
  ║  5. Скопируйте ID (8 букв/цифр из URL вида /f/XXXXXXXX)     ║
  ║  6. Вставьте его вместо YOUR_FORM_ID в index.html           ║
  ║  7. Загрузите сайт на хостинг и отправьте тестовое письмо  ║
  ║  8. Formspree пришлёт email — нажмите "Confirm"             ║
  ║  Готово! Сообщения придут на nnaarraa@mail.ru               ║
  ╚══════════════════════════════════════════════════════════════╝
*/

const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');
const formFail    = document.getElementById('form-fail');

// Simple validation helpers
function validateField(input) {
  const errorEl = input.closest('.form-group').querySelector('.form-error');
  let   msg     = '';

  if (!input.value.trim()) {
    msg = 'Это поле обязательно';
  } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    msg = 'Введите корректный email';
  } else if (input.minLength && input.value.trim().length < input.minLength) {
    msg = `Минимум ${input.minLength} символа`;
  }

  input.classList.toggle('error', !!msg);
  if (errorEl) errorEl.textContent = msg;
  return !msg;
}

if (contactForm) {
  // Live validation on blur
  contactForm.querySelectorAll('input:not([type="hidden"]):not([name="_gotcha"]), textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const err = field.closest('.form-group').querySelector('.form-error');
      if (err) err.textContent = '';
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const fields   = [...contactForm.querySelectorAll('input:not([type="hidden"]):not([name="_gotcha"]), textarea')];
    const allValid = fields.map(validateField).every(Boolean);
    if (!allValid) return;

    // Disable button & show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Отправка</span><i class="fas fa-spinner fa-spin btn-icon"></i>';

    formSuccess.hidden = true;
    formFail.hidden    = true;

    try {
      const data = new FormData(contactForm);
      const res  = await fetch(contactForm.action, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        // Success
        formSuccess.hidden = false;
        contactForm.reset();
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const json = await res.json().catch(() => ({}));
        console.error('Formspree error:', json);
        formFail.hidden = false;
        formFail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch (err) {
      console.error('Network error:', err);
      formFail.hidden = false;
      formFail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = originalHTML;
    }
  });
}

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetPos = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    }
  });
});

// ========== Parallax Effect for Hero Orbs ==========
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.gradient-orb');
  const x    = e.clientX / window.innerWidth;
  const y    = e.clientY / window.innerHeight;
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 20;
    orb.style.transform = `translate(${(x - 0.5) * speed}px, ${(y - 0.5) * speed}px)`;
  });
});