// Genereert alle statische HTML-pagina's uit data/posts.mjs.
//
// Gebruik: node build/generate.mjs
//
// Nieuw artikel toevoegen: voeg een object toe aan POSTS in data/posts.mjs
// en draai dit script opnieuw. Er is verder geen build-stap of server nodig —
// de output is gewone statische HTML.

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { AUTHOR, SITE, CATEGORIES, POSTS, sortedPosts, featuredPost } from "../data/posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ---------------------------------------------------------------------------
// Gedeelde head (design tokens identiek aan Platform Ketensamenwerking)
// ---------------------------------------------------------------------------

function headTags({ title, description, path, root, ogImage }) {
  const url = `${SITE.url}/${path}`;
  return `<title>${title}</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:type" content="${path ? "article" : "website"}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${SITE.url}/${ogImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${SITE.url}/${ogImage}" />
<link rel="canonical" href="${url}" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23142b52'/%3E%3Ccircle cx='16' cy='16' r='7' fill='none' stroke='%23e17a2d' stroke-width='2.5'/%3E%3C/svg%3E" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" />

<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          navy: "oklch(0.24 0.06 256)",
          "navy-deep": "oklch(0.18 0.05 256)",
          "navy-soft": "oklch(0.34 0.06 256)",
          orange: "oklch(0.68 0.17 48)",
          "orange-soft": "oklch(0.82 0.1 60)",
          surface: "oklch(0.98 0.005 250)",
          "surface-2": "oklch(0.95 0.008 250)",
          ink: "oklch(0.18 0.02 256)",
          "slate-soft": "oklch(0.5 0.02 256)",
          hairline: "oklch(0.9 0.008 256)",
        },
        fontFamily: {
          display: ['"Inter Tight"', "ui-sans-serif", "system-ui", "sans-serif"],
          sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        },
      },
    },
  };
</script>

<style>
  html { scroll-behavior: smooth; }
  body {
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  h1, h2, h3, h4 {
    font-family: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
    letter-spacing: -0.02em;
    color: oklch(0.18 0.05 256);
  }

  .container-x {
    width: 100%;
    margin-inline: auto;
    max-width: 1200px;
    padding-inline: 1.25rem;
  }
  @media (min-width: 768px) {
    .container-x { padding-inline: 2rem; }
  }

  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: oklch(0.68 0.17 48);
  }

  .heading-rule { position: relative; padding-bottom: 0.875rem; }
  .heading-rule::after {
    content: "";
    position: absolute;
    left: 0; bottom: 0;
    width: 2.5rem; height: 2px;
    background: oklch(0.68 0.17 48);
  }

  .blueprint-bg {
    background-image:
      linear-gradient(to right, color-mix(in oklab, oklch(0.68 0.17 48) 8%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in oklab, oklch(0.68 0.17 48) 8%, transparent) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .blueprint-drift { animation: blueprint-drift 50s linear infinite; }
  @keyframes blueprint-drift { 0% { background-position: 0px 0px; } 100% { background-position: 64px 64px; } }

  @keyframes ambient-float-a { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(4%,-4%) scale(1.08); } }
  @keyframes ambient-float-b { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-4%,5%) scale(1.05); } }
  .ambient-glow-orange {
    background: radial-gradient(circle, oklch(0.68 0.17 48) 0%, transparent 70%);
    filter: blur(80px); opacity: 0.14; animation: ambient-float-a 22s ease-in-out infinite;
  }
  .ambient-glow-navy {
    background: radial-gradient(circle, oklch(0.24 0.06 256) 0%, transparent 70%);
    filter: blur(90px); opacity: 0.1; animation: ambient-float-b 28s ease-in-out infinite;
  }

  @property --shine-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
  @keyframes shine-rotate { to { --shine-angle: 360deg; } }
  .shine-border-orange {
    border: 2.5px solid transparent;
    background:
      linear-gradient(oklch(0.24 0.06 256), oklch(0.24 0.06 256)) padding-box,
      conic-gradient(from var(--shine-angle),
        color-mix(in oklab, oklch(0.68 0.17 48) 45%, transparent) 0deg,
        oklch(0.68 0.17 48) 8deg,
        color-mix(in oklab, oklch(0.68 0.17 48) 45%, transparent) 16deg,
        color-mix(in oklab, oklch(0.68 0.17 48) 45%, transparent) 360deg
      ) border-box;
    animation: shine-rotate 3.5s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .blueprint-drift, .ambient-glow-orange, .ambient-glow-navy, .shine-border-orange { animation: none; }
  }

  .icon { width: 1.25rem; height: 1.25rem; }
  .prose-article :where(a) { color: oklch(0.24 0.06 256); text-decoration-color: oklch(0.68 0.17 48); }
</style>`;
}

