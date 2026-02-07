// Smooth scroll per i link di navigazione
document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Evita lo smooth scroll per il link della lingua
        if (href === '#contact' && this.classList.contains('lang-switcher')) {
            return;
        }
        
        // Verifica se l'URL ha un hash (ancora interna)
        const hashMatch = href.match(/#(\w+)$/);
        
        if (hashMatch && hashMatch[1] !== '') {
            e.preventDefault();
            const targetId = hashMatch[1];
            const target = document.querySelector(`#${targetId}`);
            
            if (target) {
                // Se siamo già nella homepage, usa lo smooth scroll
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Altrimenti naviga verso la homepage con l'hash
                    window.location.href = `index.html#${targetId}`;
                }
            }
        }
    });
});

// Animazione fade-in per gli elementi quando entrano nella viewport
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


// == LOGICA: work-item con hover zoom (Griglia Home) ==
const hoverTransitionDuration = '0.4s'; 
const scaleFactor = '1.05';

// Applica l'animazione e la funzionalità hover agli elementi work-item
document.querySelectorAll('.work-item').forEach((item, index) => {
    // 1. Imposta lo stato iniziale per l'animazione di entrata
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // 2. Transizione per l'animazione di entrata E per l'effetto hover
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, transform ${hoverTransitionDuration} ease, box-shadow ${hoverTransitionDuration} ease`;
    
    // 3. Osserva l'elemento per l'animazione di entrata
    observer.observe(item);

    // 4. Gestione dell'ingrandimento (mouseover)
    item.addEventListener('mouseover', function() {
        // Applica z-index e ingrandimento
        this.style.zIndex = '10';
        this.style.transform = `scale(${scaleFactor})`;
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)'; 
    });

    // 5. Gestione del rimpicciolimento (mouseout)
    item.addEventListener('mouseout', function() {
        // Reset
        this.style.zIndex = '1'; 
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0)';
    });
});
// == FINE LOGICA work-item ==


// Applica l'animazione agli elementi service-item
document.querySelectorAll('.service-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(item);
});

// == LOGICA: Animazione di entrata per project-list-item (nuova pagina archivio) ==
document.querySelectorAll('.project-list-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    // Aggiungo una transizione specifica per mantenere l'hover CSS fluido
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, all 0.4s ease`;
    observer.observe(item);
});
// == FINE LOGICA project-list-item ==

// Gestione del click sul language switcher
document.querySelector('.lang-switcher').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Funzionalità cambio lingua in arrivo!');
});

// Animate dither-inner when it enters the viewport
document.addEventListener('DOMContentLoaded', function() {
    const ctaBox = document.querySelector('.cta-box');
    if (ctaBox) {
        // initial state (matches other elements' initial setup)
        ctaBox.style.opacity = '0';
        ctaBox.style.transform = 'translateY(20px)';
        ctaBox.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(ctaBox);
    }
});
// no special positioning needed: CTA lives in the hero grid now