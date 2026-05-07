/**
 * ╔══════════════════════════════════════════════════════╗
 * ║           WEDDING WEBSITE CONFIGURATION             ║
 * ║   Edit everything here — the site updates itself.  ║
 * ╚══════════════════════════════════════════════════════╝
 */

const WEDDING_CONFIG = {

  /* ── COUPLE ───────────────────────────────────────── */
  bride: {
    firstName: "Pratiksha",
    lastName:  "Bari",
    /** Short monogram initial shown in the nav brand */
    initial:   "PB",
  },
  groom: {
    firstName: "Divesh",
    lastName:  "Bari",
    initial:   "DB",
  },

  /* ── MAIN WEDDING DATE & VENUE ───────────────────── */
  weddingDate: "23 November 2026",       // Display string
  weddingDateISO: "2026-11-23",          // Used for countdown timer
  weddingLocation: "Masoli Dahanu",

  heroTagline: "Together with their families",

  /* ── EVENTS ───────────────────────────────────────── */
  events: [
    {
      id:     "mehendi",
      title:  "Mehendi",
      date:   "21 November 2026",
      time:   "4:00 PM onward",
      venue:  "Masoli Dahanu",
      desc:   "Celebrate vibrant colors, henna artistry, and musical joy.",
      emoji:  "🌸",
    },
    {
      id:     "haldi",
      title:  "Haldi",
      date:   "22 November 2026",
      time:   "10:00 AM onward",
      venue:  "Masoli Dahanu",
      desc:   "A radiant morning of blessings and laughter.",
      emoji:  "🌼",
    },
    {
      id:     "sangeet",
      title:  "Sangeet",
      date:   "22 November 2026",
      time:   "7:00 PM onward",
      venue:  "Masoli Dahanu",
      desc:   "An enchanting evening of dance, rhythm, and togetherness.",
      emoji:  "🎶",
    },
    {
      id:     "wedding",
      title:  "Wedding Ceremony",
      date:   "23 November 2026",
      time:   "11:30 AM",
      venue:  "Masoli Dahanu",
      desc:   "Sacred vows woven with timeless rituals.",
      emoji:  "🪔",
    },
    {
      id:     "reception",
      title:  "Reception",
      date:   "23 November 2026",
      time:   "5:30 PM onward",
      venue:  "Masoli Dahanu",
      desc:   "An elegant evening to toast love and new beginnings.",
      emoji:  "✨",
    },
  ],

  /* ── LOCATION ─────────────────────────────────────── */
  venue: {
    name:         "Masoli",
    address:      "Dahanu, Maharashtra",
    googleMapsUrl: "https://maps.app.goo.gl/JRE6FU6dLwD5Po4q8",
    /** Embed src for Google Maps iframe — update lat,lng if needed */
    embedSrc:     "https://www.google.com/maps?q=19.989119511358545,72.73054431222006&output=embed",
  },

  /* ── ALBUM ────────────────────────────────────────── */
  /**
   * Each category maps to a folder under /assets/<folder>/
   * Place your images there (jpg/jpeg/png/webp).
   * The site will load them automatically via the filenames listed here.
   * If you add/remove images, just update the `photos` arrays.
   *
   * If a category has no photos, a beautiful placeholder will be shown.
   */
  album: [
    {
      id:       "prewedding",
      label:    "Pre Wedding",
      folder:   "pre-wedding",   // resolves to /assets/pre-wedding/
      photos: [
        // { file: "shoot1.jpg", caption: "Golden hour portrait." },
        { file: "pre8.jpeg",},
        { file: "pre9.jpeg",},
        { file: "pre10.jpeg",},
        { file: "pre11.jpeg",},
        { file: "pre12.jpeg",},
        { file: "pre13.jpeg",},
        { file: "pre14.jpeg",},
        { file: "pre15.jpeg",},
        { file: "pre16.jpeg",},
        // { file: "shoot2.jpg", caption: "A quiet moment before forever." },
      ],
    },
    {
      id:       "engagement",
      label:    "Engagement",
      folder:   "engagement",
      photos: [
        // { file: "ring.jpg",  caption: "The promise begins." },
        { file: "eng1.jpeg", },
        { file: "eng2.jpeg", },
        { file: "eng3.jpeg", },
        { file: "eng4.jpeg", },        
      ],
    },
    {
      id:       "haldi",
      label:    "Haldi",
      folder:   "haldi",
      photos: [
        // { file: "haldi1.jpg", caption: "Haldi hues and heartfelt blessings." },
      ],
    },
    {
      id:       "sangeet",
      label:    "Sangeet",
      folder:   "sangeet",
      photos: [
        // { file: "dance1.jpg", caption: "Rhythm and joy." },
      ],
    },
    {
      id:       "wedding",
      label:    "Wedding",
      folder:   "wedding",
      photos: [
        // { file: "ceremony1.jpg", caption: "Sacred vows." },
      ],
    },
    {
      id:       "reception",
      label:    "Reception",
      folder:   "reception",
      photos: [
        // { file: "reception1.jpg", caption: "An evening to remember." },
      ],
    },
  ],

  /* ── CONTACT ──────────────────────────────────────── */
  contacts: [
    {
      role:    "Bride's Family",
      name:    "Mrs. Bari",
      phone:   "+919999990001",
      display: "+91 99999 00001",
    },
    {
      role:    "Groom's Family",
      name:    "Mr. Bari",
      phone:   "+919999990002",
      display: "+91 99999 00002",
    },
  ],

  /* ── OUR STORY ────────────────────────────────────── */
  story: [
    {
      title: "Where it began",
      text:  "What started as a gentle conversation turned into an effortless companionship. Pratiksha and Divesh found in each other a calm strength, a shared laughter, and a promise to grow together.",
      img:   "./assets/pre-wedding/pre12.jpeg",
      alt:   "Couple enjoying sunset",
    },
    {
      title: "The beautiful chapter",
      text:  "Through celebrations, dreams, and quiet moments, their bond blossomed into a love that is warm, patient, and timeless. Each memory became a step toward this unforgettable day.",
      img:   "./assets/engagement/eng2.jpeg",
      alt:   "Hands with engagement ring",
    },
    {
      title: "Forever awaits",
      text:  "On 23 November 2027, they invite you to witness a union rooted in family values and modern romance — a celebration of two souls becoming one.",
      img:   "./assets/engagement/eng4.jpeg",
      alt:   "Indian wedding decor",
    },
  ],

  /* ── HERO SLIDES ──────────────────────────────────── */
  heroSlides: [
    {
      src: "./assets/pre-wedding/pre8.jpeg",
      alt: "Romantic couple silhouette",
    },
    {
      src: "./assets/pre-wedding/pre16.jpeg",
      alt: "Wedding couple portrait",
    },
    {
      src: "./assets/engagement/eng3.jpeg",
      alt: "Elegant Indian wedding outfit details",
    },
  ],

  /* ── FOOTER ───────────────────────────────────────── */
  footerTagline: "Designed with love for a timeless celebration.",
};
