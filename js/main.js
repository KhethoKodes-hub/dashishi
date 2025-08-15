// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      
      // Toggle body scroll when menu is open
      if (mainNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (mainNav.classList.contains('active')) {
          mobileMenuToggle.classList.remove('active');
          mainNav.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }
  
  // Header Scroll Effect
  const header = document.querySelector('.main-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Cookie Consent Banner
  const cookieBanner = document.getElementById('cookieConsent');
  const acceptCookiesBtn = document.getElementById('acceptCookies');
  
  if (cookieBanner && acceptCookiesBtn) {
    // Check if cookie consent was already given
    if (!localStorage.getItem('cookieConsent')) {
      // Show banner after a short delay
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1000);
    }
    
    // Handle accept button click
    acceptCookiesBtn.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('show');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });
  
  // Lazy loading images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Testimonial Slider (basic implementation)
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    let currentIndex = 0;
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
      });
    }
    
    // Initialize
    showTestimonial(0);
    
    // Auto-rotate testimonials every 5 seconds
    if (totalTestimonials > 1) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
      }, 5000);
    }
  }
  
  // Add fade-in animation to sections as they come into view
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('fade-in');
      }
    });
  };
  
  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Google Tag Manager (if implemented)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GTM-XXXXXX');



document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (!mobileMenuToggle || !mainNav) {
        console.error("Mobile menu elements not found!");
        return;
    }

    // Toggle menu function
    function toggleMenu() {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Toggle on button click
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking links
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            e.target !== mobileMenuToggle) {
            toggleMenu();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Debugging check
    console.log("Mobile menu script loaded");
    console.log("Viewport width:", window.innerWidth);
});


const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});