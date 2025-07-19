// DOM Elements - will be initialized after DOM loads
let themeToggle, languageToggle, menuToggle, navMenu, mouseFollower, mouseDot, mouseTrail, cursorText;
let viewMoreSkillsBtn, viewLessSkillsBtn, skillsGrid;

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLanguage = localStorage.getItem('language') || 'en';

// Initialize theme
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Language Management
function initLanguage() {
    document.documentElement.setAttribute('lang', currentLanguage);
    document.documentElement.setAttribute('dir', currentLanguage === 'fa' ? 'rtl' : 'ltr');
    updateLanguageText();
    updateAllTexts();
}

// Language switching functionality
function switchLanguage(lang) {
    const isRTL = lang === 'fa';
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-fa]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update cursor text
    const cursorElements = document.querySelectorAll('[data-cursor][data-cursor-fa]');
    cursorElements.forEach(element => {
        const cursorText = element.getAttribute(`data-cursor-${lang}`);
        if (cursorText) {
            element.setAttribute('data-cursor', cursorText);
        }
    });

    // Update form placeholders and labels
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const label = input.nextElementSibling;
        if (label && label.hasAttribute(`data-${lang}`)) {
            const placeholderText = label.getAttribute(`data-${lang}`);
            if (placeholderText) {
                label.textContent = placeholderText;
            }
        }
    });

    // Update button text
    const buttons = document.querySelectorAll('button[data-en][data-fa]');
    buttons.forEach(button => {
        const buttonText = button.getAttribute(`data-${lang}`);
        if (buttonText) {
            button.textContent = buttonText;
        }
    });

    // Update navigation active state
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.classList.toggle('active', lang === 'fa');
    }

    // Update language toggle button text
    updateLanguageText();

    // Store language preference
    localStorage.setItem('preferredLanguage', lang);

    // Update testimonials if they exist
    if (allTestimonials && allTestimonials.length > 0) {
        updateTestimonialsView();
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'fa' : 'en';
    switchLanguage(currentLanguage);
}

function updateLanguageText() {
    if (!languageToggle) return;
    const langText = languageToggle.querySelector('.lang-text');
    if (langText) {
        langText.textContent = currentLanguage === 'en' ? 'فا' : 'EN';
    }
}

function updateAllTexts() {
    const elements = document.querySelectorAll('[data-en][data-fa]');
    elements.forEach(element => {
        const enText = element.getAttribute('data-en');
        const faText = element.getAttribute('data-fa');
        element.textContent = currentLanguage === 'en' ? enText : faText;
    });

    // Update button spans specifically
    const buttonSpans = document.querySelectorAll('.btn span[data-en]');
    buttonSpans.forEach(span => {
        const enText = span.getAttribute('data-en');
        const faText = span.getAttribute('data-fa');
        span.textContent = currentLanguage === 'en' ? enText : faText;
    });

    // Update cursor text for interactive elements
    const cursorElements = document.querySelectorAll('[data-cursor]');
    cursorElements.forEach(element => {
        const cursorEn = element.getAttribute('data-cursor');
        const cursorFa = element.getAttribute('data-cursor-fa');
        if (cursorFa) {
            element.setAttribute('data-cursor', currentLanguage === 'en' ? cursorEn : cursorFa);
        }
    });

    // Update testimonials if they exist
    if (allTestimonials && allTestimonials.length > 0) {
        updateTestimonialsView();
    }

    // Update see more buttons
    const seeMoreBtns = document.querySelectorAll('.see-more-btn');
    seeMoreBtns.forEach(btn => {
        const span = btn.querySelector('span');
        if (span) {
            const isExpanded = btn.classList.contains('expanded');
            if (isExpanded) {
                span.textContent = currentLanguage === 'en' ? 'See Less' : 'کمتر ببینید';
            } else {
                const enText = span.getAttribute('data-en');
                const faText = span.getAttribute('data-fa');
                span.textContent = currentLanguage === 'en' ? enText : faText;
            }
        }
    });
}

// Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.getElementById('menuToggle');

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.getElementById('menuToggle');

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Advanced Mouse Follower
let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let trailX = 0;
let trailY = 0;

function updateMousePosition(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function animateMouseFollower() {
    if (!mouseDot || !mouseTrail) return;

    // Smooth dot movement with improved easing
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;

    // Smooth trail movement with improved easing
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;

    // Update positions
    mouseDot.style.left = dotX + 'px';
    mouseDot.style.top = dotY + 'px';
    mouseTrail.style.left = trailX + 'px';
    mouseTrail.style.top = trailY + 'px';

    requestAnimationFrame(animateMouseFollower);
}

// Cursor Text Animation
function showCursorText(text, x, y) {
    if (!cursorText) return;
    cursorText.textContent = text;
    cursorText.style.left = x + 'px';
    cursorText.style.top = y + 'px';
    cursorText.style.opacity = '1';
    cursorText.style.transform = 'translate(-50%, -50%) scale(1)';
}

function hideCursorText() {
    if (!cursorText) return;
    cursorText.style.opacity = '0';
    cursorText.style.transform = 'translate(-50%, -50%) scale(0.8)';
}

// Enhanced Parallax Effects
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.glass-card, .floating-card, .work-item, .service-card, .team-member, .testimonial-card');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax for background layers
        parallaxLayers.forEach((layer, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            const xPos = Math.sin(scrolled * 0.001 + index) * 20;
            layer.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });

        // Parallax for sections - DISABLED to fix footer spacing
        // sections.forEach((section, index) => {
        //     const speed = 0.05 + (index * 0.02);
        //     const yPos = -(scrolled * speed);
        //     section.style.transform = `translateY(${yPos}px)`;
        // });

        // Parallax for cards
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardTop = rect.top + window.pageYOffset;
            const cardCenter = cardTop + rect.height / 2;
            const distance = scrolled - cardCenter + window.innerHeight / 2;
            const speed = 0.03;
            const yPos = distance * speed;

            if (Math.abs(distance) < window.innerHeight * 2) {
                card.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Mouse Move Effects for Cards
function initMouseMoveEffects() {
    const interactiveElements = document.querySelectorAll('[data-cursor], .btn, .nav-link, .work-item, .service-card, .team-member, .social-link, .testimonial-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const cursorText = element.getAttribute('data-cursor');
            if (cursorText) {
                showCursorText(cursorText, e.clientX, e.clientY);
            }

            // Scale up mouse follower
            mouseDot.style.transform = 'translate(-50%, -50%) scale(2)';
            mouseTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        element.addEventListener('mouseleave', () => {
            hideCursorText();

            // Reset mouse follower
            mouseDot.style.transform = 'translate(-50%, -50%) scale(1)';
            mouseTrail.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        element.addEventListener('mousemove', (e) => {
            if (element.getAttribute('data-cursor')) {
                showCursorText(element.getAttribute('data-cursor'), e.clientX, e.clientY);
            }
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .work-item, .service-card, .team-member, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const isDark = currentTheme === 'dark';
        const baseColor = isDark ? '0, 0, 0' : '255, 255, 255';

        if (window.scrollY > 100) {
            navbar.style.background = `rgba(${baseColor}, 0.95) !important`;
            navbar.style.backdropFilter = 'blur(20px) !important';
        } else {
            navbar.style.background = `rgba(${baseColor}, 0.1) !important`;
            navbar.style.backdropFilter = 'blur(20px) !important';
        }
    });
}

// Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Enhanced validation
            if (!name || !email || !subject || !message) {
                const errorMessage = currentLanguage === 'fa' ? 'لطفاً تمام فیلدها را پر کنید' : 'Please fill in all fields';
                showNotification(errorMessage, 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const errorMessage = currentLanguage === 'fa' ? 'لطفاً یک ایمیل معتبر وارد کنید' : 'Please enter a valid email address';
                showNotification(errorMessage, 'error');
                return;
            }

            // Simulate form submission
            const successMessage = currentLanguage === 'fa' ? 'پیام با موفقیت ارسال شد!' : 'Message sent successfully!';
            showNotification(successMessage, 'success');

            // Reset form
            contactForm.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles with RTL support
    const isRTL = currentLanguage === 'fa';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        ${isRTL ? 'left: 20px' : 'right: 20px'};
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(${isRTL ? '-100%' : '100%'});
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        direction: ${isRTL ? 'rtl' : 'ltr'};
        text-align: ${isRTL ? 'right' : 'left'};
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = `translateX(${isRTL ? '-100%' : '100%'})`;
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const titleLines = document.querySelectorAll('.title-line');

    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';

        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            typeWriter();
        }, index * 800);
    });
}

// Floating Cards Animation
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
}