// ---------------------------------------------------------------------------
// Iconen (inline SVG, Lucide-stijl, consistent met de zusterwebsites)
// ---------------------------------------------------------------------------

const ICONS = {
  mail: `<svg class="icon h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>`,
  arrowRight: `<svg class="icon h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  arrowLeft: `<svg class="icon h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>`,
  calendar: `<svg class="icon h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
  clock: `<svg class="icon h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  linkedin: `<svg class="icon h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.76-2 4 0 4.74 2.6 4.74 6V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z"/></svg>`,
  globe: `<svg class="icon h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z"/></svg>`,
  book: `<svg class="icon h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>`,
};

function categoryIcon(category) {
  const icons = {
    "Artikelen & publicaties": `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>`,
    "Onderzoek Ketensamenwerking": `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
    "Resultaten (cijfers) - praktijk": `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`,
  };
  return icons[category] ?? icons["Artikelen & publicaties"];
}

// ---------------------------------------------------------------------------
// Header / footer
// ---------------------------------------------------------------------------

function logoMark(root) {
  return `<a href="${root}index.html" class="flex shrink-0 items-center gap-2.5">
    <span class="flex h-10 w-10 items-center justify-center rounded-md bg-navy-deep text-white md:h-11 md:w-11">
      ${ICONS.book.replace('class="icon h-4 w-4"', 'class="icon h-5 w-5"')}
    </span>
    <span class="font-display text-lg font-semibold leading-tight text-navy-deep md:text-xl">
      Keten<span class="text-orange">samenwerking</span><span class="text-slate-soft">.blog</span>
    </span>
  </a>`;
}

function header(root, active) {
  const navItem = (href, label, key) => `<a href="${href}" class="text-sm font-medium ${active === key ? "text-navy" : "text-ink/80"} transition-colors hover:text-navy">${label}</a>`;
  return `<div class="hidden bg-navy-deep text-white md:block">
    <div class="container-x flex h-9 items-center justify-between text-xs">
      <span class="tracking-wide">Ketensamenwerking Blog &middot; Kennis en inzichten over ketensamenwerking in bouw en vastgoed</span>
      <a href="mailto:${SITE.email}" class="inline-flex items-center gap-1.5 whitespace-nowrap">
        ${ICONS.mail}
        ${SITE.email}
      </a>
    </div>
  </div>

  <header class="sticky top-0 z-50 border-b border-hairline bg-white/95 backdrop-blur">
    <div class="flex h-20 w-full items-center justify-between gap-4 px-5 md:h-24 md:px-8">
      ${logoMark(root)}

      <nav class="hidden lg:flex" aria-label="Hoofdnavigatie">
        <ul class="flex items-center gap-6">
          <li>${navItem(`${root}index.html`, "Home", "home")}</li>
          <li>${navItem(`${root}artikelen/index.html`, "Artikelen", "artikelen")}</li>
          <li>${navItem(`${root}over.html`, "Over", "over")}</li>
          <li>
            <a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-md bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange/90">
              Volg op LinkedIn
            </a>
          </li>
        </ul>
      </nav>

      <button type="button" id="menu-toggle" aria-label="Menu openen" aria-expanded="false" class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline text-navy lg:hidden">
        <svg id="menu-icon-open" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        <svg id="menu-icon-close" class="icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
    </div>

    <div id="mobile-menu" class="hidden border-t border-hairline lg:hidden">
      <nav class="container-x py-4" aria-label="Mobiele navigatie">
        <ul class="flex flex-col">
          <li><a href="${root}index.html" class="block border-b border-hairline py-3 text-sm font-medium text-ink/80">Home</a></li>
          <li><a href="${root}artikelen/index.html" class="block border-b border-hairline py-3 text-sm font-medium text-ink/80">Artikelen</a></li>
          <li><a href="${root}over.html" class="block border-b border-hairline py-3 text-sm font-medium text-ink/80">Over</a></li>
        </ul>
        <div class="mt-4">
          <a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer" class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange px-4 py-3 text-sm font-semibold text-white">Volg op LinkedIn</a>
        </div>
      </nav>
    </div>
  </header>`;
}

function footer(root) {
  return `<footer class="bg-navy-deep text-white/80">
    <div class="container-x grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
      <div>
        <div class="font-display text-lg font-semibold text-white">Ketensamenwerking.blog</div>
        <div class="text-[11px] uppercase tracking-[0.18em] text-white/50">Kennisplatform</div>
        <p class="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
          Artikelen, onderzoek en publicaties over ketensamenwerking en RGS in de corporatie-, bouw-
          en installatiesector. Een initiatief van Ketensamenwerking Interim &amp; Advies.
        </p>
        <a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
          ${ICONS.linkedin}
          Volg ons op LinkedIn
        </a>
      </div>

      <div>
        <h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-white">Blog</h3>
        <ul class="mt-5 space-y-3 text-sm">
          <li><a href="${root}index.html" class="text-white/65 hover:text-white">Home</a></li>
          <li><a href="${root}artikelen/index.html" class="text-white/65 hover:text-white">Alle artikelen</a></li>
          <li><a href="${root}over.html" class="text-white/65 hover:text-white">Over de auteur</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-white">Categorieën</h3>
        <ul class="mt-5 space-y-3 text-sm">
          ${CATEGORIES.map((c) => `<li><a href="${root}artikelen/index.html#${slugifyCategory(c)}" class="text-white/65 hover:text-white">${c}</a></li>`).join("\n          ")}
        </ul>
      </div>

      <div>
        <h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-white">Contact</h3>
        <ul class="mt-5 space-y-3 text-sm text-white/65">
          <li class="text-white">${AUTHOR.name}</li>
          <li>
            <a href="mailto:${SITE.email}" class="inline-flex items-center gap-2 whitespace-nowrap hover:text-white">
              ${ICONS.mail} ${SITE.email}
            </a>
          </li>
          <li>
            <a href="${SITE.siteUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 hover:text-white">
              ${ICONS.globe} ketensamenwerking.nl
            </a>
          </li>
          <li>
            <a href="${SITE.platformUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 hover:text-white">
              ${ICONS.globe} platform-ketensamenwerking.nl
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/50 md:flex-row md:items-center">
        <span id="copyright-year">&copy; 2026 Ketensamenwerking.blog. Alle rechten voorbehouden.</span>
        <span>Onderdeel van Ketensamenwerking Interim &amp; Advies</span>
      </div>
      <div class="container-x pb-6 text-center text-xs text-white/40">
        Deze website is gebouwd door
        <a href="https://ukonnect.ai/nl/" target="_blank" rel="noopener noreferrer" class="underline decoration-white/20 underline-offset-2 hover:text-white/70">Ukonnect</a>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById("copyright-year").textContent =
      "© " + new Date().getFullYear() + " Ketensamenwerking.blog. Alle rechten voorbehouden.";

    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const iconOpen = document.getElementById("menu-icon-open");
    const iconClose = document.getElementById("menu-icon-close");
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        const isOpen = !mobileMenu.classList.contains("hidden");
        mobileMenu.classList.toggle("hidden");
        iconOpen.classList.toggle("hidden");
        iconClose.classList.toggle("hidden");
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
      });
      mobileMenu.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          iconOpen.classList.remove("hidden");
          iconClose.classList.add("hidden");
        }),
      );
    }
  </script>`;
}

function slugifyCategory(c) {
  return c.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// ---------------------------------------------------------------------------
// Kaartcomponenten
// ---------------------------------------------------------------------------

function postCard(post, root) {
  const href = `${root}artikelen/${post.slug}.html`;
  return `<article class="flex min-w-0 flex-col rounded-lg border border-hairline bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7" id="${slugifyCategory(post.category)}">
      <div class="flex items-center gap-3">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-navy/5 text-navy">${categoryIcon(post.category)}</span>
        <span class="text-xs font-semibold uppercase tracking-[0.16em] text-orange">${post.category}</span>
      </div>
      <h3 class="mt-4 font-display text-lg font-semibold leading-snug text-navy-deep">
        <a href="${href}" class="hover:text-navy">${post.title}</a>
      </h3>
      <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-soft">${post.excerpt}</p>
      <div class="mt-5 flex items-center gap-3 text-xs text-slate-soft/80">
        <span class="inline-flex items-center gap-1.5">${ICONS.calendar}${post.dateLabel}</span>
        <span aria-hidden="true">&middot;</span>
        <span class="inline-flex items-center gap-1.5">${ICONS.clock}${post.readingTime}</span>
      </div>
      <a href="${href}" class="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy hover:text-orange">
        Lees artikel
        ${ICONS.arrowRight}
      </a>
    </article>`;
}

function featuredCard(post, root) {
  const href = `${root}artikelen/${post.slug}.html`;
  return `<div class="relative">
          <div class="shine-border-orange relative aspect-[4/5] overflow-hidden rounded-lg">
            <img src="${root}${post.cover}" alt="${post.coverAlt ?? post.title}" width="617" height="638" class="h-full w-full object-cover opacity-95" />
            <div class="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/10 to-transparent"></div>
            <div class="absolute top-5 left-5 right-5 rounded-md border border-navy/10 bg-white/95 p-5 backdrop-blur">
              <div class="text-xs font-semibold uppercase tracking-[0.16em] text-orange">${post.category} &middot; Uitgelicht</div>
              <div class="mt-2 text-base font-semibold leading-snug text-black">${post.title}</div>
              <a href="${href}" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-orange">
                Lees artikel
                ${ICONS.arrowRight}
              </a>
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 -z-10 hidden h-40 w-40 rounded-md bg-orange/15 lg:block"></div>
        </div>`;
}

function authorCard(root, { compact = false } = {}) {
  return `<div class="flex flex-col gap-6 rounded-lg border border-hairline bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
      <img src="${root}${AUTHOR.photo}" alt="${AUTHOR.name}" class="h-20 w-20 shrink-0 rounded-full object-cover ${compact ? "" : "sm:h-24 sm:w-24"}" />
      <div>
        <div class="text-xs font-semibold uppercase tracking-[0.16em] text-orange">Over de auteur</div>
        <div class="mt-1.5 font-display text-lg font-semibold text-navy-deep">${AUTHOR.name}</div>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-soft">${AUTHOR.bio}</p>
        <a href="mailto:${AUTHOR.email}" class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-orange">
          ${ICONS.mail} ${AUTHOR.email}
        </a>
      </div>
    </div>`;
}

// ---------------------------------------------------------------------------
// Pagina's
// ---------------------------------------------------------------------------

function page({ root, path, title, description, active, ogImage, body }) {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
${headTags({ title, description, path, root, ogImage })}
</head>
<body class="flex min-h-screen flex-col bg-white font-sans text-ink">

  ${header(root, active)}

  <main class="flex-1">
${body}
  </main>

  ${footer(root)}
</body>
</html>
`;
}

