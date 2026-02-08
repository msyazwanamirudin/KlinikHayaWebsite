document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }

    // --- Language Toggle ---
    const languageToggle = document.getElementById('languageToggle');
    const savedLang = localStorage.getItem('language') || 'en';
    languageToggle.value = savedLang;
    updateLanguage(savedLang);

    languageToggle.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('language', lang);
        updateLanguage(lang);
    });

    function updateLanguage(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    // --- Booking Logic (WhatsApp) ---
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(bookingForm);
            const name = formData.get('fullName');
            const service = formData.get('service');
            const message = formData.get('message');

            const text = `Hello Klinik Haya!%0A%0AI would like to enquire/book:%0A%0A*Name:* ${name}%0A*Service:* ${service}%0A*Message:* ${message}`;
            
            // Redirect to WhatsApp
            window.open(`https://wa.me/60123499793?text=${text}`, '_blank');
        });
    }
});

// --- Helper Functions ---
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function sendWhatsAppBooking() {
    window.open(`https://tr.ee/89qO7wBrzD`, '_blank');
}