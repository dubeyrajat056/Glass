// ==================== MAIN JAVASCRIPT - TAITON HARDWARE ====================

// Initialize AOS Animation
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = '#1a1a2e';
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#' && targetId !== '#!' && targetId.length > 1) {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your inquiry! Our team will contact you shortly.');
        this.reset();
    });
}

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target') || stat.innerText);
            if (!isNaN(target) && target > 0) {
                let current = 0;
                const increment = target / 50;
                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.floor(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateNumber();
            }
        });
    };

    // Trigger when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) observer.observe(statsContainer);
}

// Set active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    } else if (currentPage === 'index.html' && href === 'index.html') {
        link.classList.add('active');
    } else if (currentPage === 'products.html' && href === 'products.html') {
        link.classList.add('active');
    } else if (currentPage === 'about.html' && href === 'about.html') {
        link.classList.add('active');
    } else if (currentPage === 'contact.html' && href === 'contact.html') {
        link.classList.add('active');
    } else if (currentPage === 'catalog.html' && href === 'catalog.html') {
        link.classList.add('active');
    }
});

// Dropdown menu handling for mobile
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
            e.preventDefault();
            const parent = this.parentElement;
            const menu = parent.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.toggle('show');
            }
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    if (window.innerWidth < 992) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    }
});

// Product Filter (if on products page)
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            productItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add back-to-top styles dynamically
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #ffd700;
        color: #1a1a2e;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: #ffed4a;
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);