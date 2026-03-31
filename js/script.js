/* ===================================================================
 * Grotto Vista Resort - Main JavaScript
 * =================================================================== */

(function() {
    'use strict';

    /* ------------------------------------------------------------------
     * Preloader
     * ------------------------------------------------------------------ */
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => preloader.classList.add('loaded'), 300);
        }
    });

    /* ------------------------------------------------------------------
     * Sticky / Scrolled Header
     * ------------------------------------------------------------------ */
    const header = document.querySelector('.s-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* ------------------------------------------------------------------
     * Mobile Nav Toggle
     * ------------------------------------------------------------------ */
    const menuToggle = document.querySelector('.s-header__menu-toggle');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            body.classList.toggle('menu-is-open');
        });

        // Close menu on nav link click
        document.querySelectorAll('.s-header__menu-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                body.classList.remove('menu-is-open');
            });
        });

        // Close menu when clicking overlay
        document.addEventListener('click', function(e) {
            if (body.classList.contains('menu-is-open')) {
                const nav = document.querySelector('.s-header__nav');
                const toggle = document.querySelector('.s-header__menu-toggle');
                if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                    body.classList.remove('menu-is-open');
                }
            }
        });
    }

    /* ------------------------------------------------------------------
     * Go-to-Top Button
     * ------------------------------------------------------------------ */
    const goTop = document.querySelector('.ss-go-top');
    if (goTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                goTop.classList.add('show');
            } else {
                goTop.classList.remove('show');
            }
        });

        goTop.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ------------------------------------------------------------------
     * Gallery Filter
     * ------------------------------------------------------------------ */
    const filterBtns = document.querySelectorAll('.gallery-filter__btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                galleryItems.forEach(function(item) {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ------------------------------------------------------------------
     * Lightbox
     * ------------------------------------------------------------------ */
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        const lightboxBody = lightbox.querySelector('.lightbox__body');
        const lightboxCaption = lightbox.querySelector('.lightbox__caption');
        const lightboxClose = lightbox.querySelector('.lightbox__close');

        // Open lightbox on gallery item click
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const emoji = item.getAttribute('data-emoji') || '🏖️';
                const caption = item.getAttribute('data-caption') || '';

                if (lightboxBody) lightboxBody.innerHTML = '<div style="font-size:6rem">' + emoji + '</div>';
                if (lightboxCaption) lightboxCaption.textContent = caption;

                lightbox.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    /* ------------------------------------------------------------------
     * Form Validation - Reservation Form
     * ------------------------------------------------------------------ */
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = reservationForm.querySelector('[name="res-name"]');
            const date = reservationForm.querySelector('[name="res-date"]');
            const guests = reservationForm.querySelector('[name="res-guests"]');
            const type = reservationForm.querySelector('[name="res-type"]');
            
            let valid = true;
            const fields = [name, date, guests, type];
            
            fields.forEach(function(field) {
                if (!field) return;
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--color-error-content)';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            const alertEl = reservationForm.querySelector('.alert');
            if (valid) {
                if (alertEl) {
                    alertEl.className = 'alert is-success';
                    alertEl.textContent = '✓ Reservation request submitted! We\'ll contact you shortly to confirm.';
                }
                reservationForm.reset();
            } else {
                if (alertEl) {
                    alertEl.className = 'alert is-error';
                    alertEl.textContent = '⚠ Please fill in all required fields.';
                }
            }

            if (alertEl) {
                alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                setTimeout(() => {
                    alertEl.className = 'alert';
                }, 5000);
            }
        });
    }

    /* ------------------------------------------------------------------
     * Form Validation - Contact Form
     * ------------------------------------------------------------------ */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const requiredFields = contactForm.querySelectorAll('[required]');
            let valid = true;

            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--color-error-content)';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('[name="contact-email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    emailField.style.borderColor = 'var(--color-error-content)';
                    valid = false;
                }
            }

            const alertEl = contactForm.querySelector('.alert');
            if (valid) {
                if (alertEl) {
                    alertEl.className = 'alert is-success';
                    alertEl.textContent = '✓ Message sent! We\'ll get back to you within 24 hours.';
                }
                contactForm.reset();
            } else {
                if (alertEl) {
                    alertEl.className = 'alert is-error';
                    alertEl.textContent = '⚠ Please fill in all required fields correctly.';
                }
            }

            if (alertEl) {
                alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                setTimeout(() => { alertEl.className = 'alert'; }, 5000);
            }
        });
    }

    /* ------------------------------------------------------------------
     * Scroll Reveal Animation
     * ------------------------------------------------------------------ */
    if ('IntersectionObserver' in window) {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        reveals.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    }

})();
