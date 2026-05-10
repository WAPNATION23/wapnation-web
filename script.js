/* ═════════════════════════════
   WapNation v2 — Script
   ═════════════════════════════ */

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 600); // let the drawing animation finish nicely
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveals();
    initSmoothScroll();
    initFormHandler();
});

/* ─── Navbar scroll ─── */
function initNavbar() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

/* ─── Mobile menu ─── */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('open');
        });
    });
}
/* ─── Scroll reveal ─── */
function initScrollReveals() {
    // Reveal .reveal elements
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));

    // Also animate service cards and project items
    const fadeEls = document.querySelectorAll('.scard, .project-item, .mini-projects, .stack-row, .contact-opt');
    const fadeObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    fadeEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
        fadeObs.observe(el);
    });
}

/* ─── Smooth scroll ─── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 76;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ─── Form ─── */
function initFormHandler() {
    // pre-built, using global handleSubmit
}

function handleSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    const serviceLabels = {
        landing:  'Landing page / sitio web',
        ai:       'Asistente IA / Alexa Skill',
        monitor:  'Monitor de licitaciones',
        trading:  'Bot de trading',
        pos:      'Punto de venta',
        api:      'API / automatización',
        otro:     'Otro'
    };

    // Button feedback
    btn.textContent = 'Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    const text = encodeURIComponent(
        `Hola Michael! Vi tu sitio WapNation.\n\n` +
        `*Nombre:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Servicio:* ${serviceLabels[service] || 'No especificado'}\n` +
        `*Mensaje:* ${message}`
    );

    setTimeout(() => {
        btn.innerHTML = '✓ ¡Listo! Redirigiendo a WhatsApp...';
        btn.style.opacity = '1';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            window.open(`https://wa.me/56936907136?text=${text}`, '_blank');

            setTimeout(() => {
                document.getElementById('contact-form').reset();
                btn.innerHTML = `
                    Enviar y continuar por WhatsApp
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                `;
                btn.style.background = '';
                btn.disabled = false;
            }, 2500);
        }, 1000);
    }, 700);
}