// Magnetic Effect for Buttons
function initMagneticEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Particle System for Background
function initParticleSystem() {
    const heroBackground = document.querySelector('.hero-background');
    const projectHeroBackground = document.querySelector('.project-hero-background');

    // Use whichever background element exists
    const targetBackground = heroBackground || projectHeroBackground;

    if (!targetBackground) {
        return; // Exit if no background element found
    }

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        targetBackground.appendChild(particle);
    }
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

async function fetchProjectsFromAPI() {
    const res = await fetch('https://pocketbase-5i4fn3.chbk.app/api/collections/projects/records');
    const data = await res.json();
    return data.items;
}

async function fetchTestimonialsFromAPI() {
    const res = await fetch('https://pocketbase-5i4fn3.chbk.app/api/collections/opinions/records');
    const data = await res.json();
    return data.items;
}

let allProjects = [];
let showingAll = false;

let allTestimonials = [];

function renderProjects(projects) {
    allProjects = projects;
    showingAll = false;
    updateProjectsView();
    updateViewMoreButtons();
}

function renderTestimonials(testimonials) {
    allTestimonials = testimonials;
    updateTestimonialsView();
    updateTestimonialsStats();
}

function updateProjectsView() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;
    let toShow = showingAll ? allProjects : allProjects.slice(0, 4);
    if (!toShow || toShow.length === 0) {
        projectsList.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <p data-en="No projects found" data-fa="هیچ پروژه‌ای یافت نشد">No projects found</p>
            </div>
        `;
        return;
    }
    projectsList.innerHTML = toShow.map(project => `
        <div class="project-card glass-card">
            <div class="project-info">
                <h3 class="project-title" data-en="${project.english_name}" data-fa="${project.persian_name}">${project.english_name}</h3>
                <p class="project-desc" data-en="${project.english_subtitle}" data-fa="${project.persian_subtitle}">${project.english_subtitle}</p>
            </div>
            <div class="project-actions">
                <a class="btn btn-primary" href="${project.live}" target="_blank">
                    <span data-en="View Live" data-fa="مشاهده زنده">View Live</span>
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a class="btn btn-secondary" href="${project.github}" target="_blank">
                    <span data-en="GitHub" data-fa="گیت‌هاب">GitHub</span>
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function updateViewMoreButtons() {
    const viewMoreBtn = document.getElementById('viewMoreProjects');
    const viewLessBtn = document.getElementById('viewLessProjects');
    if (!viewMoreBtn || !viewLessBtn) return;
    if (allProjects.length <= 4) {
        viewMoreBtn.style.display = 'none';
        viewLessBtn.style.display = 'none';
    } else if (showingAll) {
        viewMoreBtn.style.display = 'none';
        viewLessBtn.style.display = 'inline-block';
    } else {
        viewMoreBtn.style.display = 'inline-block';
        viewLessBtn.style.display = 'none';
    }
}

// Function to check if text needs "See More" button
function shouldShowSeeMore(text) {
    // Count words in the text
    const wordCount = text.trim().split(/\s+/).length;

    // Count characters in the text
    const charCount = text.trim().length;

    // Show "See More" if text has more than 15 words OR more than 120 characters
    return wordCount > 15 || charCount > 120;
}

function updateTestimonialsView() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) return;

    if (!allTestimonials || allTestimonials.length === 0) {
        testimonialsGrid.innerHTML = `
            <div class="no-testimonials">
                <i class="fas fa-comments"></i>
                <p data-en="No testimonials found" data-fa="هیچ نظری یافت نشد">No testimonials found</p>
            </div>
        `;
        return;
    }

    testimonialsGrid.innerHTML = allTestimonials.map(testimonial => `
        <div class="testimonial-card" data-cursor="Read More" data-cursor-fa="بیشتر بخوانید">
            <div class="quote-icon">
                <i class="fas fa-quote-left"></i>
            </div>
            <div class="testimonial-text-wrapper">
                <p class="testimonial-text" 
                   data-en="${testimonial.text_english}" 
                   data-fa="${testimonial.text_persian}"
                   style="text-align: ${currentLanguage === 'fa' ? 'right' : 'left'} !important; text-align-last: ${currentLanguage === 'fa' ? 'right' : 'left'} !important; direction: ${currentLanguage === 'fa' ? 'rtl' : 'ltr'} !important; padding-right: ${currentLanguage === 'fa' ? '12px' : '50px'} !important; padding-left: ${currentLanguage === 'fa' ? '50px' : '0'} !important; display: -webkit-box !important; -webkit-line-clamp: 4 !important; -webkit-box-orient: vertical !important; overflow: hidden !important;">
                    "${currentLanguage === 'en' ? testimonial.text_english : testimonial.text_persian}"
                </p>
                ${shouldShowSeeMore(currentLanguage === 'en' ? testimonial.text_english : testimonial.text_persian) ? `
                <button class="see-more-btn" data-en="See More" data-fa="بیشتر ببینید">
                    <span data-en="See More" data-fa="بیشتر ببینید">${currentLanguage === 'en' ? 'See More' : 'بیشتر ببینید'}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                ` : ''}
            </div>
            <div class="testimonial-author">
                ${currentLanguage === 'en' ? `
                    <div class="author-avatar">
                        <img src="https://pocketbase-5i4fn3.chbk.app/api/files/pbc_4276166857/${testimonial.id}/${testimonial.image}" 
                             alt="${testimonial.name}" 
                             loading="lazy">
                    </div>
                    <div class="author-info">
                        <h4 data-en="${testimonial.name}" data-fa="${testimonial.name}">${testimonial.name}</h4>
                        <p data-en="${testimonial.title}" data-fa="${testimonial.title}">${testimonial.title}</p>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                ` : `
                    <div class="author-info">
                        <h4 data-en="${testimonial.name}" data-fa="${testimonial.name}">${testimonial.name}</h4>
                        <p data-en="${testimonial.title}" data-fa="${testimonial.title}">${testimonial.title}</p>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="author-avatar">
                        <img src="https://pocketbase-5i4fn3.chbk.app/api/files/pbc_4276166857/${testimonial.id}/${testimonial.image}" 
                             alt="${testimonial.name}" 
                             loading="lazy">
                    </div>
                `}
            </div>
        </div>
    `).join('');

    // Add event listeners for see more buttons
    addSeeMoreEventListeners();
}

