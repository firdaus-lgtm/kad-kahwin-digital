import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

const MALAY_MONTHS = [
  'Januari',
  'Februari',
  'Mac',
  'April',
  'Mei',
  'Jun',
  'Julai',
  'Ogos',
  'September',
  'Oktober',
  'November',
  'Disember',
]

const MALAY_DAYS = [
  'Ahad',
  'Isnin',
  'Selasa',
  'Rabu',
  'Khamis',
  'Jumaat',
  'Sabtu',
]

const BASE = import.meta.env.BASE_URL || '/'

export const GALLERY_IMAGES = [
  { src: `${BASE}assets/gallery-1.jpg`, alt: 'Cincin perkahwinan emas' },
  { src: `${BASE}assets/gallery-2.jpg`, alt: 'Pasangan mempelai di gerbang bunga' },
  { src: `${BASE}assets/gallery-3.jpg`, alt: 'Seri inai dan jambangan bunga' },
  { src: `${BASE}assets/gallery-4.jpg`, alt: 'Susunan meja jamuan walimatul urus' },
]

export function formatMalayDate(isoDate) {
  if (!isoDate) return '20 Julai 2024'
  const parts = isoDate.split('-').map(Number)
  if (parts.length !== 3 || parts.some(Number.isNaN)) return isoDate
  const [year, month, day] = parts
  const dateObj = new Date(year, month - 1, day)
  const dayName = MALAY_DAYS[dateObj.getDay()] || ''
  const monthName = MALAY_MONTHS[month - 1] || ''
  return {
    full: `${day} ${monthName} ${year}`,
    withDay: `${dayName}, ${day} ${monthName} ${year}`,
    day: String(day).padStart(2, '0'),
    month: monthName,
    year: String(year),
    dayName,
  }
}

