import { popupContents } from './textContent.js';

// toggle icon navbar
{
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }
}

// scroll sections active link
{
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    window.onscroll = () => {
        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) activeLink.classList.add('active');
            }
        });

        // sticky navbar
        header.classList.toggle('sticky', top > 100);

        // remove toggle icon and navbar on scroll
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
}

// ========== scroll reveal ==========
{
    ScrollReveal({
        //reset: true,
        distance: '80px',
        duration: 2000,
        delay: 100
    });
    
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
}

// ========== Typed ==========
{
    var typed = new Typed('.multiple-text', {
        strings: ['Quality Assurance Engineer', 'Bug Hunter', 'Automation Enthusiast', 'Novel Reader', 'Badminton Player'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

// ========== Email ==========
{
window.onload = function () {
    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault(); // prevent page refresh

        let params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            number: document.getElementById("number").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
        };

        fetch('https://emailbackend-kappa.vercel.app/send-email', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast("Message Sent!!", "success");
                document.getElementById("contact-form").reset();
            } else {
                console.error("FAILED...", data.error);
                showToast("Something went wrong. Try again!", "error");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showToast("Something went wrong. Try again!", "error");
        });
    });
};
}

// ========== AboutMe ==========
{
let scrollPosition = 0;

function openPopup(contentKey) {
    scrollPosition = window.scrollY || window.pageYOffset;

    const popup = document.getElementById('global-popup');
    const overlay = document.getElementById('global-overlay');

    const content = popupContents[contentKey];
    if (content) {
        document.getElementById('popup-title').innerText = content.title;
        document.getElementById('popup-text').innerText = content.text;
    } else {
        document.getElementById('popup-title').innerText = "No Content";
        document.getElementById('popup-text').innerText = "Content not found.";
    }
    
    // Instead of body lock, add a class to html
    document.documentElement.classList.add('popup-open');

    overlay.classList.add('active');
    popup.classList.add('active');
}

function closePopup() {
    const popup = document.getElementById('global-popup');
    const overlay = document.getElementById('global-overlay');

    overlay.classList.remove('active');
    popup.classList.remove('active');

    // Remove popup-open class
    document.documentElement.classList.remove('popup-open');
}

window.openPopup = openPopup;
document.getElementById('popup-close').addEventListener('click', closePopup);
document.getElementById('global-overlay').addEventListener('click', closePopup);
}

// ========== Toast Message ==========
function showToast(message, type = 'success') {
    const toast = document.getElementById("toast");
    toast.className = `toast ${type} show`;
    toast.textContent = message;
  
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

// ========== Footer Message ==========

  const quotes = [
  "“Break apps so users don’t have to.”",
  "“Making software fail so that it succeeds.”",
  "“Behind every flawless release is a tester who broke it first.”"
];

let quoteIndex = 0;

function showNextQuote() {
  const quoteElement = document.getElementById('footer-quote');
  if (!quoteElement) return;

  quoteElement.classList.remove('fade-in');
  void quoteElement.offsetWidth; // force reflow
  quoteElement.textContent = quotes[quoteIndex];
  quoteElement.classList.add('fade-in');
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

setInterval(showNextQuote, 4000);
showNextQuote();














