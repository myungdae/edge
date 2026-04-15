/* ============================================================
   Edge Solutions - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  /* ---------- Close Nav on Link Click ---------- */
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-68px 0px 0px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  /* ---------- Scroll Reveal Animation ---------- */
  const revealElements = document.querySelectorAll(
    '.service-card, .why-card, .portfolio-card, .pricing-card, .about-inner'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.classList.contains('pricing-featured')
            ? 'scale(1.02) translateY(0)'
            : 'translateY(0)';
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el.classList.contains('pricing-featured')
      ? 'scale(1.02) translateY(24px)'
      : 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  /* ---------- Counter Animation ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  const startCounters = () => {
    if (countersStarted) return;
    countersStarted = true;

    statNums.forEach(el => {
      const text = el.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9.]/g, '');
      const duration = 1500;
      const steps = 60;
      const increment = num / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(current + increment, num);
        const display = Number.isInteger(num)
          ? Math.floor(current)
          : current.toFixed(1);
        el.textContent = display + suffix;
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  };

  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) startCounters();
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formMessage.style.color = '#dc2626';
        formMessage.textContent = '필수 항목을 모두 입력해 주세요.';
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '전송 중...';
      submitBtn.disabled = true;

      setTimeout(() => {
        formMessage.style.color = '#059669';
        formMessage.textContent = '✅ 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다!';
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => { formMessage.textContent = ''; }, 5000);
      }, 1000);
    });
  }

  /* ---------- Agentic AI iframe 클릭 활성화 ---------- */
  const agenticaiShield = document.getElementById('agenticaiShield');
  const agenticaiBtn   = document.getElementById('agenticaiBtn');
  const agenticaiFrame = document.getElementById('agenticaiFrame');

  if (agenticaiBtn && agenticaiShield && agenticaiFrame) {
    // 버튼 클릭 → 방패 숨기고 iframe 활성화
    agenticaiBtn.addEventListener('click', () => {
      agenticaiShield.classList.add('hidden');
      agenticaiFrame.classList.add('active');
    });

    // 섹션 벗어나면 자동 비활성화 → 메인 스크롤 복구
    const agenticaiSection = document.getElementById('agenticai');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          agenticaiShield.classList.remove('hidden');
          agenticaiFrame.classList.remove('active');
        }
      });
    }, { threshold: 0 });
    if (agenticaiSection) sectionObserver.observe(agenticaiSection);
  }

  /* ---------- Smooth Scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 68;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

});
