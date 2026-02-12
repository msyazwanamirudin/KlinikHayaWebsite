AOS.init({ duration: 800, once: true });

// --- Navbar Scroll Effect & ScrollSpy ---
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function () {
    const nav = document.querySelector('.navbar');
    // Scrolled Effect
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    // ScrollSpy Logic
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active-nav');
        }
    });

    // Back To Top Visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// --- Back To Top Logic ---
document.getElementById('backToTop').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Typing Effect (Simple) ---
const words = ["Your Family", "Your Future", "Your Baby", "Your Health"];
let i = 0;

function typeWriter() {
    const element = document.getElementById("typewriter");
    // Simple rotation for demo purposes
    setInterval(() => {
        i = (i + 1) % words.length;
        element.style.opacity = 0;
        setTimeout(() => {
            element.innerHTML = words[i];
            element.style.opacity = 1;
        }, 500);
    }, 3000);
}
document.getElementById("typewriter").style.transition = "opacity 0.5s";
typeWriter();

// --- LIVE STATUS LOGIC (Static Workaround) ---
function updateLiveStatus() {
    const now = new Date();
    const hour = now.getHours();
    const statusText = document.getElementById('liveStatusText');
    const statusDot = document.getElementById('liveStatusDot');

    // Clinic Hours: Mon-Sat 9AM - 10PM, Sun 9AM - 2PM (Example)
    const isOpen = hour >= 9 && hour < 22;

    if (isOpen) {
        statusText.innerHTML = "Clinic Open (Queue: <span class='text-success'>Normal</span>)";
        statusDot.style.backgroundColor = "#22c55e"; // Green
        statusDot.style.boxShadow = "0 0 10px #22c55e";
    } else {
        statusText.innerHTML = "Clinic Closed (Opens 9:00 AM)";
        statusDot.style.backgroundColor = "#ef4444"; // Red
        statusDot.style.boxShadow = "none";
        statusDot.style.animation = "none";
    }
}
updateLiveStatus();
setInterval(updateLiveStatus, 60000);


// --- WHATSAPP BOOKING LOGIC (With Confirmation) ---
function bookViaWhatsApp(serviceName, details = "") {
    // Confirmation
    const confirmAction = confirm("We are redirecting you to WhatsApp to complete your booking securely. Continue?");

    if (!confirmAction) return;

    const phone = "60172032048";
    let message = `Hi Klinik Haya, I would like to book an appointment.`;

    if (serviceName) {
        message += `\nService: ${serviceName}`;
    }
    if (details) {
        message += `\nDetails: ${details}`;
    }

    message += `\n\nCould you please let me know the available slots?`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// --- Chat Bot Logic (Advanced) ---
let chatState = {
    step: 0,
    flow: null, // 'dengue', 'fever', 'general'
    answers: []
};

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    if (chat.style.display === 'flex') {
        chat.style.display = 'none';
    } else {
        chat.style.display = 'flex';
        // Reset if opening effectively for first time? No, keep history.
    }
}

