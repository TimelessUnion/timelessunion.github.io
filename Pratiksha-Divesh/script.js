/**
 * script.js — Reads from WEDDING_CONFIG (wedding-config.js) and
 * builds the entire page dynamically.
 *
 * Photo loading strategy:
 *   Each album category has a `folder` (e.g. "pre-wedding") and a
 *   `photos` array of { file, caption }.
 *   Images are expected at:  ./assets/<folder>/<file>
 *   If the `photos` array is empty a beautiful placeholder is shown.
 */

/* ═══ UTILITIES ═══════════════════════════════════════════════════ */

const cfg = WEDDING_CONFIG;

function coupleName()  { return `${cfg.bride.firstName} & ${cfg.groom.firstName} ${cfg.groom.lastName}`; }
function coupleNames() { return `${cfg.bride.firstName} ${cfg.bride.lastName} & ${cfg.groom.firstName} ${cfg.groom.lastName}`; }
function brandInitials(){ return `${cfg.bride.initial} ✦ ${cfg.groom.initial}`; }

function el(id) { return document.getElementById(id); }

function make(tag, cls, inner) {
  const e = document.createElement(tag);
  if (cls)   e.className   = cls;
  if (inner) e.innerHTML   = inner;
  return e;
}

/* ═══ FILL STATIC TEXT ═══════════════════════════════════════════ */

document.title = `${cfg.bride.firstName} & ${cfg.groom.firstName} | Wedding Invitation`;

el('navBrand').textContent     = brandInitials();
el('heroTagline').textContent  = cfg.heroTagline;
el('heroNames').innerHTML      = `${cfg.bride.firstName} ${cfg.bride.lastName}<br>&amp; ${cfg.groom.firstName} ${cfg.groom.lastName}`;
el('heroDate').textContent     = `${cfg.weddingDate} · ${cfg.weddingLocation}`;

// Venue
el('venueHeading').textContent = `${cfg.venue.name}, ${cfg.weddingLocation}`;
el('venueName').textContent    = cfg.venue.name;
el('venueAddress').textContent = cfg.venue.address;
el('venueMapBtn').href         = cfg.venue.googleMapsUrl;
el('venueEmbed').src           = cfg.venue.embedSrc;

// Footer
el('footerNames').textContent   = coupleNames();
el('footerDate').textContent    = `${cfg.weddingDate} · ${cfg.weddingLocation}`;
el('footerTagline').textContent = cfg.footerTagline;

// Meta description
document.querySelector('meta[name="description"]').content =
  `Luxury wedding invitation for ${coupleNames()} on ${cfg.weddingDate} at ${cfg.weddingLocation}.`;

/* ═══ COUNTDOWN ══════════════════════════════════════════════════ */

