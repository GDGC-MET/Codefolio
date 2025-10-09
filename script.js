// Particles.js configuration
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#3498db" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3498db",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
    },
    retina_detect: true,
  });
}

// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add("fade-out");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1000);
});

// Custom cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0,
  mouseY = 0;
let outlineX = 0,
  outlineY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
});

// Smooth cursor outline animation
function animateCursor() {
  const diffX = mouseX - outlineX;
  const diffY = mouseY - outlineY;

  outlineX += diffX * 0.1;
  outlineY += diffY * 0.1;

  if (cursorOutline) {
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll(
  "a, button, .project-card, .skill-card"
);
interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    if (cursorOutline) {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorOutline.style.borderColor = "#2ecc71";
    }
  });

  element.addEventListener("mouseleave", () => {
    if (cursorOutline) {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.borderColor = "#3498db";
    }
  });
});

// Header scroll effect
const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }

  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const mobileMenu = document.querySelector(".mobile-menu");

  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");
}

// Wire up mobile menu button and nav link clicks
const mobileMenuBtn = document.querySelector(".mobile-menu");
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMobileMenu();
  });

  // Allow toggling with Enter/Space for accessibility
  mobileMenuBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMobileMenu();
    }
  });
}

// Close mobile menu when any nav link is clicked (for single-page nav)
const navAnchors = document.querySelectorAll("#navLinks a");
navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    const navLinks = document.getElementById("navLinks");
    const mobileMenu = document.querySelector(".mobile-menu");
    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
    }
  });
});

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const headerHeight = document.getElementById("header").offsetHeight;

  window.scrollTo({
    top: section.offsetTop - headerHeight,
    behavior: "smooth",
  });

  // Close mobile menu if open
  const navLinks = document.getElementById("navLinks");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Animate stats counter
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-count"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");

      // Animate stats when about section is visible
      if (entry.target.id === "about") {
        animateStats();
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Typewriter effect for hero subtitle
function typewriterEffect() {
  const titles = [
    "Full-Stack Developer",
    "AI Enthusiast",
    "Problem Solver",
    "Tech Innovator",
  ];
  const element = document.querySelector(".hero-subtitle");
  if (!element) return;

  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[currentIndex];

    if (isDeleting) {
      element.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % titles.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }

  type();
}

// Start typewriter effect when page loads
window.addEventListener("load", () => {
  setTimeout(typewriterEffect, 1500);
});

// Form submission with backend integration
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formMessage = document.getElementById("form-message");
    const submitButton = contactForm.querySelector(".submit-button");

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = "<span>Sending...</span>";
    formMessage.textContent = "";
    formMessage.className = "form-message";

    try {
      // Send to backend API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        formMessage.textContent =
          "Thank you for your message! I will get back to you soon.";
        formMessage.className = "form-message success";
        contactForm.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      formMessage.textContent =
        "Sorry, there was an error sending your message. Please try again or email me directly.";
      formMessage.className = "form-message error";
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.innerHTML = `
                <span>Send Message</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
    }
  });
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    const navLinks = document.getElementById("navLinks");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  }
});

// Update active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
