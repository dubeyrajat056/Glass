// ==================== MAIN JAVASCRIPT - TAITON/ENGIS HARDWARE ====================

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
            navbar.style.background = '#1a3a5c';
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #1a3a5c 0%, #2c5f8a 100%)';
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
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

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
    }
});

// ==================== DROPDOWN FIX FOR MOBILE & DESKTOP ====================
(function () {
    // Function to check if element is overflowing the viewport
    function isOverflowing(element) {
        const rect = element.getBoundingClientRect();
        return rect.right > window.innerWidth || rect.left < 0;
    }

    // Function to position dropdown properly
    function positionDropdown(menu, toggle) {
        if (!menu || !toggle) return;

        const toggleRect = toggle.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();

        // Reset any inline styles
        menu.style.left = '';
        menu.style.right = '';
        menu.style.transform = '';

        // Check if menu overflows on the right
        if (toggleRect.left + menuRect.width > window.innerWidth - 15) {
            // Align to the right
            menu.style.left = 'auto';
            menu.style.right = '0';
        } else {
            // Align to the left
            menu.style.left = '0';
            menu.style.right = 'auto';
        }

        // For mega menu on desktop
        if (menu.classList.contains('mega-menu') && window.innerWidth > 992) {
            const centerOffset = (menuRect.width / 2) - (toggleRect.width / 2);
            if (toggleRect.left - centerOffset < 0) {
                menu.style.left = '0';
                menu.style.right = 'auto';
                menu.style.transform = 'none';
            } else if (toggleRect.left + menuRect.width > window.innerWidth) {
                menu.style.left = 'auto';
                menu.style.right = '0';
                menu.style.transform = 'none';
            } else {
                menu.style.left = '50%';
                menu.style.right = 'auto';
                menu.style.transform = 'translateX(-50%)';
            }
        }
    }

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {
        // Get all dropdown elements
        const dropdownElements = document.querySelectorAll('.dropdown');

        // For desktop - position mega menu properly
        if (window.innerWidth > 992) {
            dropdownElements.forEach(function (dropdown) {
                const toggle = dropdown.querySelector('.dropdown-toggle');
                const menu = dropdown.querySelector('.mega-menu');

                if (toggle && menu) {
                    toggle.addEventListener('mouseenter', function () {
                        setTimeout(function () {
                            positionDropdown(menu, toggle);
                        }, 10);
                    });
                }
            });
        }

        // For mobile - handle clicks
        dropdownElements.forEach(function (dropdown) {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu, .mega-menu');

            if (toggle && menu) {
                // Handle click on toggle
                toggle.addEventListener('click', function (e) {
                    if (window.innerWidth < 992) {
                        e.preventDefault();
                        e.stopPropagation();

                        // Close all other dropdowns
                        dropdownElements.forEach(function (other) {
                            if (other !== dropdown) {
                                other.classList.remove('show');
                                const otherMenu = other.querySelector('.dropdown-menu, .mega-menu');
                                if (otherMenu) otherMenu.classList.remove('show');
                            }
                        });

                        // Toggle current dropdown
                        dropdown.classList.toggle('show');
                        menu.classList.toggle('show');
                    }
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function (e) {
            if (window.innerWidth < 992) {
                if (!e.target.closest('.dropdown')) {
                    dropdownElements.forEach(function (dropdown) {
                        dropdown.classList.remove('show');
                        const menu = dropdown.querySelector('.dropdown-menu, .mega-menu');
                        if (menu) menu.classList.remove('show');
                    });
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth > 992) {
                // Reset all dropdowns on desktop
                dropdownElements.forEach(function (dropdown) {
                    dropdown.classList.remove('show');
                    const menu = dropdown.querySelector('.dropdown-menu, .mega-menu');
                    if (menu) menu.classList.remove('show');
                });

                // Re-position mega menus
                dropdownElements.forEach(function (dropdown) {
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    const menu = dropdown.querySelector('.mega-menu');
                    if (toggle && menu) {
                        positionDropdown(menu, toggle);
                    }
                });
            }
        });

        // Initial positioning for mega menus
        setTimeout(function () {
            dropdownElements.forEach(function (dropdown) {
                const toggle = dropdown.querySelector('.dropdown-toggle');
                const menu = dropdown.querySelector('.mega-menu');
                if (toggle && menu && window.innerWidth > 992) {
                    positionDropdown(menu, toggle);
                }
            });
        }, 100);
    });
})();

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

// Add back-to-top styles
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #d4a835;
        color: #fff;
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
        background: #c49b2e;
        transform: translateY(-3px);
    }
`;
document.head.appendChild(backToTopStyle);