function updateTestimonialsStats() {
    if (!allTestimonials || allTestimonials.length === 0) return;

    const totalTestimonials = allTestimonials.length;
    const satisfactionRate = 98; // You can calculate this based on ratings if available
    const averageRating = 4.9; // You can calculate this based on ratings if available

    // Update stats in the DOM
    const statsContainer = document.querySelector('.testimonials-stats');
    if (statsContainer) {
        const statItems = statsContainer.querySelectorAll('.stat-item');
        if (statItems.length >= 3) {
            // Update client satisfaction
            const satisfactionStat = statItems[0].querySelector('.stat-number');
            if (satisfactionStat) {
                satisfactionStat.textContent = `${satisfactionRate}%`;
            }

            // Update happy clients count
            const clientsStat = statItems[1].querySelector('.stat-number');
            if (clientsStat) {
                clientsStat.textContent = `${totalTestimonials}+`;
            }

            // Update average rating
            const ratingStat = statItems[2].querySelector('.stat-number');
            if (ratingStat) {
                ratingStat.textContent = `${averageRating}/5`;
            }
        }
    }
}

function addSeeMoreEventListeners() {
    const seeMoreBtns = document.querySelectorAll('.see-more-btn');
    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const textWrapper = this.closest('.testimonial-text-wrapper');
            const text = textWrapper.querySelector('.testimonial-text');
            const span = this.querySelector('span');
            const icon = this.querySelector('i');

            if (text.classList.contains('expanded')) {
                // Collapse
                text.classList.remove('expanded');
                // بازگرداندن استایل محدودکننده
                text.style.display = '-webkit-box';
                text.style.webkitLineClamp = '4';
                text.style.webkitBoxOrient = 'vertical';
                text.style.overflow = 'hidden';
                const enText = span.getAttribute('data-en');
                const faText = span.getAttribute('data-fa');
                span.textContent = currentLanguage === 'en' ? enText : faText;
                icon.className = 'fas fa-chevron-down';
                this.classList.remove('expanded');
            } else {
                // Expand
                text.classList.add('expanded');
                // حذف محدودیت‌ها
                text.style.display = 'block';
                text.style.webkitLineClamp = 'unset';
                text.style.webkitBoxOrient = 'unset';
                text.style.overflow = 'visible';
                span.textContent = currentLanguage === 'en' ? 'See Less' : 'کمتر ببینید';
                icon.className = 'fas fa-chevron-up';
                this.classList.add('expanded');
            }
        });
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    themeToggle = document.getElementById('themeToggle');
    languageToggle = document.getElementById('languageToggle');
    menuToggle = document.getElementById('menuToggle');
    navMenu = document.querySelector('.nav-menu');
    mouseFollower = document.querySelector('.mouse-follower');
    mouseDot = document.querySelector('.mouse-dot');
    mouseTrail = document.querySelector('.mouse-trail');
    cursorText = document.querySelector('.cursor-text');

    // Initialize theme
    initTheme();
    initLanguage(); // Initialize language

    // Initialize all features
    initSmoothScrolling();
    initScrollAnimations();
    initParallax();
    initNavbarScroll();
    initContactForm();
    initTypingAnimation();
    initFloatingCards();
    initMagneticEffect();
    initParticleSystem();

    // Initialize mouse follower (only if elements exist and not on mobile)
    if (mouseFollower && mouseDot && mouseTrail && window.innerWidth > 768) {
        document.addEventListener('mousemove', updateMousePosition);
        animateMouseFollower();
    }

    // Initialize mouse effects (only on desktop)
    if (window.innerWidth > 768) {
        initMouseMoveEffects();
    }

    // Initialize about me parallax effects
    initAboutMeParallax();

    // Initialize skills view more functionality
    initSkillsViewMore();

    // Initialize mobile menu functionality
    initMobileMenu();

    // Event listeners (only if elements exist)
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }

    // Optimize scroll events
    const throttledParallax = throttle(initParallax, 16);
    const throttledNavbarScroll = throttle(initNavbarScroll, 16);

    window.addEventListener('scroll', throttledParallax);
    window.addEventListener('scroll', throttledNavbarScroll);

    // Load projects from API (only on main page)
    fetchProjectsFromAPI().then(renderProjects);

    // Load testimonials from API (only on main page)
    fetchTestimonialsFromAPI().then(renderTestimonials);

    // Load project details (only on project details page)
    if (window.location.pathname.includes('project-details.html')) {
        loadProjectDetails();
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    const viewMoreBtn = document.getElementById('viewMoreProjects');
    const viewLessBtn = document.getElementById('viewLessProjects');
    if (viewMoreBtn) {
        viewMoreBtn.onclick = function () {
            showingAll = true;
            updateProjectsView();
            updateViewMoreButtons();
        };
    }
    if (viewLessBtn) {
        viewLessBtn.onclick = function () {
            showingAll = false;
            updateProjectsView();
            updateViewMoreButtons();
            // Scroll to projects section if needed
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }
});

