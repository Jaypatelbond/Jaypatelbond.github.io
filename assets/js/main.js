/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== DARK MODE TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
        localStorage.setItem('theme', 'light');
    }
});

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction(){
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  
  /*Remove menu mobile*/
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));



/*===== SMOOTH SCROLLING =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if(href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/*===== HEADER SHADOW ON SCROLL =====*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('.l-header');
    if(window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 1px 4px rgba(146,161,176,.15)';
    }
});

/*===== TYPING EFFECT FOR NAME =====*/
const roles = [
    "Android Developer",
    "Software Engineer",
    "Cloud Enthusiast",
    "Technical Writer",
    "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typing-text');

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeRole, typingSpeed);
}

// Start typing effect after page load
setTimeout(typeRole, 1000);

/*===== FETCH MEDIUM BLOGS =====*/
async function fetchMediumBlogs() {
    const blogContainer = document.getElementById('blog-container');
    const mediumUsername = 'Jaypatelbond';
    
    try {
        // Using RSS2JSON API to convert Medium RSS to JSON
        const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            // Get first 6 articles
            const articles = data.items.slice(0, 6);
            
            blogContainer.innerHTML = articles.map(article => {
                // Extract thumbnail image from content
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = article.description;
                const img = tempDiv.querySelector('img');
                const thumbnail = img ? img.src : 'assets/img/blog-placeholder.jpg';
                
                // Clean excerpt
                const excerpt = tempDiv.textContent.substring(0, 150) + '...';
                
                // Format date
                const date = new Date(article.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                // Extract categories/tags
                const tags = article.categories ? article.categories.slice(0, 3) : [];
                
                return `
                    <article class="blog__card">
                        <div class="blog__image-container">
                            <img src="${thumbnail}" alt="${article.title}" class="blog__image" onerror="this.src='assets/img/blog-placeholder.jpg'">
                            <div class="blog__image-overlay"></div>
                        </div>
                        <div class="blog__content">
                            <div class="blog__meta">
                                <span class="blog__date">
                                    <i class='bx bx-calendar'></i>
                                    ${date}
                                </span>
                                <span class="blog__read-time">
                                    <i class='bx bx-time-five'></i>
                                    5 min read
                                </span>
                            </div>
                            <h3 class="blog__title">${article.title}</h3>
                            <p class="blog__excerpt">${excerpt}</p>
                            ${tags.length > 0 ? `
                                <div class="blog__tags">
                                    ${tags.map(tag => `<span class="blog__tag">${tag}</span>`).join('')}
                                </div>
                            ` : ''}
                            <div class="blog__footer">
                                <span class="blog__claps">
                                    <i class='bx bx-heart'></i>
                                    <span>Medium</span>
                                </span>
                                <a href="${article.link}" target="_blank" class="blog__link">
                                    Read More
                                    <i class='bx bx-right-arrow-alt'></i>
                                </a>
                            </div>
                        </div>
                    </article>
                `;
            }).join('');
            

        } else {
            showBlogError();
        }
    } catch (error) {
        console.error('Error fetching Medium blogs:', error);
        showBlogError();
    }
}

function showBlogError() {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = `
        <div class="blog__error">
            <i class='bx bx-error-circle'></i>
            <p>Unable to load articles at the moment.</p>
            <a href="https://medium.com/@Jaypatelbond" target="_blank" class="button">
                Visit Medium Profile
            </a>
        </div>
    `;
}

/*===== CONTACT FORM HANDLING =====*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:Jaypatelbond7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Optional: Reset form after a delay
        setTimeout(() => {
            contactForm.reset();
        }, 1000);
    });
}

/*===== REMOVE OLD TYPING EFFECT =====*/
// Removed the old typing effect code for home__title-color

/*===== PROJECT CARDS INTERACTION =====*/
const projectCards = document.querySelectorAll('.project__card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

/*===== PARALLAX EFFECT ON SCROLL =====*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home__img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/*===== ADD ANIMATE CLASS ON SCROLL =====*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

console.log('Portfolio animations loaded successfully! 🚀');

// Load blogs when page loads and animate project cards
window.addEventListener('load', () => {
    fetchMediumBlogs();
    

});