function renderHome() {
  const root = "";
  const featured = featuredPost();
  const rest = sortedPosts().filter((p) => p.slug !== featured.slug).slice(0, 6);

  const body = `
    <!-- Hero -->
    <section class="relative bg-surface">
      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div class="ambient-glow-orange absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full"></div>
        <div class="ambient-glow-navy absolute -bottom-40 -left-20 h-[480px] w-[480px] rounded-full"></div>
        <div class="blueprint-bg blueprint-drift absolute inset-0 opacity-50"></div>
      </div>
      <div class="container-x relative grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div class="lg:col-span-7">
          <div class="section-label">
            ${ICONS.book.replace('class="icon h-4 w-4"', 'class="icon h-3.5 w-3.5"')}
            <span>Ketensamenwerking Blog</span>
          </div>
          <h1 class="mt-5 font-display text-4xl font-semibold leading-[1.05] text-navy-deep md:text-5xl lg:text-6xl">
            Diepgaand onderzoek en praktijkinzichten over ketensamenwerking.
          </h1>
          <div class="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-slate-soft">
            <p>
              Artikelen, onderzoek en publicaties van dr.ing. Marcel Noordhuis over ketensamenwerking
              en RGS in de corporatie-, bouw- en installatiesector &mdash; van wetenschappelijk
              onderzoek tot concrete handvatten voor de praktijk.
            </p>
          </div>
          <div class="mt-9 flex flex-wrap items-center gap-3">
            <a href="artikelen/${featured.slug}.html" class="inline-flex items-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange/90">
              Lees het nieuwste artikel
              ${ICONS.arrowRight}
            </a>
            <a href="artikelen/index.html" class="inline-flex items-center gap-2 rounded-md border border-navy/20 bg-white px-5 py-3 text-sm font-semibold text-navy-deep transition-colors hover:border-navy">
              Alle artikelen
            </a>
          </div>
        </div>

        <div class="relative lg:col-span-5">
          ${featuredCard(featured, root)}
        </div>
      </div>
    </section>

    <!-- Recente artikelen -->
    <section id="artikelen" class="border-t border-hairline bg-white">
      <div class="container-x py-20 md:py-28">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-xl">
            <div class="section-label"><span>Recent gepubliceerd</span></div>
            <h2 class="heading-rule mt-5 font-display text-3xl font-semibold md:text-4xl">Recente artikelen</h2>
          </div>
          <a href="artikelen/index.html" class="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange">
            Bekijk alle artikelen
            ${ICONS.arrowRight}
          </a>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${rest.map((p) => postCard(p, root)).join("\n          ")}
        </div>
      </div>
    </section>

    <!-- Over de auteur -->
    <section class="border-t border-hairline bg-surface">
      <div class="container-x py-16 md:py-20">
        ${authorCard(root)}
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-hairline bg-navy-deep">
      <div class="container-x flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center md:py-20">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-semibold text-white md:text-3xl">Nieuwe artikelen niet missen?</h2>
          <p class="mt-3 text-sm leading-relaxed text-white/70">
            Volg Ketensamenwerking Interim &amp; Advies op LinkedIn voor nieuwe artikelen en updates
            over ketensamenwerking en RGS.
          </p>
        </div>
        <a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer" class="inline-flex shrink-0 items-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange/90">
          Volg op LinkedIn
          ${ICONS.arrowRight}
        </a>
      </div>
    </section>`;

  return page({
    root,
    path: "",
    title: "Ketensamenwerking Blog — kennis en inzichten over ketensamenwerking",
    description: SITE.description,
    active: "home",
    ogImage: featured.cover ?? "assets/kasteel-de-vanenburg.jpg",
    body,
  });
}