// View More Projects logic (with debug logs)
function initViewMoreProjects() {
    const viewMoreBtn = document.getElementById('viewMoreProjects');
    const viewLessBtn = document.getElementById('viewLessProjects');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    if (!viewMoreBtn || !viewLessBtn) return;
    if (hiddenProjects.length === 0) {
        viewMoreBtn.style.display = 'none';
        viewLessBtn.style.display = 'none';
        return;
    }
    // Hide hidden projects initially
    hiddenProjects.forEach(el => el.style.display = 'none');
    viewMoreBtn.style.display = 'inline-block';
    viewLessBtn.style.display = 'none';
    viewMoreBtn.onclick = function () {
        hiddenProjects.forEach(el => el.style.display = 'flex');
        viewMoreBtn.style.display = 'none';
        viewLessBtn.style.display = 'inline-block';
    };
    viewLessBtn.onclick = function () {
        hiddenProjects.forEach(el => el.style.display = 'none');
        viewMoreBtn.style.display = 'inline-block';
        viewLessBtn.style.display = 'none';
        // Scroll to projects section if needed
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
}

// Call this after DOMContentLoaded and after any dynamic project rendering
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initViewMoreProjects);
} else {
    initViewMoreProjects();
}

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .loading::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid var(--glass-border);
        border-top: 3px solid var(--accent-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);

