document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. GLOBAL VARIABLES
    // ==========================================
    const headerOffset = 120; // Adjusts for sticky navbar height
    
    // ==========================================
    // 2. LANGUAGE TOGGLE
    // ==========================================
    const languageToggle = document.getElementById('languageToggle');
    const savedLang = localStorage.getItem('clinicLanguage') || 'en';
    
    if (languageToggle) {
        languageToggle.value = savedLang;
        changeLanguage(savedLang);
        
        languageToggle.addEventListener('change', function() {
            const selectedLang = this.value;
            localStorage.setItem('clinicLanguage', selectedLang);
            changeLanguage(selectedLang);
        });
    }

    function changeLanguage(lang) {
        const elementsToTranslate = document.querySelectorAll('[data-en]');
        elementsToTranslate.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    // ==========================================
    // 3. UNIVERSAL SMOOTH SCROLL (LINKS)
    // ==========================================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // --- FIX: Targeting .nav-links to match HTML ---
            if (this.closest('.nav-links')) {
                document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
            
            smoothScrollTo(targetId);
        });
    });

    // ==========================================
    // 4. SCROLL SPY (Highlight Nav Menu)
    // ==========================================
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, header');
        
        // --- FIX: Targeting .nav-links to match HTML ---
        const navLinks = document.querySelectorAll('.nav-links a'); 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - headerOffset - 50)) {
                current = section.getAttribute('id');
            }
        });

        // Bottom of Page Check
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contact';
        }

        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ==========================================
    // 5. MOBILE MENU TOGGLE
    // ==========================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    // --- FIX: Targeting .nav-links to match HTML ---
    const navMenu = document.querySelector('.nav-links'); 
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Toggle the class instead of inline styles for cleaner code
            navMenu.classList.toggle('mobile-active');
            
            // Optional: Simple inline toggle if you prefer not adding CSS
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '70px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'white';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
            }
        });
    }
});

// ==========================================
// 6. HELPER FUNCTIONS
// ==========================================

function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    const headerOffset = 120; 

    if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

function scrollToBooking() {
    smoothScrollTo('#contact'); 
}

function scrollToContact() {
    smoothScrollTo('#contact');
}