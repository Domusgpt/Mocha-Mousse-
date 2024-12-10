// Secret code handling
let code = '';
const secretCode = '7373';

document.getElementById('keypad').addEventListener('click', (e) => {
    const cell = e.target.closest('.coin-cell');
    if (!cell) return;
    
    const value = cell.getAttribute('data-value');
    code += value;
    
    // Visual feedback
    cell.style.transform = 'scale(0.95)';
    setTimeout(() => {
        cell.style.transform = '';
    }, 100);
    
    // Keep last 4 digits
    if (code.length > 4) {
        code = code.slice(-4);
    }
    
    // Check code
    if (code === secretCode) {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('emailForm').style.display = 'block';
        code = '';
    }
});

// Form handling
function toggleContactInput() {
    const contactInput = document.getElementById('contactInput');
    const isEmail = document.getElementById('emailChoice').checked;
    contactInput.placeholder = isEmail ? 
        "Enter your email address" : 
        "Enter your Instagram handle";
}

function submitForm() {
    const isEmail = document.getElementById('emailChoice').checked;
    const contactValue = document.getElementById('contactInput').value;
    const contactType = isEmail ? 'Email' : 'Instagram';
    
    if (!contactValue) {
        alert('Please enter your contact information');
        return;
    }

    const message = `New Winner!\nContact Type: ${contactType}\nContact: ${contactValue}`;
    const mailtoLink = `mailto:phillips.paul.email@gmail.com?subject=New Mocha MousseCotY Winner!&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    
    // Hide form
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('emailForm').style.display = 'none';
}

// Close form when clicking overlay
document.getElementById('overlay').addEventListener('click', (e) => {
    if (e.target.id === 'overlay') {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('emailForm').style.display = 'none';
    }
});

// Countdown timer
function updateCountdown() {
    const targetDate = new Date('December 22, 2024 20:00:00 EST');
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = "IT'S TIME!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const formatNumber = (num) => num < 10 ? `0${num}` : num;

    document.getElementById('countdown').innerHTML = 
        `${days}d ${formatNumber(hours)}h ${formatNumber(minutes)}m ${formatNumber(seconds)}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
