/**
 * Main JavaScript for Jay Patel Portfolio
 * Built with Motion.js for smooth animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Console Branding
    console.log('%c Jay Patel Portfolio ', 'background: linear-gradient(135deg, #8b5cf6, #22d3ee); color: white; font-size: 14px; padding: 8px 16px; border-radius: 8px; font-weight: bold;');
    console.log('Built with ❤️ and Motion.js animations');

    // Motion.js Fallback Check
    const { animate, stagger, inView, scroll, spring } = window.Motion || {};

    /*==================== 1. MOBILE MENU TOGGLE ====================*/
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId);
        const nav = document.getElementById(navId);
        if (toggle && nav) {
            toggle.addEventListener('click', () => nav.classList.toggle('show'));
        }
    };
    showMenu('nav-toggle', 'nav-menu');

    /*==================== 2. THEME TOGGLE ====================*/
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const darkTheme = 'dark-mode';
    const lightTheme = 'light-mode';
    const iconTheme = 'bx-sun'; // When light mode is active, show sun

    // Previously selected topic (if user selected)
    const selectedTheme = localStorage.getItem('theme');
    
    // We obtain the current theme that the interface has by validating the light-mode class
    const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark';
    const getCurrentIcon = () => themeIcon.classList.contains('bx-sun') ? 'bx-sun' : 'bx-moon';

    // Validate if the user previously chose a topic
    if (selectedTheme) {
        if (selectedTheme === 'light') {
            document.body.classList.add(lightTheme);
            if (themeIcon) {
                themeIcon.classList.remove('bx-moon');
                themeIcon.classList.add('bx-sun');
            }
        } else {
            document.body.classList.remove(lightTheme);
            if (themeIcon) {
                themeIcon.classList.remove('bx-sun');
                themeIcon.classList.add('bx-moon');
            }
        }
    }

    // Activate / deactivate the theme manually with the button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle(lightTheme);
            
            if (themeIcon) {
                if (document.body.classList.contains(lightTheme)) {
                    themeIcon.classList.remove('bx-moon');
                    themeIcon.classList.add('bx-sun');
                } else {
                    themeIcon.classList.remove('bx-sun');
                    themeIcon.classList.add('bx-moon');
                }
                
                // Animate icon if Motion is available
                if (animate) {
                    animate(themeIcon, { rotate: [0, 360] }, { duration: 0.5 });
                }
            }
            
            localStorage.setItem('theme', getCurrentTheme());
        });
    }

    /*==================== 3. ACTIVE NAVIGATION LINK ON SCROLL ====================*/
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActive);

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(n => n.addEventListener('click', () => {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('show');
        }
    }));

    /*==================== 4. HEADER SHADOW ON SCROLL ====================*/
    const scrollHeader = () => {
        const nav = document.querySelector('.l-header');
        if (nav) {
            if (window.scrollY >= 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    };
    window.addEventListener('scroll', scrollHeader);

    /*==================== 12. SMOOTH SCROLLING ====================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /*==================== 5. HERO ENTRANCE ANIMATION ====================*/
    if (animate) {
        // Animate hero elements in sequence with blur effect
        const heroElements = [
            '.hero__badge',
            '.hero__name', 
            '.hero__roles',
            '.hero__description',
            '.hero__buttons',
            '.hero__social'
        ];
        
        heroElements.forEach((selector, i) => {
            const el = document.querySelector(selector);
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.filter = 'blur(10px)';
                
                animate(el, 
                    { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
                    { duration: 0.8, delay: 0.2 + (i * 0.15), easing: [0.2, 0.6, 0.2, 1] }
                );
            }
        });
        
        // Hero visual pop in
        const heroVisual = document.querySelector('.hero__visual');
        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'scale(0.9) translateY(30px)';
            animate(heroVisual,
                { opacity: 1, transform: 'scale(1) translateY(0px)' },
                { duration: 1, delay: 0.6, easing: [0.2, 0.6, 0.2, 1] }
            );
        }
    }

    /*==================== 6. SCROLL-TRIGGERED SECTION ANIMATIONS ====================*/
    if (inView && animate) {
        // Animate section headers on scroll
        document.querySelectorAll('.section-header').forEach(header => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(30px)';
            
            inView(header, () => {
                animate(header,
                    { opacity: 1, transform: 'translateY(0px)' },
                    { duration: 0.8, easing: [0.2, 0.6, 0.2, 1] }
                );
            }, { margin: '-100px' });
        });
        
        // Animate cards with stagger effect
        const cardGroups = [
            '.about__card',
            '.skill-category',
            '.project__card',
            '.contact__card'
        ]; // Blogs will be handled separately after fetch
        
        cardGroups.forEach(selector => {
            const cards = document.querySelectorAll(selector);
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
                
                inView(card, () => {
                    animate(card,
                        { opacity: 1, transform: 'translateY(0px)' },
                        { duration: 0.6, delay: 0.1 * index, easing: [0.2, 0.6, 0.2, 1] }
                    );
                }, { margin: '-50px' });
            });
        });
    }

    /*==================== 15. INTERSECTION OBSERVER FALLBACK ====================*/
    if (!animate) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Add basic fallback styles in case CSS isn't handling it
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
        
        document.querySelectorAll('.animate-on-scroll, .section-header, .about__card, .skill-category, .project__card, .contact__card, .hero__greeting, .hero__name, .hero__roles, .hero__buttons, .hero__social, .hero__image').forEach(el => {
            if (el) {
                // Ensure initial state for fallback
                el.style.opacity = '0';
                observer.observe(el);
            }
        });
    }

    /*==================== 7. 3D CARD TILT EFFECT ON PROJECT CARDS ====================*/
    document.querySelectorAll('.project__card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8; // max 8 degrees
            const rotateY = (x - centerX) / centerX * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.6, 0.2, 1)';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });
    });

    /*==================== 8. MAGNETIC HOVER EFFECT ====================*/
    const magneticElements = document.querySelectorAll('.hero__social-link, .footer__social-link, .btn');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.6, 0.2, 1)';
            setTimeout(() => { el.style.transition = ''; }, 400);
        });
    });

    /*==================== 9. TYPING EFFECT ====================*/
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const roles = [
            'Android Developer',
            'Software Engineer', 
            'Cloud Enthusiast',
            'Technical Writer',
            'Problem Solver'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeEffect = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typingSpeed = isDeleting ? 40 : 80;
            
            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2500; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before next word
            }
            
            setTimeout(typeEffect, typingSpeed);
        };
        
        // Start typing effect
        setTimeout(typeEffect, 1500); // Initial delay
    }

    /*==================== 13. PARALLAX EFFECT ON HERO IMAGE ====================*/
    const heroImage = document.querySelector('.hero__image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroSection = document.getElementById('home');
            
            if (heroSection && scrollY <= heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        });
    }

    /*==================== 16. SKILL CARD HOVER ENHANCEMENT ====================*/
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /*==================== 11. CONTACT FORM HANDLING ====================*/
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Subtle animation on submit
            if (submitBtn) {
                submitBtn.style.transform = 'scale(0.95)';
                setTimeout(() => submitBtn.style.transform = '', 150);
            }
            
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const subjectEl = document.getElementById('subject');
            const messageEl = document.getElementById('message');

            const name = nameEl ? nameEl.value : '';
            const email = emailEl ? emailEl.value : '';
            const subject = subjectEl ? subjectEl.value : '';
            const message = messageEl ? messageEl.value : '';
            
            // Google Analytics Event for Contact Form Submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'contact',
                    'event_label': subject || 'Contact Form Submission',
                    'value': 1
                });
                gtag('event', 'generate_lead', {
                    'event_category': 'engagement',
                    'event_label': 'Contact Form'
                });
            }

            const mailtoLink = `mailto:jaypatelbond@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 150);
        });
    }

    /*==================== 14. ANALYTICS TRACKING ====================*/
    const resumeButton = document.getElementById('resume-button');
    if (resumeButton) {
        resumeButton.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'resume_download', {
                    'event_category': 'engagement',
                    'event_label': 'MyResume.pdf'
                });
            }
        });
    }
});

/*==================== 10. FETCH MEDIUM BLOGS ====================*/
window.addEventListener('load', () => {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    const mediumUsername = '@jaypatelbond'; // Replace with actual username if different
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumUsername}`;
    
    // Fallback data if API fails or rate limited
    const fallbackBlogs = [
        {
            title: "Getting Started with Jetpack Compose",
            pubDate: "2023-10-15",
            thumbnail: "assets/img/blog-1.jpg",
            description: "<p>A comprehensive guide to building modern Android UIs with Jetpack Compose...</p>",
            categories: ["Android", "Compose", "Kotlin"],
            link: "#"
        },
        {
            title: "Mastering Kotlin Coroutines",
            pubDate: "2023-08-22",
            thumbnail: "assets/img/blog-2.jpg",
            description: "<p>Learn how to handle asynchronous operations efficiently using Kotlin Coroutines in your Android applications...</p>",
            categories: ["Kotlin", "Coroutines", "Async"],
            link: "#"
        },
        {
            title: "Clean Architecture in Android",
            pubDate: "2023-05-10",
            thumbnail: "assets/img/blog-3.jpg",
            description: "<p>Implementing Clean Architecture principles to build scalable and maintainable Android applications...</p>",
            categories: ["Architecture", "Android", "Design Patterns"],
            link: "#"
        }
    ];

    const renderBlogs = (items) => {
        blogContainer.innerHTML = '';
        
        // Take only the first 3 blogs
        const recentItems = items.slice(0, 3);
        
        recentItems.forEach((item, index) => {
            // Extract excerpt from description
            let excerpt = '';
            const pMatch = item.description.match(/<p>(.*?)<\/p>/);
            if (pMatch && pMatch[1]) {
                excerpt = pMatch[1].replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';
            } else {
                excerpt = item.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';
            }

            // Format date
            const pubDate = new Date(item.pubDate);
            const formattedDate = pubDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Generate tags HTML
            const tagsHtml = item.categories.slice(0, 3).map(tag => 
                `<span class="blog__tag">${tag}</span>`
            ).join('');

            const articleHtml = `
                <article class="blog__card animate-on-scroll">
                    <div class="blog__image-container">
                        <img src="${item.thumbnail}" alt="${item.title}" class="blog__image" onerror="this.src='assets/img/blog-placeholder.jpg'">
                        <div class="blog__image-overlay"></div>
                    </div>
                    <div class="blog__content">
                        <div class="blog__meta">
                            <span class="blog__date"><i class='bx bx-calendar'></i> ${formattedDate}</span>
                            <span class="blog__read-time"><i class='bx bx-time-five'></i> 5 min read</span>
                        </div>
                        <h3 class="blog__title">${item.title}</h3>
                        <p class="blog__excerpt">${excerpt}</p>
                        <div class="blog__tags">${tagsHtml}</div>
                        <div class="blog__footer">
                            <span class="blog__claps"><i class='bx bx-heart'></i><span>Medium</span></span>
                            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="blog__link">Read More <i class='bx bx-right-arrow-alt'></i></a>
                        </div>
                    </div>
                </article>
            `;
            
            blogContainer.innerHTML += articleHtml;
        });

        // Apply animations to newly created blog cards
        const { animate, inView } = window.Motion || {};
        
        if (inView && animate) {
            const blogCards = document.querySelectorAll('.blog__card');
            blogCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
                
                inView(card, () => {
                    animate(card,
                        { opacity: 1, transform: 'translateY(0px)' },
                        { duration: 0.6, delay: index * 0.1, easing: [0.2, 0.6, 0.2, 1] }
                    );
                }, { margin: '-50px' });
            });
        } else {
            // Intersection Observer fallback for dynamically added elements
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
            
            document.querySelectorAll('.blog__card').forEach(el => {
                el.style.opacity = '0';
                observer.observe(el);
            });
        }
    };

    // Fetch from Medium API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok' && data.items.length > 0) {
                renderBlogs(data.items);
            } else {
                renderBlogs(fallbackBlogs);
            }
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
            renderBlogs(fallbackBlogs);
        });
});
