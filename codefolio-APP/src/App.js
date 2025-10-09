import React, { useEffect } from 'react';

const titles = ["Full-Stack Developer", "AI Enthusiast", "Problem Solver", "Tech Innovator"];

function App() {
  useEffect(() => {
    // Loading screen fade out
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1500);
    }
    
    // ParticlesJS init
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 1000 } },
          color: { value: "#00d8ff" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1 } },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00d8ff",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        }
      });
    }

    // Custom cursor logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const cursorOutline = document.querySelector('.cursor-outline');
    setTimeout(() => {
      if (cursorDot && cursorCircle && cursorOutline) {
        document.body.style.cursor = 'none';
        cursorDot.style.opacity = 1;
        cursorCircle.style.opacity = 1;
        cursorOutline.style.opacity = 1;
      }
    }, 1000);

    let cursor = {
      dot: { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } },
      circle: { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } },
      outline: { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } }
    };

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function updateCursor() {
      cursor.dot.current = cursor.dot.target;
      cursor.circle.current.x = lerp(cursor.circle.current.x, cursor.circle.target.x, 0.2);
      cursor.circle.current.y = lerp(cursor.circle.current.y, cursor.circle.target.y, 0.2);
      cursor.outline.current.x = lerp(cursor.outline.current.x, cursor.outline.target.x, 0.1);
      cursor.outline.current.y = lerp(cursor.outline.current.y, cursor.outline.target.y, 0.1);

      if (cursorDot && cursorCircle && cursorOutline) {
        cursorDot.style.left = `${cursor.dot.current.x}px`;
        cursorDot.style.top = `${cursor.dot.current.y}px`;
        cursorCircle.style.left = `${cursor.circle.current.x}px`;
        cursorCircle.style.top = `${cursor.circle.current.y}px`;
        cursorOutline.style.left = `${cursor.outline.current.x}px`;
        cursorOutline.style.top = `${cursor.outline.current.y}px`;
      }
      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    document.addEventListener('mousemove', (e) => {
      cursor.dot.target = { x: e.clientX, y: e.clientY };
      cursor.circle.target = { x: e.clientX, y: e.clientY };
      cursor.outline.target = { x: e.clientX, y: e.clientY };
      if (cursor.circle.current.x === 0) {
        cursor.circle.current = { ...cursor.circle.target };
        cursor.outline.current = { ...cursor.outline.target };
      }
    });

    document.addEventListener('mouseout', () => {
      if (cursorDot && cursorCircle && cursorOutline) {
        cursorDot.style.opacity = 0;
        cursorCircle.style.opacity = 0;
        cursorOutline.style.opacity = 0;
      }
    });

    document.addEventListener('mouseover', () => {
      if (cursorDot && cursorCircle && cursorOutline) {
        cursorDot.style.opacity = 1;
        cursorCircle.style.opacity = 1;
        cursorOutline.style.opacity = 1;
      }
    });

    // Interactive elements hover
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-links a');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (cursorOutline && cursorCircle && cursorDot) {
          cursorOutline.style.width = '60px';
          cursorOutline.style.height = '60px';
          cursorOutline.style.marginTop = '-30px';
          cursorOutline.style.marginLeft = '-30px';
          cursorCircle.style.width = '30px';
          cursorCircle.style.height = '30px';
          cursorCircle.style.marginTop = '-15px';
          cursorCircle.style.marginLeft = '-15px';
          cursorDot.style.transform = 'scale(1.5)';
        }
      });
      element.addEventListener('mouseleave', () => {
        if (cursorOutline && cursorCircle && cursorDot) {
          cursorOutline.style.width = '40px';
          cursorOutline.style.height = '40px';
          cursorOutline.style.marginTop = '-20px';
          cursorOutline.style.marginLeft = '-20px';
          cursorCircle.style.width = '24px';
          cursorCircle.style.height = '24px';
          cursorCircle.style.marginTop = '-12px';
          cursorCircle.style.marginLeft = '-12px';
          cursorDot.style.transform = 'scale(1)';
        }
      });
    });

    // Header scroll logic
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }
      const backToTop = document.getElementById('backToTop');
      if (backToTop) {
        if (window.scrollY > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    });

    // Mobile menu toggle
    window.toggleMobileMenu = function () {
      const navLinks = document.getElementById('navLinks');
      const mobileMenu = document.querySelector('.mobile-menu');
      if (navLinks && mobileMenu) {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      }
    };

    // Scroll to section
    window.scrollToSection = function (sectionId) {
      const section = document.getElementById(sectionId);
      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      if (section) {
        window.scrollTo({
          top: section.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
      const navLinks = document.getElementById('navLinks');
      const mobileMenu = document.querySelector('.mobile-menu');
      if (navLinks && mobileMenu && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
      updateActiveLink(sectionId);
    };

    function updateActiveLink(sectionId) {
      const allLinks = document.querySelectorAll('.nav-links a, .footer-links a');
      allLinks.forEach(link => {
        const href = link.getAttribute('href')?.substring(1);
        if (href === sectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', function () {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          updateActiveLink(section.id);
        }
      });
    });

    window.scrollToTop = function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // Animate stats
    const animateStats = function () {
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current);
        }, 16);
      });
    };

    // Intersection Observer for sections
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          if (entry.target.id === 'about') {
            animateStats();
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });

    // Form submit
    window.submitForm = function (event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      alert('Thank you for your message! I will get back to you soon.');
      event.target.reset();
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks && mobileMenu && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileMenu.classList.remove('active');
        }
      }
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Typewriter effect
    function typewriterEffect() {
      const element = document.querySelector('.hero-subtitle');
      let currentIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let cursor = document.createElement('span');
      cursor.className = 'cursor';
      cursor.textContent = '|';
      if (element) element.appendChild(cursor);

      function type() {
        const currentTitle = titles[currentIndex];
        let speed = isDeleting ? 50 : 100;
        if (element) {
          if (isDeleting) {
            element.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
          } else {
            element.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
          }
          element.appendChild(cursor);
          if (!isDeleting && charIndex === currentTitle.length) {
            cursor.style.animation = 'blink 1s step-end infinite';
            isDeleting = true;
            speed = 2000;
          } else if (isDeleting && charIndex === 0) {
            cursor.style.animation = 'none';
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length;
            speed = 500;
          }
        }
        setTimeout(type, speed);
      }
      type();
    }
    typewriterEffect();

    // Skill particles
    function initSkillParticles() {
      const skillCards = document.querySelectorAll('.skill-card');
      skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          if (window.particlesJS) {
            window.particlesJS('particles-js', {
              particles: {
                color: { value: "#2ecc71" },
                line_linked: { color: "#2ecc71" }
              }
            });
          }
        });
        card.addEventListener('mouseleave', () => {
          if (window.particlesJS) {
            window.particlesJS('particles-js', {
              particles: {
                color: { value: "#3498db" },
                line_linked: { color: "#3498db" }
              }
            });
          }
        });
      });
    }
    initSkillParticles();

    // Cleanup listeners on unmount
    return () => {
      // Remove listeners if needed
    };
  }, []);

  return (
    <div>
      {/* Your JSX goes here */}
      {/* Example: */}
      <div id="loading-screen"></div>
      <header id="header"></header>
      <div id="particles-js"></div>
      <div className="cursor-dot"></div>
      <div className="cursor-circle"></div>
      <div className="cursor-outline"></div>
      <nav id="navLinks" className="nav-links"></nav>
      <div className="mobile-menu"></div>
      <button id="backToTop" onClick={() => window.scrollToTop()}></button>
      <section id="about"></section>
      <div className="hero-subtitle"></div>
      {/* ...other sections/components */}
    </div>
  );
}

export default App;