function renderArticlesIndex() {
  const root = "../";
  const posts = sortedPosts();

  const chips = ["Alle artikelen", ...CATEGORIES]
    .map(
      (c, i) =>
        `<button type="button" data-filter="${c === "Alle artikelen" ? "all" : slugifyCategory(c)}" class="filter-chip rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${i === 0 ? "border-navy bg-navy text-white" : "border-hairline bg-white text-slate-soft hover:border-navy hover:text-navy"}">${c}</button>`,
    )
    .join("\n          ");

  const cards = posts
    .map(
      (p) =>
        `<div class="post-item" data-category="${slugifyCategory(p.category)}">${postCard(p, root)}</div>`,
    )
    .join("\n          ");

  const body = `
    <section class="border-b border-hairline bg-surface">
      <div class="container-x py-16 md:py-20">
        <div class="section-label"><span>Artikelen</span></div>
        <h1 class="heading-rule mt-5 font-display text-3xl font-semibold md:text-4xl">Alle artikelen</h1>
        <p class="mt-6 max-w-2xl text-base leading-relaxed text-slate-soft">
          Onderzoek, vakartikelen en praktijkinzichten over ketensamenwerking en RGS in de
          corporatie-, bouw- en installatiesector.
        </p>

        <div class="mt-8 flex flex-wrap gap-2" id="filter-bar">
          ${chips}
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="container-x py-16 md:py-20">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="post-grid">
          ${cards}
        </div>
      </div>
    </section>

    <script>
      const chips = document.querySelectorAll(".filter-chip");
      const items = document.querySelectorAll(".post-item");
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((c) => c.classList.remove("border-navy", "bg-navy", "text-white"));
          chips.forEach((c) => c.classList.add("border-hairline", "bg-white", "text-slate-soft"));
          chip.classList.remove("border-hairline", "bg-white", "text-slate-soft");
          chip.classList.add("border-navy", "bg-navy", "text-white");
          const filter = chip.dataset.filter;
          items.forEach((item) => {
            item.hidden = filter !== "all" && item.dataset.category !== filter;
          });
        });
      });
    </script>`;

  return page({
    root,
    path: "artikelen/",
    title: "Alle artikelen — Ketensamenwerking Blog",
    description: "Overzicht van alle artikelen, onderzoek en publicaties over ketensamenwerking en RGS.",
    active: "artikelen",
    ogImage: "assets/kasteel-de-vanenburg.jpg",
    body,
  });
}

