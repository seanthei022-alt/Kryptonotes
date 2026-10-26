/**
 * KRYPTONOTES - OFFICIAL BAND PROFILE APPLICATION JAVASCRIPT
 * Features:
 * - Single Cohesive Style Color & Presentable Typography
 * - Full 6-Piece Standard Band Lineup Package Calculator
 * - Lightbox modal for high-res band photos
 * - Booking inquiry handler with prefilled SMS / Facebook Messenger triggers
 * - Sticky dock & mobile navigation
 * - Subtle ambient soundwave visualizer canvas
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initStickyDock();
    initQuoteCalculator();
    initLightbox();
    initHeroVisualizer();
});

/* ==========================================================================
   1. NAVIGATION & STICKY DOCK
   ========================================================================== */
function initNavigation() {
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll blur effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initStickyDock() {
    const stickyDock = document.getElementById('stickyDock');
    const heroSection = document.getElementById('hero');

    if (!stickyDock || !heroSection) return;

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom < 100) {
            stickyDock.classList.add('visible');
        } else {
            stickyDock.classList.remove('visible');
        }
    });
}

/* ==========================================================================
   2. HERO BACKGROUND SOUNDWAVE VISUALIZER CANVAS
   ========================================================================== */
function initHeroVisualizer() {
    const canvas = document.getElementById('visualizerCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let phase = 0;

    function draw() {
        requestAnimationFrame(draw);
        ctx.clearRect(0, 0, width, height);

        const waveCount = 2;

        for (let w = 0; w < waveCount; w++) {
            ctx.beginPath();
            ctx.lineWidth = 1.2;

            // Clean single-tone line gradient
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
            gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.35)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

            ctx.strokeStyle = gradient;

            const amplitude = 14 + (w * 10);
            const frequency = 0.003 + (w * 0.0015);
            const baselineY = height * 0.65 + (w * 20);

            for (let x = 0; x < width; x += 8) {
                const y = baselineY + Math.sin(x * frequency + phase * (w + 1)) * amplitude;
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        phase += 0.025;
    }

    draw();
}

/* ==========================================================================
   3. INSTANT EVENT QUOTE / PACKAGE ESTIMATOR (LOCKED 6-PIECE LINEUP)
   ========================================================================== */
function initQuoteCalculator() {
    const eventType = document.getElementById('calcEventType');
    const guestCount = document.getElementById('calcGuestCount');
    const title = document.getElementById('resultPackageTitle');
    const desc = document.getElementById('resultPackageDesc');
    const btnSendQuote = document.getElementById('btnSendCalcQuote');

    function updateEstimate() {
        if (!eventType || !guestCount) return;

        const ev = eventType.value;
        const guests = guestCount.value;

        if (title) {
            title.textContent = `Full 6-Piece Live Experience for ${ev}`;
        }
        if (desc) {
            desc.textContent = `Our standard full 6-piece live band lineup for ${ev} (${guests}). Includes 3 energetic 45-minute live sets, full instrumentation (vocals, lead guitar, rhythm guitar, bass, keys, drums), wireless microphones for host/ceremony, and complete party setlists across Pop, OPM, Rock, and Classic hits.`;
        }
    }

    if (eventType) eventType.addEventListener('change', updateEstimate);
    if (guestCount) guestCount.addEventListener('change', updateEstimate);

    if (btnSendQuote) {
        btnSendQuote.addEventListener('click', () => {
            const ev = eventType ? eventType.value : 'Special Event';
            const guests = guestCount ? guestCount.value : 'Our Event';
            const msg = `Hi Kryptonotes! I would like to inquire about booking your 6-Piece Full Live Band for our ${ev} (${guests}). Please let us know your availability and rates. Thank you!`;

            window.location.href = `sms:09925871814?&body=${encodeURIComponent(msg)}`;
            showToast('Opening SMS to 0992 587 1814...');
        });
    }

    updateEstimate();
}

/* ==========================================================================
   4. BOOKING FORM & SONG REQUESTS
   ========================================================================== */
window.handleBookingSubmit = function (event) {
    event.preventDefault();
    const name = document.getElementById('clientName').value;
    const contact = document.getElementById('clientContact').value;
    const date = document.getElementById('eventDate').value;
    const type = document.getElementById('eventTypeSelect').value;
    const venue = document.getElementById('eventVenue').value;
    const notes = document.getElementById('eventNotes').value;

    const inquirySummary = `Kryptonotes Booking Inquiry:
Name: ${name}
Contact: ${contact}
Preferred Band Lineup: 6-Piece Band
Event: ${type}
Date: ${date}
Venue: ${venue}
Notes/Requests: ${notes || 'None'}`;

    const smsUrl = `sms:09925871814?&body=${encodeURIComponent(inquirySummary)}`;

    showToast(`Thank you, ${name}! Redirecting to 0992 587 1814...`);

    setTimeout(() => {
        window.location.href = smsUrl;
    }, 1000);
};

/* Song Request Modal Handlers */
window.openRequestModal = function () {
    const modal = document.getElementById('requestModal');
    if (modal) modal.classList.add('active');
};

window.closeRequestModal = function () {
    const modal = document.getElementById('requestModal');
    if (modal) modal.classList.remove('active');
};

window.handleModalBackdropClick = function (event) {
    if (event.target.id === 'requestModal') {
        closeRequestModal();
    }
};

window.handleSongRequestSubmit = function (event) {
    event.preventDefault();
    const title = document.getElementById('reqSongTitle').value;
    const artist = document.getElementById('reqArtist').value;

    closeRequestModal();
    showToast(`Requested: "${title}" by ${artist}`);
};

/* ==========================================================================
   5. LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeRequestModal();
        }
    });

    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const cat = tab.getAttribute('data-cat');

            galleryItems.forEach(item => {
                const itemCat = item.getAttribute('data-cat');
                if (cat === 'all' || itemCat === cat) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

window.openLightbox = function (src, caption) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (!modal || !img) return;

    img.src = src;
    if (cap) cap.textContent = caption || 'Kryptonotes Band';
    modal.classList.add('active');
};

window.closeLightbox = function (event) {
    if (!event || event.target.id === 'lightboxModal' || event.target.classList.contains('lightbox-close')) {
        const modal = document.getElementById('lightboxModal');
        if (modal) modal.classList.remove('active');
    }
};

/* ==========================================================================
   6. UTILITIES (COPY PHONE, TOAST NOTIFICATION)
   ========================================================================== */
window.copyContactNumber = function () {
    const num = '0992 587 1814';
    if (navigator.clipboard) {
        navigator.clipboard.writeText('09925871814').then(() => {
            showToast('Copied "0992 587 1814"');
        }).catch(() => {
            showToast(`Hotline: ${num}`);
        });
    } else {
        showToast(`Hotline: ${num}`);
    }
};

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}