// Add loading screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
document.body.appendChild(loadingScreen);

// Remove loading screen when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 1000);
});

// Project Details Page Functions
async function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        showProjectError('No project ID provided');
        return;
    }

    try {
        const [project, keyFeatures, gallery, technologies] = await Promise.all([
            projectAPI.fetchProjectById(projectId),
            projectAPI.fetchKeyFeatures(projectId),
            projectAPI.fetchProjectGallery(projectId),
            projectAPI.fetchTechnologies(projectId)
        ]);

        if (!project) {
            showProjectError('Project not found');
            return;
        }

        const formattedProject = projectAPI.formatProjectData(project);
        renderProjectDetails(formattedProject, keyFeatures, gallery, technologies);
    } catch (error) {
        console.error('Error loading project details:', error);
        showProjectError('Error loading project details');
    }
}

function renderProjectDetails(project, keyFeatures, gallery, technologies) {
    // Update page title
    document.title = `${project.title} - Aradazr`;

    // Update hero section
    updateProjectHero(project);

    // Update project overview
    updateProjectOverview(project);

    // Update key features
    updateKeyFeatures(keyFeatures);

    // Update technologies
    updateTechnologies(technologies);

    // Update gallery
    updateProjectGallery(gallery, project);

    // Update project info sidebar
    updateProjectInfo(project);
}