function renderPost(post) {
  const root = "../";
  const related = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const coverBlock = post.cover
    ? `<div class="mt-10 aspect-[21/9] w-full overflow-hidden rounded-lg border border-hairline">
            <img src="${root}${post.cover}" alt="${post.coverAlt ?? post.title}" width="940" height="403" class="h-full w-full object-cover" />
          </div>`
    : `<div class="relative mt-10 flex aspect-[21/9] w-full items-center justify-center overflow-hidden rounded-lg border border-hairline bg-navy-deep">
            <div class="blueprint-bg absolute inset-0"></div>
            <div class="ambient-glow-orange absolute -right-20 -top-20 h-72 w-72 rounded-full"></div>
            <span class="relative flex h-16 w-16 items-center justify-center rounded-md bg-white/10 text-orange">${categoryIcon(post.category).replace('class="icon"', 'class="icon h-7 w-7"')}</span>
          </div>`;

  const body = `
    <section class="border-b border-hairline bg-surface">
      <div class="container-x py-16 md:py-24">
        <a href="${root}artikelen/index.html" class="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-orange">
          ${ICONS.arrowLeft}
          Terug naar artikelen
        </a>
        <div class="mt-8">
          <div class="section-label"><span>${post.category}</span></div>
        </div>
        <h1 class="heading-rule mt-5 font-display text-3xl font-semibold text-navy-deep md:text-5xl">${post.title}</h1>
        <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-soft">
          <span class="font-semibold text-navy">${AUTHOR.name}</span>
          <span aria-hidden="true">&middot;</span>
          <span class="inline-flex items-center gap-1.5">${ICONS.calendar}${post.dateLabel}</span>
          <span aria-hidden="true">&middot;</span>
          <span class="inline-flex items-center gap-1.5">${ICONS.clock}${post.readingTime}</span>
        </div>
        ${coverBlock}
      </div>
    </section>

    <section class="bg-white">
      <div class="container-x max-w-3xl py-16 md:py-24">
        <div class="prose-article">
${post.bodyHtml}
        </div>

        ${
          post.externalHref
            ? `<a href="${post.externalHref}" target="_blank" rel="noopener noreferrer" class="mt-10 inline-flex items-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange/90">
          ${post.externalLabel ?? "Lees het volledige artikel"}
          ${ICONS.arrowRight}
        </a>`
            : ""
        }

        <div class="mt-16 border-t border-hairline pt-12">
          ${authorCard(root, { compact: true })}
        </div>
      </div>
    </section>

    ${
      related.length
        ? `<section class="border-t border-hairline bg-surface">
      <div class="container-x py-16 md:py-20">
        <div class="section-label"><span>Meer artikelen</span></div>
        <h2 class="heading-rule mt-5 font-display text-2xl font-semibold md:text-3xl">Lees ook</h2>
        <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${related.map((p) => postCard(p, root)).join("\n          ")}
        </div>
      </div>
    </section>`
        : ""
    }`;

  return page({
    root,
    path: `artikelen/${post.slug}.html`,
    title: `${post.title.replace(/&[a-z]+;/g, (m) => ({ "&rsquo;": "’", "&ldquo;": "“", "&rdquo;": "”" }[m] ?? m))} — Ketensamenwerking Blog`,
    description: post.excerpt,
    active: "artikelen",
    ogImage: post.cover ?? "assets/kasteel-de-vanenburg.jpg",
    body,
  });
}