function addMessage(text, isUser = false) {
    const chatBody = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = isUser ? 'msg msg-user' : 'msg msg-bot';
    div.innerHTML = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTyping() {
    const chatBody = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.id = 'typingIndicator';
    div.className = 'msg msg-bot';
    div.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// Main Logic
function handleUserChoice(choice) {
    // Remove old options
    const qr = document.getElementById('quickReplies');
    if (qr) qr.remove();

    // User Message
    addMessage(choice, true);

    // Bot Thinking
    showTyping();

    setTimeout(() => {
        removeTyping();
        processChatFlow(choice);
    }, 800);
}

function processChatFlow(choice) {
    // 1. Initial Selection
    if (chatState.flow === null) {
        if (choice === 'Check Symptoms') {
            addMessage("I can help assess your condition. What seems to be the main issue?");
            addQuickReplies(['High Fever (Dengue?)', 'General Fever/Flu', 'Other Symptoms']);
        } else if (choice === 'High Fever (Dengue?)') {
            startFlow('dengue');
        } else if (choice === 'General Fever/Flu') {
            startFlow('fever');
        } else if (choice === 'Other Symptoms') {
            startFlow('general');
        } else if (choice === 'Book Appointment') {
            bookViaWhatsApp('General Booking');
        } else if (choice === 'Fertility Info') {
            addMessage("Dr. Alia is our fertility expert. Connect with us for a Follicle Scan (RM60).");
            addQuickReplies(['Book Scan', 'Chat with Specialist']);
        } else if (choice === 'Book Scan') {
            bookViaWhatsApp('Follicle Scan');
        } else if (choice === 'Chat with Specialist') {
            bookViaWhatsApp('Fertility Inquiry');
        } else {
            // Reset / Default
            addMessage("How can I help you today?");
            addQuickReplies(['Check Symptoms', 'Book Appointment', 'Fertility Info']);
        }
        return;
    }

    // 2. In-Flow Logic
    chatState.answers.push(choice);
    chatState.step++;
    nextQuestion();
}

function startFlow(flowType) {
    chatState.flow = flowType;
    chatState.step = 0;
    chatState.answers = [];
    nextQuestion();
}

function nextQuestion() {
    const step = chatState.step;
    const flow = chatState.flow;

    // --- DENGUE FLOW ---
    if (flow === 'dengue') {
        const questions = [
            "Do you have a sudden high fever (taken via thermometer)?",
            "Are you experiencing severe headache or pain behind the eyes?",
            "Do you feel severe joint and muscle pain?",
            "Have you noticed any skin rash or red spots?",
            "Any bleeding from the nose or gums?"
        ];

        if (step < questions.length) {
            addMessage(questions[step]);
            addQuickReplies(['Yes', 'No']);
        } else {
            finishFlow("Dengue Check");
        }
    }

    // --- FEVER FLOW ---
    else if (flow === 'fever') {
        const questions = [
            "How long have you had the fever?",
            "Is the fever above 38°C?",
            "Do you have a cough or sore throat?",
            "Are you experiencing difficulty breathing?",
            "Are you able to eat and drink normally?"
        ];

        const options = [
            ['< 2 Days', '> 3 Days'],
            ['Yes', 'No'],
            ['Yes', 'No'],
            ['Yes', 'No'],
            ['Yes', 'No']
        ];

        if (step < questions.length) {
            addMessage(questions[step]);
            addQuickReplies(options[step]);
        } else {
            finishFlow("Fever Check");
        }
    }

    // --- GENERAL FLOW ---
    else if (flow === 'general') {
        const questions = [
            "Are you in severe pain right now (Scale 7-10)?",
            "Do you have any known drug allergies?",
            "Have you taken any medication for this today?",
            "Is this a recurring issue?",
            "Are you pregnant or breastfeeding?"
        ];

        if (step < questions.length) {
            addMessage(questions[step]);
            addQuickReplies(['Yes', 'No']);
        } else {
            finishFlow("General Assessment");
        }
    }
}

function finishFlow(flowName) {
    addMessage("Thank you. Based on your answers, we recommend assessing this in person.");
    addMessage("I have prepared your report. Click below to send it to our doctor via WhatsApp and book a priority slot.");

    // Construct Report
    let report = `*AI Assessment Report: ${flowName}*\n`;
    chatState.answers.forEach((ans, i) => {
        report += `Q${i + 1}: ${ans}\n`;
    });

    // Reset State
    chatState.flow = null;
    chatState.step = 0;
    chatState.answers = [];

    // Custom Button for Final Action
    const chatBody = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = 'quick-replies';
    div.id = 'quickReplies';

    const btn = document.createElement('div');
    btn.className = 'chip';
    btn.style.background = '#0F766E';
    btn.style.color = 'white';
    btn.innerText = "📅 Book with Report";
    btn.onclick = () => bookViaWhatsApp('AI Assessment', report);

    div.appendChild(btn);
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addQuickReplies(options) {
    const chatBody = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = 'quick-replies';
    div.id = 'quickReplies';

    options.forEach(opt => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.innerText = opt;
        chip.onclick = () => handleUserChoice(opt);
        div.appendChild(chip);
    });

    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}