function updateProjectHero(project) {
    const heroTitle = document.querySelector('.project-title');
    const heroSubtitle = document.querySelector('.project-subtitle');
    const heroCategory = document.querySelector('.project-category');
    const previewImageContainer = document.getElementById('projectPreviewImage');

    if (heroTitle) {
        heroTitle.textContent = project.title;
        heroTitle.setAttribute('data-en', project.title);
        heroTitle.setAttribute('data-fa', project.title_fa);
    }

    if (heroSubtitle) {
        heroSubtitle.textContent = project.description;
        heroSubtitle.setAttribute('data-en', project.description);
        heroSubtitle.setAttribute('data-fa', project.description_fa);
    }

    if (heroCategory) {
        heroCategory.textContent = project.type;
        heroCategory.setAttribute('data-en', project.type);
        heroCategory.setAttribute('data-fa', project.type_fa);
    }

    if (previewImageContainer && project.images.full_page) {
        previewImageContainer.innerHTML = `
            <img src="${project.images.full_page}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="image-placeholder" style="display: none;">
                <i class="fas fa-image"></i>
            </div>
        `;
    }
}

function updateProjectOverview(project) {
    const overviewText = document.querySelector('.section-text');
    if (overviewText && project.project_overview) {
        overviewText.textContent = project.project_overview;
        overviewText.setAttribute('data-en', project.project_overview);
        overviewText.setAttribute('data-fa', project.project_overview_fa || project.project_overview);
    }
}

function updateKeyFeatures(features) {
    const featuresGrid = document.getElementById('keyFeaturesGrid');
    if (!featuresGrid) return;

    if (features.length === 0) {
        featuresGrid.innerHTML = '<p data-en="No features available" data-fa="هیچ ویژگی‌ای موجود نیست">No features available</p>';
        return;
    }

    const featuresHTML = features.map(feature => `
        <div class="feature-card">
            <div class="feature-icon">
                <img src="${projectAPI.getImageUrl('pbc_1786914914', feature.icon, feature.id)}" alt="${feature.title}" onerror="this.style.display='none'">
            </div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');

    featuresGrid.innerHTML = featuresHTML;
}

function updateTechnologies(technologies) {
    const techStack = document.getElementById('techStack');
    if (!techStack) return;

    if (technologies.length === 0) {
        techStack.innerHTML = '<p data-en="No technologies specified" data-fa="هیچ فناوری مشخص نشده">No technologies specified</p>';
        return;
    }

    const techCategories = {};
    technologies.forEach(tech => {
        if (!techCategories[tech.title]) {
            techCategories[tech.title] = [];
        }
        techCategories[tech.title].push(tech.options);
    });

    const techHTML = Object.entries(techCategories).map(([category, techs]) => `
        <div class="tech-category">
            <h3>${category}</h3>
            <div class="tech-tags">
                ${techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `).join('');

    techStack.innerHTML = techHTML;
}

function updateProjectGallery(gallery, project) {
    const galleryGrid = document.getElementById('projectGallery');
    if (!galleryGrid) return;

    if (gallery.length === 0) {
        galleryGrid.innerHTML = '<p data-en="No gallery images available" data-fa="هیچ تصویری در گالری موجود نیست">No gallery images available</p>';
        return;
    }

    const galleryHTML = gallery.map(item => `
        <div class="gallery-item" data-parallax="0.5">
            <div class="gallery-image">
                <img src="${projectAPI.getImageUrl('pbc_3094360337', item.image, item.id)}" alt="${item.title}" loading="lazy">
            </div>
            <div class="gallery-caption">${item.title}</div>
        </div>
    `).join('');

    galleryGrid.innerHTML = galleryHTML;
}

function updateProjectInfo(project) {
    const infoList = document.getElementById('projectInfoList');
    if (!infoList) return;

    const infoHTML = `
        <div class="info-item">
            <span class="info-label" data-en="Client:" data-fa="مشتری:">Client:</span>
            <span class="info-value">${project.client}</span>
        </div>
        <div class="info-item">
            <span class="info-label" data-en="Duration:" data-fa="مدت زمان:">Duration:</span>
            <span class="info-value">${project.duration}</span>
        </div>
        <div class="info-item">
            <span class="info-label" data-en="Team Size:" data-fa="اندازه تیم:">Team Size:</span>
            <span class="info-value">${project.team_size}</span>
        </div>
        <div class="info-item">
            <span class="info-label" data-en="Type:" data-fa="نوع:">Type:</span>
            <span class="info-value">${project.type}</span>
        </div>
    `;

    infoList.innerHTML = infoHTML;
}

function showProjectError(message) {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div class="project-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>${message}</h2>
                <a href="index.html" class="btn btn-primary" data-en="Back to Home" data-fa="بازگشت به خانه">Back to Home</a>
            </div>
        `;
    }
}

// Export functions for potential external use
window.RerterApp = {
    toggleTheme,
    showNotification,
    initParallax,
    loadProjectsFromAPI
};

// About Me Parallax Effects
function initAboutMeParallax() {
    const galleryItems = document.querySelectorAll('.gallery-item[data-parallax]');

    if (galleryItems.length === 0) return;

    // Start animations after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            galleryItems.forEach(item => {
                item.style.animationPlayState = 'running';
            });
        }, 1000); // Wait 1 second after page load
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        galleryItems.forEach(item => {
            const parallaxRate = parseFloat(item.getAttribute('data-parallax'));
            const yPos = -(scrolled * parallaxRate);
            item.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        galleryItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;

            const deltaX = (clientX - centerX) * 0.01;
            const deltaY = (clientY - centerY) * 0.01;

            const parallaxRate = parseFloat(item.getAttribute('data-parallax'));

            item.style.transform = `
                translateY(${deltaY * parallaxRate * 10}px)
                translateX(${deltaX * parallaxRate * 10}px)
                rotateY(${deltaX * parallaxRate * 2}deg)
                rotateX(${-deltaY * parallaxRate * 2}deg)
            `;
        });
    });
}

