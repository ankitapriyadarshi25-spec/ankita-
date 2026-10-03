/**
 * Ankita Priyadarshi - Personal Portfolio Scripts
 * Handles theme toggling, dynamic typing, scroll-spy, resume modal, and UX interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light Mode)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('ankita_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('ankita_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  /* ------------------------------------------------------------------------
     2. Dynamic Typing Effect in Hero Section
     ------------------------------------------------------------------------ */
  const typingElement = document.getElementById('dynamic-typing');
  if (typingElement) {
    const roles = [
      "B.Tech First Year Student",
      "C & Java Programming Learner",
      "Generative AI & Prompt Explorer",
      "Curious Problem Solver",
      "Fine Artist & Reflective Journaler"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 1600;
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  /* ------------------------------------------------------------------------
     3. Sticky Navbar & Scroll Spy
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .mobile-link');

  window.addEventListener('scroll', () => {
    // Add shadow on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Detection
    let currentActive = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActive = section.getAttribute('id');
      }
    });

    if (currentActive) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentActive}`);
      });
      mobileLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentActive}`);
      });
    }
  });

  /* ------------------------------------------------------------------------
     4. Mobile Drawer Navigation
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && closeDrawerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', openDrawer);
    closeDrawerBtn.addEventListener('click', closeDrawer);

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on outer escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Resume Modal Preview & Print Trigger
     ------------------------------------------------------------------------ */
  const resumeModal = document.getElementById('resume-modal');
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-trigger');
  const closeResumeModalBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResumeModal() {
    if (mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (navResumeBtn) navResumeBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResumeModal);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);

  // Close modal when clicking backdrop
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
        closeResumeModal();
      }
    });
  }

  // Print resume
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ------------------------------------------------------------------------
     6. Copy to Clipboard Functionality
     ------------------------------------------------------------------------ */
  const copyButtons = document.querySelectorAll('[data-copy], #copy-quick-email');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) {
        textToCopy = 'ankita.priyadarshi25@gmail.com';
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied: ${textToCopy}`);
      }).catch(() => {
        showToast(`Could not copy automatically`);
      });
    });
  });

  /* ------------------------------------------------------------------------
     7. Interactive Contact Form
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const subjectInput = document.getElementById('sender-subject');
      const messageInput = document.getElementById('sender-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        e.preventDefault();
        showToast('Please fill out all required fields.');
        return;
      }

      // Format custom mailto URL for immediate sending
      const recipient = 'ankita.priyadarshi25@gmail.com';
      const subject = encodeURIComponent(subjectInput.value.trim() || `Portfolio Inquiry from ${nameInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hi Ankita,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}\n\n---\nSent from your portfolio website.`
      );

      // Trigger mail client smoothly
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      showToast('Opening your email client...');
      contactForm.reset();
      e.preventDefault();
    });
  }

  /* ------------------------------------------------------------------------
     8. Back to Top Button
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     9. Toast Notification Helper
     ------------------------------------------------------------------------ */
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

});
