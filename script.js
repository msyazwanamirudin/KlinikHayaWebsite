document.addEventListener('DOMContentLoaded', function() {
    
    // CONFIGURATION
    const headerOffset = 120; // Height of sticky navbar + buffer

    // ==========================================
    // 1. LANGUAGE TOGGLE
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
    // 2. SMOOTH SCROLL & ACTIVE STATE
    // ==========================================
    // Logic for ALL links starting with #
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // If it's a menu link, highlight it
            if (this.closest('.nav-links')) {
                document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
            
            smoothScrollTo(targetId);
        });
    });

    // ==========================================
    // 3. SCROLL SPY (Auto-highlight menu)
    // ==========================================
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-links a'); 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - headerOffset - 50)) {
                current = section.getAttribute('id');
            }
        });

        // "Bottom of Page" Check (For Contact)
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
    // 4. MOBILE MENU
    // ==========================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links'); 
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link inside it is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ==========================================
// 5. HELPER FUNCTIONS (Global)
// ==========================================

// Global smooth scroll function
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

// Linked to HTML buttons (Book Now / Contact)
function scrollToBooking() {
    smoothScrollTo('#contact'); 
}

function scrollToContact() {
    smoothScrollTo('#contact');
}
/* =========================================
   6. CONTENT PROTECTION (Speedbump)
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Create the Alert Bubble Dynamically
    const alertBox = document.createElement('div');
    alertBox.id = 'protection-alert';
    // Using a lock icon and simple text
    alertBox.innerHTML = '<i class="fas fa-lock"></i> <span>Content is protected</span>';
    document.body.appendChild(alertBox);

    // 2. Logic to Show/Hide Alert
    let timeout;
    function showProtectionAlert() {
        alertBox.classList.add('show');
        
        // Reset timer if triggered multiple times
        clearTimeout(timeout);
        
        // Hide after 2 seconds
        timeout = setTimeout(() => {
            alertBox.classList.remove('show');
        }, 2000);
    }

    // 3. Disable Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showProtectionAlert();
    });

    // 4. Disable Keyboard Shortcuts (Copy, Save, Inspect)
    document.addEventListener('keydown', (e) => {
        // F12 (Dev Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            showProtectionAlert();
        }
        
        // Ctrl+Shift+I (Inspect) or Ctrl+Shift+J (Console) or Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
            showProtectionAlert();
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showProtectionAlert();
        }

        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showProtectionAlert();
        }
    });
});