// Skills View More functionality
function initSkillsViewMore() {
    viewMoreSkillsBtn = document.getElementById('viewMoreSkills');
    viewLessSkillsBtn = document.getElementById('viewLessSkills');
    skillsGrid = document.querySelector('.skills-grid');

    if (!viewMoreSkillsBtn || !viewLessSkillsBtn || !skillsGrid) return;

    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Initially hide skills after the first 4
        const skillCards = skillsGrid.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            if (index >= 4) {
                card.style.display = 'none';
            }
        });

        // Show view more button
        viewMoreSkillsBtn.style.display = 'inline-block';
        viewLessSkillsBtn.style.display = 'none';
    } else {
        // On desktop, show all skills and hide buttons
        viewMoreSkillsBtn.style.display = 'none';
        viewLessSkillsBtn.style.display = 'none';
        const skillCards = skillsGrid.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.style.display = 'block';
        });
    }

    // Add event listeners
    viewMoreSkillsBtn.addEventListener('click', showAllSkills);
    viewLessSkillsBtn.addEventListener('click', hideExtraSkills);

    // Handle window resize
    window.addEventListener('resize', handleSkillsResize);
}

function showAllSkills() {
    const skillCards = skillsGrid.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.display = 'block';
    });

    viewMoreSkillsBtn.style.display = 'none';
    viewLessSkillsBtn.style.display = 'inline-block';

    // Add smooth animation
    skillsGrid.classList.add('expanded');
}

function hideExtraSkills() {
    const skillCards = skillsGrid.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        if (index >= 4) {
            card.style.display = 'none';
        }
    });

    viewMoreSkillsBtn.style.display = 'inline-block';
    viewLessSkillsBtn.style.display = 'none';

    // Remove expanded class
    skillsGrid.classList.remove('expanded');
}

function handleSkillsResize() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // On mobile, check if skills are expanded
        const isExpanded = skillsGrid.classList.contains('expanded');
        if (!isExpanded) {
            hideExtraSkills();
        }
    } else {
        // On desktop, show all skills
        const skillCards = skillsGrid.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.style.display = 'block';
        });
        viewMoreSkillsBtn.style.display = 'none';
        viewLessSkillsBtn.style.display = 'none';
    }
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
}