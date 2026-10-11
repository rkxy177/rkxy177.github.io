/* ============================================================
   C R O K   P E R S O N A L   W E B S I T E
   JavaScript - Interactivity & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initScrollReveal();
    initTypewriter();
    initParticles();
    initCustomCursor();
    initNavScroll();
    initSmoothScroll();
    initBackToTop();
    initActiveNavLink();
    initContactForm();
    initCurrentYear();
    initSkillBars();
});

/* ============================================================
   1. THEME TOGGLE (Dark / Light Mode)
   ============================================================ */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('i');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Get saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');

    applyTheme(currentTheme, icon);

    toggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme, icon);
        localStorage.setItem('theme', newTheme);
    });

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light', icon);
        }
    });
}

function applyTheme(theme, icon) {
    document.documentElement.setAttribute('data-theme', theme);
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/* ============================================================
   2. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================================
   3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ============================================================
   4. TYPEWRITER EFFECT
   ============================================================ */
function initTypewriter() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const words = [
        '开发者',
        '设计师',
        '终身学习者',
        '开源贡献者',
        '问题解决者'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Typing speed
        let typeSpeed = isDeleting ? 50 : 120;

        // If word is completed
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of word
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

/* ============================================================
   5. PARTICLE BACKGROUND
   ============================================================ */
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${Math.random() * 0.2 + 0.05};
        `;

        container.appendChild(particle);
    }
}

/* ============================================================
   6. CUSTOM CURSOR
   ============================================================ */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        follower.style.left = `${cursorX}px`;
        follower.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Enlarge cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .btn, input, textarea, .project-card, .skill-category, .social-link, .contact-link, .tag, .tech-tags span');

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.width = '50px';
            follower.style.height = '50px';
            follower.style.borderColor = 'var(--accent)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.width = '36px';
            follower.style.height = '36px';
            follower.style.borderColor = 'var(--accent-light)';
        });
    });
}

/* ============================================================
   7. NAVBAR SCROLL EFFECT
   ============================================================ */
function initNavScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ============================================================
   8. SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
}

/* ============================================================
   9. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================================
   10. ACTIVE NAV LINK BASED ON SCROLL POSITION
   ============================================================ */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================================
   11. CONTACT FORM HANDLER
   ============================================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;

        // Simulate sending
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> 消息已发送！';
            submitBtn.style.background = 'var(--success)';
            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

/* ============================================================
   12. CURRENT YEAR IN FOOTER
   ============================================================ */
function initCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* ============================================================
   13. ANIMATE SKILL BARS ON SCROLL
   ============================================================ */
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                // Trigger reflow
                void bar.offsetWidth;
                bar.style.width = targetWidth;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));
}