function renderCountdown() {
  const target  = new Date(cfg.weddingDateISO).getTime();
  const now     = Date.now();
  const diff    = target - now;

  if (diff <= 0) {
    el('countdown').innerHTML = `<div class="cd-box"><span class="cd-num">🎉</span><span class="cd-lbl">Today!</span></div>`;
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const mins    = Math.floor((diff % 3600000)  / 60000);
  const secs    = Math.floor((diff % 60000)    / 1000);

  el('countdown').innerHTML = `
    <div class="cd-box"><span class="cd-num">${days}</span><span class="cd-lbl">Days</span></div>
    <div class="cd-box"><span class="cd-num">${String(hours).padStart(2,'0')}</span><span class="cd-lbl">Hrs</span></div>
    <div class="cd-box"><span class="cd-num">${String(mins).padStart(2,'0')}</span><span class="cd-lbl">Min</span></div>
    <div class="cd-box"><span class="cd-num">${String(secs).padStart(2,'0')}</span><span class="cd-lbl">Sec</span></div>
  `;
}
renderCountdown();
setInterval(renderCountdown, 1000);

/* ═══ HERO SLIDES ════════════════════════════════════════════════ */

const sliderEl = el('heroSlider');
cfg.heroSlides.forEach((s, i) => {
  const fig = make('figure', `hero-slide${i === 0 ? ' is-active' : ''}`);
  const img = document.createElement('img');
  img.src     = s.src;
  img.alt     = s.alt;
  img.loading = i === 0 ? 'eager' : 'lazy';
  if (i === 0) img.fetchPriority = 'high';
  fig.append(img);
  sliderEl.append(fig);
});

let heroIdx = 0;
const heroSlides = sliderEl.querySelectorAll('.hero-slide');
setInterval(() => {
  heroSlides[heroIdx].classList.remove('is-active');
  heroIdx = (heroIdx + 1) % heroSlides.length;
  heroSlides[heroIdx].classList.add('is-active');
}, 5200);

/* ═══ STORY ══════════════════════════════════════════════════════ */

const storyGrid = el('storyGrid');
cfg.story.forEach(item => {
  const art = make('article', 'story-card reveal');
  art.innerHTML = `
    <img src="${item.img}" alt="${item.alt}" loading="lazy" />
    <div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </div>`;
  storyGrid.append(art);
});

/* ═══ EVENTS ═════════════════════════════════════════════════════ */

const eventGrid = el('eventGrid');
cfg.events.forEach(ev => {
  const art = make('article', 'event-card reveal');
  art.innerHTML = `
    <div class="event-emoji">${ev.emoji}</div>
    <h3>${ev.title}</h3>
    <div class="event-detail"><strong>Date</strong><span>${ev.date}</span></div>
    <div class="event-detail"><strong>Time</strong><span>${ev.time}</span></div>
    <div class="event-detail"><strong>Venue</strong><span>${ev.venue}</span></div>
    <p class="event-desc">${ev.desc}</p>`;
  eventGrid.append(art);
});

/* ═══ CONTACT ════════════════════════════════════════════════════ */

const contactGrid = el('contactGrid');
cfg.contacts.forEach(c => {
  const art = make('article', 'contact-card reveal');
  art.innerHTML = `
    <h3>${c.role}</h3>
    <p>${c.name}</p>
    <div class="contact-actions">
      <a class="contact-btn call" href="tel:${c.phone}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.41 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 5.55 5.55l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92"/></svg>
        ${c.display}
      </a>
      <a class="contact-btn whatsapp" href="https://wa.me/${c.phone.replace(/[^0-9]/g,'')}" target="_blank" rel="noopener noreferrer">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        WhatsApp
      </a>
    </div>`;
  contactGrid.append(art);
});

/* ═══ ALBUM ══════════════════════════════════════════════════════ */

const tabsEl      = el('albumTabs');
const albumPhoto  = el('albumPhoto');
const albumImg    = el('albumImg');
const albumCaption = el('albumCaption');
const prevBtn     = document.querySelector('.album-nav.prev');
const nextBtn     = document.querySelector('.album-nav.next');
const thumbRowEl  = el('thumbRow');
const albumViewer = el('albumViewer');

let currentCat  = cfg.album[0]?.id || '';
let currentIdx  = 0;

/** Resolve photo src: local file or placeholder */
function photoSrc(catItem, photoItem) {
  if (photoItem?.file) {
    return `./assets/${catItem.folder}/${photoItem.file}`;
  }
  return null; // will show placeholder
}

/** Returns current category object from config */
function getCat() {
  return cfg.album.find(c => c.id === currentCat) || cfg.album[0];
}

/** SVG placeholder for empty categories */
function placeholderHTML(label) {
  return `
    <div class="album-placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <p>Photos coming soon…</p>
      <small style="font-family:Cinzel,serif;font-size:0.62rem;letter-spacing:0.1em;opacity:0.5;text-transform:uppercase">${label}</small>
    </div>`;
}

function buildThumbs() {
  thumbRowEl.innerHTML = '';
  const cat = getCat();
  if (!cat.photos.length) return;

  cat.photos.forEach((p, idx) => {
    const btn = make('button', `thumb${idx === currentIdx ? ' is-active' : ''}`);
    btn.type = 'button';
    btn.setAttribute('aria-label', `Open image ${idx + 1}`);
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = photoSrc(cat, p);
    img.alt = p.caption || '';
    btn.append(img);
    btn.addEventListener('click', () => updateImage(idx, idx > currentIdx ? 'right' : 'left'));
    thumbRowEl.append(btn);
  });
}

function updateImage(nextIdx, direction = 'right') {
  const cat = getCat();

  albumPhoto.classList.remove('flip-left', 'flip-right');
  void albumPhoto.offsetWidth; // reflow
  albumPhoto.classList.add(direction === 'right' ? 'flip-right' : 'flip-left');

  setTimeout(() => {
    if (!cat.photos.length) {
      // Show placeholder
      albumPhoto.innerHTML = placeholderHTML(cat.label);
      albumPhoto.classList.remove('flip-left', 'flip-right');
      return;
    }

    currentIdx = ((nextIdx % cat.photos.length) + cat.photos.length) % cat.photos.length;
    const item = cat.photos[currentIdx];
    const src  = photoSrc(cat, item);

    // Restore normal structure if it was a placeholder
    if (!el('albumImg')) {
      albumPhoto.innerHTML = `<img id="albumImg" src="" alt="" loading="lazy" /><figcaption id="albumCaption"></figcaption>`;
    }

    document.getElementById('albumImg').src   = src;
    document.getElementById('albumImg').alt   = item.caption || '';
    document.getElementById('albumCaption').textContent = item.caption || '';

    albumPhoto.classList.remove('flip-left', 'flip-right');

    thumbRowEl.querySelectorAll('.thumb').forEach((t, i) => {
      t.classList.toggle('is-active', i === currentIdx);
    });
  }, 240);
}

function setCategory(catId) {
  currentCat = catId;
  currentIdx = 0;

  tabsEl.querySelectorAll('.tab').forEach(t => {
    const active = t.dataset.category === catId;
    t.classList.toggle('is-active', active);
    t.setAttribute('aria-selected', String(active));
  });

  buildThumbs();
  updateImage(0, 'right');
}

// Build tabs from config
cfg.album.forEach((cat, i) => {
  const btn = make('button', `tab${i === 0 ? ' is-active' : ''}`, cat.label);
  btn.type = 'button';
  btn.role = 'tab';
  btn.dataset.category = cat.id;
  btn.setAttribute('aria-selected', String(i === 0));
  btn.addEventListener('click', () => setCategory(cat.id));
  tabsEl.append(btn);
});

prevBtn.addEventListener('click', () => updateImage(currentIdx - 1, 'left'));
nextBtn.addEventListener('click', () => updateImage(currentIdx + 1, 'right'));

// Touch swipe
let startX = 0;
albumViewer.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; });
albumViewer.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].clientX - startX;
  if (Math.abs(delta) < 40) return;
  delta > 0 ? updateImage(currentIdx - 1, 'left') : updateImage(currentIdx + 1, 'right');
});

// Keyboard navigation
albumViewer.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  updateImage(currentIdx - 1, 'left');
  if (e.key === 'ArrowRight') updateImage(currentIdx + 1, 'right');
});

// Init
setCategory(currentCat);

/* ═══ NAV MENU (MOBILE) ══════════════════════════════════════════ */

const menuBtn  = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('is-open');
});

// Close nav when a link is tapped
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside tap
document.addEventListener('click', e => {
  if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

/* ═══ REVEAL ON SCROLL ════════════════════════════════════════════ */

const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));
