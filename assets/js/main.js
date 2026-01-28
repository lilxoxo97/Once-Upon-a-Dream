/**
 * Portfolio - Main JavaScript
 * Navigation, utilities, and interactive features
 */

(function() {
  'use strict';

  // ===== Mobile Navigation Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        span.classList.toggle('active');
      });
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // ===== Project Filter (Projects Page) =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-full');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.classList.add('fade-in');
          } else {
            card.classList.add('hidden');
            card.classList.remove('fade-in');
          }
        });
      });
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== Navbar Background on Scroll =====
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // ===== Intersection Observer for Fade-In Animation =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.project-card, .skill-category, .timeline-item, .education-card, .value-card'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    fadeObserver.observe(el);
  });

  // ===== Current Year in Footer =====
  const yearElements = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // ===== Console Easter Egg =====
  console.log('%c👋 Hello, curious developer!', 'font-size: 20px; color: #b06c6c;');
  console.log('%cFeel free to explore the code. Built with vanilla HTML, CSS, and JavaScript.', 'font-size: 14px; color: #636e72;');

})();
