/* ============================================================
   SynqAI — Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     Navbar: scroll state
  ---------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ----------------------------------------------------------
     Navbar: active link detection
  ---------------------------------------------------------- */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    if (
      linkFile === currentFile ||
      (currentFile === '' && linkFile === 'index.html') ||
      (currentFile === '' && href === '/') ||
      (linkFile === 'index.html' && (currentFile === '' || currentFile === 'index.html'))
    ) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     Mobile menu: hamburger toggle
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------------------------
     Scroll animations: IntersectionObserver
  ---------------------------------------------------------- */
  const animTargets = document.querySelectorAll('[data-animate]');

  if (animTargets.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    animTargets.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animTargets.forEach(el => el.classList.add('animated'));
  }


  /* ----------------------------------------------------------
     Industry card carousel
  ---------------------------------------------------------- */
  const indTrack = document.getElementById('indTrack');
  const indDotsContainer = document.getElementById('indDots');

  if (indTrack) {
    const indCards = Array.from(indTrack.querySelectorAll('.ind-card'));
    const totalCards = indCards.length;
    const prevBtn = document.querySelector('.ind-prev');
    const nextBtn = document.querySelector('.ind-next');
    let currentInd = 0;
    let autoTimer;

    function getVisible() {
      return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    }

    function maxIndex() {
      return Math.max(0, totalCards - getVisible());
    }

    function updateTrack(animate = true) {
      if (!animate) indTrack.style.transition = 'none';
      const cardWidth = indCards[0].offsetWidth + 20;
      indTrack.style.transform = `translateX(-${currentInd * cardWidth}px)`;
      if (!animate) void indTrack.offsetHeight;
      if (!animate) indTrack.style.transition = '';

      // Update dots
      if (indDotsContainer) {
        indDotsContainer.querySelectorAll('.ind-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentInd);
        });
      }

      // Button states
      if (prevBtn) prevBtn.disabled = currentInd === 0;
      if (nextBtn) nextBtn.disabled = currentInd >= maxIndex();
    }

    function buildDots() {
      if (!indDotsContainer) return;
      indDotsContainer.innerHTML = '';
      const count = maxIndex() + 1;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'ind-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => { currentInd = i; updateTrack(); resetAuto(); });
        indDotsContainer.appendChild(dot);
      }
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        currentInd = currentInd >= maxIndex() ? 0 : currentInd + 1;
        updateTrack();
      }, 4500);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (currentInd > 0) { currentInd--; updateTrack(); resetAuto(); }
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (currentInd < maxIndex()) { currentInd++; updateTrack(); resetAuto(); }
    });

    window.addEventListener('resize', () => {
      currentInd = Math.min(currentInd, maxIndex());
      buildDots();
      updateTrack(false);
    });

    buildDots();
    updateTrack(false);
    resetAuto();
  }

  /* ----------------------------------------------------------
     Cycling hero word
  ---------------------------------------------------------- */
  const cycleWords = ['Respond', 'Engage', 'Convert', 'Scale', 'Grow', 'Capture'];
  let cycleIdx = 0;
  const cycleEl = document.getElementById('hero-cycle-word');

  if (cycleEl) {
    setInterval(() => {
      // Slide out upward
      cycleEl.style.transform = 'translateY(-110%)';
      cycleEl.style.opacity = '0';

      setTimeout(() => {
        // Jump to bottom instantly (no transition)
        cycleEl.style.transition = 'none';
        cycleEl.style.transform = 'translateY(110%)';
        cycleEl.style.opacity = '0';
        cycleIdx = (cycleIdx + 1) % cycleWords.length;
        cycleEl.textContent = cycleWords[cycleIdx];

        // Force reflow then animate back in
        void cycleEl.offsetHeight;
        cycleEl.style.transition = '';
        cycleEl.style.transform = 'translateY(0)';
        cycleEl.style.opacity = '1';
      }, 340);
    }, 2800);
  }

  /* ----------------------------------------------------------
     Smooth scroll for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