export function buildWhatsAppLink(phone, brideName, groomName) {
  const cleaned = (phone || '60123456789').replace(/[^0-9]/g, '')
  const number = cleaned.startsWith('0') ? `6${cleaned}` : cleaned || '60123456789'
  const message = `Hi, saya ingin mengesahkan kehadiran ke majlis perkahwinan ${brideName || 'Pengantin'} & ${groomName || 'Pasangan'}.`
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function sanitizeUrl(url) {
  if (!url) return 'https://maps.google.com'
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function generateStandaloneHtml(cardData, templateId) {
  const dateInfo = formatMalayDate(cardData.eventDate)
  const formattedDate = typeof dateInfo === 'string' ? dateInfo : dateInfo.withDay
  const waHref = buildWhatsAppLink(cardData.whatsappPhone, cardData.brideName, cardData.groomName)
  const mapsHref = sanitizeUrl(cardData.mapsUrl)

  const themes = {
    royal: {
      name: 'Royal Burgundy',
      bg: '#3a050b',
      sheetBg: '#fcf8f2',
      heroBg: '#5c0a14',
      heroText: '#fcf8f2',
      accent: '#cfa855',
      primary: '#5c0a14',
      text: '#2c181a',
      muted: '#61474a',
      headingFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Lato', sans-serif",
      cardBg: '#ffffff',
      border: 'rgba(207, 168, 85, 0.45)',
    },
    minimal: {
      name: 'Modern Minimalist',
      bg: '#e7e5e4',
      sheetBg: '#ffffff',
      heroBg: '#1c1917',
      heroText: '#fafaf9',
      accent: '#78716c',
      primary: '#1c1917',
      text: '#1c1917',
      muted: '#57534e',
      headingFont: "'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      cardBg: '#fafaf9',
      border: '#e7e5e4',
    },
    floral: {
      name: 'Floral Pastel',
      bg: '#f5ebe9',
      sheetBg: '#fffafa',
      heroBg: '#fdf2f5',
      heroText: '#4a353b',
      accent: '#5c7361',
      primary: '#9d5c6c',
      text: '#4a353b',
      muted: '#7a5f66',
      headingFont: "'Great Vibes', cursive",
      bodyFont: "'Cormorant Garamond', Georgia, serif",
      cardBg: '#ffffff',
      border: '#ebd6dc',
    },
    botanical: {
      name: 'Rustic Botanical',
      bg: '#e5e8dc',
      sheetBg: '#f9f7f0',
      heroBg: '#3a4a24',
      heroText: '#f9f7f0',
      accent: '#8fa368',
      primary: '#4a5d23',
      text: '#2f3822',
      muted: '#5d664e',
      headingFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Lato', sans-serif",
      cardBg: '#ffffff',
      border: '#c5ccb2',
    },
    midnight: {
      name: 'Midnight Elegance',
      bg: '#060a17',
      sheetBg: '#0b132b',
      heroBg: '#070d1f',
      heroText: '#f8fafc',
      accent: '#d4af37',
      primary: '#d4af37',
      text: '#f1f5f9',
      muted: '#cbd5e1',
      headingFont: "'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      cardBg: '#121d3b',
      border: 'rgba(212, 175, 55, 0.35)',
    },
    terracotta: {
      name: 'Terracotta Boho',
      bg: '#ebd9c8',
      sheetBg: '#fbf6f0',
      heroBg: '#9e4129',
      heroText: '#fbf6f0',
      accent: '#d48c6a',
      primary: '#b85035',
      text: '#4a2e23',
      muted: '#7d5a48',
      headingFont: "'Cormorant Garamond', Georgia, serif",
      bodyFont: "'Lato', sans-serif",
      cardBg: '#ffffff',
      border: '#dfc3ab',
    },
  }

  const t = themes[templateId] || themes.royal

  return `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Walimatul Urus — ${escapeHtml(cardData.brideName)} &amp; ${escapeHtml(cardData.groomName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Great+Vibes&family=Lato:wght@400;700&family=Playfair+Display:ital,wght@0,600;1,400&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: ${t.bg}; color: ${t.text}; font-family: ${t.bodyFont}; line-height: 1.65; }
    .cover { position: fixed; inset: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; background: ${t.heroBg}; color: ${t.heroText}; transition: transform 0.75s ease, opacity 0.65s ease; }
    .cover.opened { transform: translateY(-100%); opacity: 0; pointer-events: none; }
    .bismillah { font-family: 'Amiri', serif; font-size: 1.5rem; color: ${t.accent}; margin: 0 0 12px; }
    .kicker { font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: ${t.accent}; margin: 0 0 10px; }
    .names { font-family: ${t.headingFont}; font-size: 2.8rem; margin: 0 0 14px; line-height: 1.15; }
    .btn-open { margin-top: 22px; padding: 14px 30px; border-radius: 999px; border: 1px solid ${t.accent}; background: ${t.accent}; color: #ffffff; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; }
    main { max-width: 460px; margin: 0 auto; background: ${t.sheetBg}; min-height: 100vh; display: none; }
    main.visible { display: block; }
    .section { padding: 32px 22px; text-align: center; border-bottom: 1px solid ${t.border}; }
    .hero { background: ${t.heroBg}; color: ${t.heroText}; padding: 44px 22px; }
    .card { background: ${t.cardBg}; border: 1px solid ${t.border}; border-radius: 14px; padding: 20px; margin-top: 14px; text-align: left; }
    .actions { display: grid; gap: 10px; margin-top: 18px; }
    .btn { display: block; text-align: center; padding: 13px 18px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 0.9rem; }
    .btn-primary { background: ${t.primary}; color: #ffffff; }
    .btn-outline { border: 1.5px solid ${t.primary}; color: ${t.primary}; background: transparent; }
  </style>
</head>
<body>
  <section id="cover" class="cover">
    <p class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
    <p class="kicker">Walimatul Urus</p>
    <h1 class="names">${escapeHtml(cardData.brideName)} &amp; ${escapeHtml(cardData.groomName)}</h1>
    <p>${escapeHtml(formattedDate)}</p>
    <button id="openBtn" class="btn-open" type="button">Buka Jemputan</button>
  </section>

  <main id="content">
    <header class="section hero">
      <p class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      <p class="kicker">Walimatul Urus</p>
      <h2 class="names">${escapeHtml(cardData.brideName)} &amp; ${escapeHtml(cardData.groomName)}</h2>
      <p>${escapeHtml(formattedDate)}</p>
    </header>

    <section class="section">
      <blockquote style="margin:0 0 10px; font-style:italic; color:${t.muted};">&ldquo;${escapeHtml(cardData.quote)}&rdquo;</blockquote>
      <p style="margin:0; font-size:0.8rem; font-weight:700; color:${t.accent};">&mdash; ${escapeHtml(cardData.quoteSource)}</p>
    </section>

    <section class="section">
      <p class="kicker">Butiran Majlis</p>
      <div class="card">
        <p style="margin:0 0 6px;"><strong>Tarikh:</strong> ${escapeHtml(formattedDate)}</p>
        <p style="margin:0 0 6px;"><strong>Akad Nikah:</strong> ${escapeHtml(cardData.akadTime)}</p>
        <p style="margin:0 0 6px;"><strong>Walimatul Urus:</strong> ${escapeHtml(cardData.eventTime)}</p>
        <p style="margin:0;"><strong>Lokasi:</strong> ${escapeHtml(cardData.locationName)}</p>
      </div>
      <div class="actions">
        <a class="btn btn-outline" href="${escapeHtml(mapsHref)}" target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>
        <a class="btn btn-primary" href="${escapeHtml(waHref)}" target="_blank" rel="noopener noreferrer">RSVP via WhatsApp</a>
      </div>
    </section>

    ${cardData.showDuitNowQr ? `<section class="section">
      <p class="kicker">Hadiah &amp; Salam Kaut (DuitNow)</p>
      <div class="card" style="text-align:center;">
        ${cardData.duitNowQrImage ? `<img src="${cardData.duitNowQrImage}" alt="DuitNow QR" style="width:160px;height:160px;object-fit:contain;margin:0 auto 12px;border-radius:10px;" />` : ''}
        <p style="margin:0 0 4px;"><strong>${escapeHtml(cardData.bankName || 'Maybank')}</strong></p>
        <p style="margin:0 0 4px; color:${t.muted};">${escapeHtml(cardData.bankHolder || cardData.brideName)}</p>
        <p style="margin:0; font-family:monospace; font-size:1rem; font-weight:700;">${escapeHtml(cardData.bankAccount || '')}</p>
      </div>
    </section>` : ''}

    <footer class="section" style="background:${t.heroBg}; color:${t.heroText};">
      <p style="margin:0 0 10px;">${escapeHtml(cardData.closingNote)}</p>
      <p style="margin:0; font-family:${t.headingFont}; font-size:1.5rem; color:${t.accent};">${escapeHtml(cardData.brideName)} &amp; ${escapeHtml(cardData.groomName)}</p>
    </footer>
  </main>

  <script>
    document.getElementById('openBtn').addEventListener('click', function () {
      document.getElementById('cover').classList.add('opened');
      document.getElementById('content').classList.add('visible');
    });
  </script>
</body>
</html>`
}

export async function exportCardToPdf(element, filename = 'kad-kahwin-digital.pdf') {
  if (!element) throw new Error('Elemen kad tidak dijumpai untuk eksport PDF.')

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  })

  const imgData = canvas.toDataURL('image/jpeg', 0.94)
  const pdfWidth = 105 // mm (mobile-friendly portrait card width)
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [pdfWidth, Math.max(pdfHeight, 148)],
  })

  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(filename)
}
