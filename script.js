// Menu hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fermer le menu mobile quand on clique ailleurs
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Animation d'apparition au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-text, .about-image');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gestion de la navigation responsive
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const logoContainer = document.querySelector('.logo-container');
    const ctaButton = document.querySelector('.cta-button');
    
    // Fonction pour ajuster la navigation selon la taille d'écran
    const adjustNavigation = () => {
        const navWidth = nav.offsetWidth;
        const logoWidth = logoContainer.offsetWidth;
        const ctaWidth = ctaButton.offsetWidth;
        const availableSpace = navWidth - logoWidth - ctaWidth - 80; // 80px pour les marges
        
        // Si l'espace est trop restreint, ajuster la taille du logo
        if (availableSpace < 300 && window.innerWidth > 768) {
            logoContainer.style.maxWidth = '200px';
        } else if (window.innerWidth > 768) {
            logoContainer.style.maxWidth = '';
        }
    };
    
    // Appeler la fonction au chargement et au redimensionnement
    adjustNavigation();
    window.addEventListener('resize', adjustNavigation);
});