function renderOver() {
  const root = "";
  const body = `
    <section class="relative border-b border-hairline bg-surface">
      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div class="ambient-glow-orange absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full"></div>
        <div class="blueprint-bg blueprint-drift absolute inset-0 opacity-40"></div>
      </div>
      <div class="container-x relative py-16 md:py-24">
        <div class="section-label"><span>Over</span></div>
        <h1 class="heading-rule mt-5 font-display text-3xl font-semibold md:text-4xl">Over Ketensamenwerking Blog</h1>
        <p class="mt-6 max-w-2xl text-base leading-relaxed text-slate-soft">
          Ketensamenwerking.blog bundelt onderzoek, vakartikelen en praktijkinzichten over
          ketensamenwerking en RGS in de corporatie-, bouw- en installatiesector. Een initiatief van
          Ketensamenwerking Interim &amp; Advies.
        </p>
      </div>
    </section>

    <section class="bg-white">
      <div class="container-x py-16 md:py-20">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <img src="${AUTHOR.photo}" alt="${AUTHOR.name}" class="aspect-[4/5] w-full rounded-lg border border-hairline object-cover" />
          </div>
          <div class="lg:col-span-8">
            <div class="section-label"><span>Auteur</span></div>
            <h2 class="heading-rule mt-5 font-display text-2xl font-semibold text-navy-deep md:text-3xl">${AUTHOR.name}</h2>
            <p class="mt-6 max-w-2xl text-base leading-relaxed text-slate-soft">${AUTHOR.bio}</p>
            <p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-soft">
              In april 2015 is Marcel gepromoveerd aan Nyenrode Business Universiteit op zijn
              onderzoek naar de waarde van ketensamenwerking bij nieuwbouw-, onderhouds- en
              renovatieprojecten. Via Ketensamenwerking Interim &amp; Advies begeleidt hij sindsdien
              woningcorporaties, bouwbedrijven en installateurs bij het inrichten, evalueren en
              verbeteren van ketensamenwerking.
            </p>
            <ul class="mt-8 space-y-3">
              <li class="flex gap-3 text-base leading-relaxed text-slate-soft"><span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true"></span>Gepromoveerd op ketensamenwerking in bouw en vastgoed</li>
              <li class="flex gap-3 text-base leading-relaxed text-slate-soft"><span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true"></span>Specialist in complexe samenwerkingsverbanden</li>
              <li class="flex gap-3 text-base leading-relaxed text-slate-soft"><span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true"></span>Ervaring met corporaties, bouwers en installateurs</li>
              <li class="flex gap-3 text-base leading-relaxed text-slate-soft"><span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true"></span>Praktische én wetenschappelijk onderbouwde aanpak</li>
            </ul>
            <div class="mt-9 flex flex-wrap items-center gap-3">
              <a href="mailto:${SITE.email}" class="inline-flex items-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange/90">
                ${ICONS.mail} Neem contact op
              </a>
              <a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-md border border-navy/20 bg-white px-5 py-3 text-sm font-semibold text-navy-deep transition-colors hover:border-navy">
                ${ICONS.linkedin} LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-hairline bg-surface">
      <div class="container-x py-16 md:py-20">
        <div class="section-label"><span>Ook interessant</span></div>
        <h2 class="heading-rule mt-5 font-display text-2xl font-semibold md:text-3xl">Onze andere platformen</h2>
        <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <a href="${SITE.siteUrl}" target="_blank" rel="noopener noreferrer" class="flex flex-col rounded-lg border border-hairline bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-navy/5 text-navy">${ICONS.globe}</span>
            <h3 class="mt-4 font-display text-lg font-semibold text-navy-deep">Ketensamenwerking Interim &amp; Advies</h3>
            <p class="mt-3 text-sm leading-relaxed text-slate-soft">Analyse, strategie en ketenregie voor complexe samenwerkingen in bouw, vastgoed, onderhoud en publieke opgaven.</p>
            <span class="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy">ketensamenwerking.nl ${ICONS.arrowRight}</span>
          </a>
          <a href="${SITE.platformUrl}" target="_blank" rel="noopener noreferrer" class="flex flex-col rounded-lg border border-hairline bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-navy/5 text-navy">${ICONS.book}</span>
            <h3 class="mt-4 font-display text-lg font-semibold text-navy-deep">Platform Ketensamenwerking</h3>
            <p class="mt-3 text-sm leading-relaxed text-slate-soft">Kennissessies voor executives en high potentials rondom ketensamenwerking, in samenwerking met Nyenrode Business Universiteit.</p>
            <span class="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy">platform-ketensamenwerking.nl ${ICONS.arrowRight}</span>
          </a>
        </div>
      </div>
    </section>`;

  return page({
    root,
    path: "over.html",
    title: "Over — Ketensamenwerking Blog",
    description: `Over ${AUTHOR.name} en Ketensamenwerking Blog: kennis en inzichten over ketensamenwerking in bouw en vastgoed.`,
    active: "over",
    ogImage: AUTHOR.photo,
    body,
  });
}

// ---------------------------------------------------------------------------
// Schrijf alle bestanden
// ---------------------------------------------------------------------------

mkdirSync(join(ROOT, "artikelen"), { recursive: true });

writeFileSync(join(ROOT, "index.html"), renderHome());
writeFileSync(join(ROOT, "over.html"), renderOver());
writeFileSync(join(ROOT, "artikelen", "index.html"), renderArticlesIndex());
for (const post of POSTS) {
  writeFileSync(join(ROOT, "artikelen", `${post.slug}.html`), renderPost(post));
}

console.log(`Gegenereerd: index.html, over.html, artikelen/index.html en ${POSTS.length} artikelpagina's.`);
