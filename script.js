document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Animation
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    const loaderLine = document.getElementById('loader-line');
    const body = document.body;

    // Add loading class to prevent scrolling
    body.classList.add('loading');

    // Sequence of animations
    setTimeout(() => {
        // Fade in and move up text
        loaderText.classList.remove('opacity-0', 'translate-y-8');
        loaderText.classList.add('opacity-100', 'translate-y-0');
        
        setTimeout(() => {
            // Expand line
            loaderLine.classList.remove('w-0');
            loaderLine.classList.add('w-full', 'max-w-xs');
            
            setTimeout(() => {
                // Fade out loader
                loader.classList.add('loader-fade-out');
                body.classList.remove('loading');
                body.classList.remove('overflow-hidden'); // From Tailwind classes on body
                
                // Initialize AOS after loader finishes to prevent weird starting states
                AOS.init({
                    once: true,
                    offset: 50,
                    duration: 800,
                    easing: 'ease-out-cubic',
                });
            }, 1200); // Wait for line to expand
        }, 800); // Wait for text to appear
    }, 300); // Initial delay

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('nav-scrolled');
            navbar.classList.add('py-6');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            body.style.overflow = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
});

// WhatsApp Booking Integration
function sendToWhatsApp() {
    const name = document.getElementById('wa-name').value;
    const phone = document.getElementById('wa-phone').value;
    const date = document.getElementById('wa-date').value;
    const location = document.getElementById('wa-location').value;
    const service = document.getElementById('wa-service').value;
    const vehicle = document.getElementById('wa-vehicle').value;
    const message = document.getElementById('wa-message').value;

    if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
    }

    const whatsappNumber = '918848002365';
    const text = `Hello ESPANA TOURS,%0A%0A*New Booking Request:*%0A- *Name:* ${name}%0A- *Phone:* ${phone}%0A- *Date:* ${date || 'Not specified'}%0A- *Pickup Location:* ${location || 'Not specified'}%0A- *Service Required:* ${service}%0A- *Vehicle Preference:* ${vehicle}%0A- *Message:* ${message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');
}

