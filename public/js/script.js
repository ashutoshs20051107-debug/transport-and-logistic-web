/**
 * TransportLogix Main JavaScript
 * Handles: Mobile Navigation, Stats Animation, and Shipment Tracking
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE NAVBAR TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const menuClose = document.getElementById('menu-close');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.add('active');
            // Prevent scrolling when menu is open
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose && navMenu) {
        menuClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // Restore scrolling
            document.body.style.overflow = 'auto';
        });
    }

    // Close menu when clicking on a nav link (important for mobile UX)
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });


    // --- 2. STATS COUNTER ANIMATION ---
    const counters = document.querySelectorAll('.count');
    const speed = 200; // The lower the number, the faster the count

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calculate increment
                const inc = target / speed;

                if (count < target) {
                    // Update text with incremented value
                    counter.innerText = Math.ceil(count + inc);
                    // Call the function again after a short delay
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to start animation only when section is visible
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }


    // --- 3. SHIPMENT TRACKING LOGIC ---
    // This is globally scoped so the onclick attribute in HTML can find it
    window.trackShipment = function() {
        const input = document.getElementById('trackingInput');
        const resultBox = document.getElementById('trackingResult');
        
        if (!input || !resultBox) return;

        const id = input.value.trim();
        
        if (id) {
            // Fill demo data
            document.getElementById('trackId').innerText = id;
            document.getElementById('trackStatus').innerText = "In Transit";
            document.getElementById('trackLocation').innerText = "Mumbai Distribution Hub";
            document.getElementById('trackDate').innerText = "Expected by Jan 20, 2026";
            
            // Show the result section
            resultBox.style.display = 'block';
            
            // Smooth scroll to results
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alert("Please enter a valid Tracking ID (e.g., TLX12345)");
        }
    };


    // --- 4. SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});