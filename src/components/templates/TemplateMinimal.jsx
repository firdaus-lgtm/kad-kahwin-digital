import { ArrowUpRight, Calendar, Clock, MapPin, MessageCircle } from 'lucide-react'
import {
  GALLERY_IMAGES,
  buildWhatsAppLink,
  formatMalayDate,
  sanitizeUrl,
} from '../../utils/cardHelpers'
import QrGiftSection from '../QrGiftSection'
import CountdownSection from '../CountdownSection'
import GuestbookSection from '../GuestbookSection'

export default function TemplateMinimal({ data, isOpen, onOpen, wishes, onAddWish }) {
  const dateInfo = formatMalayDate(data.eventDate)
  const formattedDate = typeof dateInfo === 'string' ? dateInfo : dateInfo.full
  const dayNum = typeof dateInfo === 'string' ? '20' : dateInfo.day
  const monthName = typeof dateInfo === 'string' ? 'Julai' : dateInfo.month
  const yearNum = typeof dateInfo === 'string' ? '2024' : dateInfo.year
  const waHref = buildWhatsAppLink(data.whatsappPhone, data.brideName, data.groomName)
  const mapsHref = sanitizeUrl(data.mapsUrl)

  if (!isOpen) {
    return (
      <div
        className="font-sans-modern flex min-h-[640px] w-full flex-col justify-between p-6"
        style={{ backgroundColor: '#ffffff', color: '#1c1917' }}
      >
        <div
          className="flex items-center justify-between pb-4 text-[10px] font-semibold tracking-[0.22em] uppercase"
          style={{ borderBottom: '1px solid #e7e5e4', color: '#78716c' }}
        >
          <span>WALIMATUL URUS</span>
          <span>{yearNum}</span>
        </div>

        <div className="my-auto py-10 text-left">
          <p className="font-arabic mb-5 text-lg" style={{ color: '#57534e' }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <p className="mb-3 text-[11px] font-semibold tracking-[0.26em] uppercase" style={{ color: '#78716c' }}>
            THE WEDDING OF
          </p>

          <h2 className="text-4xl leading-[1.08] font-bold tracking-tight" style={{ color: '#1c1917' }}>
            <span className="block">{data.brideName || 'Fatima'}</span>
            <span className="my-1 block text-xl font-normal" style={{ color: '#a8a29e' }}>
              &amp;
            </span>
            <span className="block">{data.groomName || 'Ahmed'}</span>
          </h2>

          <div
            className="mt-7 grid grid-cols-2 gap-3 pt-4 text-xs"
            style={{ borderTop: '1px solid #e7e5e4', color: '#57534e' }}
          >
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: '#a8a29e' }}>
                TARIKH
              </p>
              <p className="mt-1 font-semibold" style={{ color: '#1c1917' }}>
                {formattedDate}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: '#a8a29e' }}>
                LOKASI
              </p>
              <p className="mt-1 line-clamp-2 font-semibold" style={{ color: '#1c1917' }}>
                {data.locationName || 'Dewan Seri Perdana'}
              </p>
            </div>
          </div>
        </div>

        <button
          id="preview-open-invitation-btn"
          type="button"
          onClick={onOpen}
          className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-xs font-semibold tracking-[0.18em] uppercase transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#1c1917', color: '#ffffff' }}
        >
          <span>Buka Jemputan</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="font-sans-modern animate-fade-up w-full" style={{ backgroundColor: '#ffffff', color: '#1c1917' }}>
      {/* Editorial Header */}
      <header className="px-6 py-8" style={{ backgroundColor: '#1c1917', color: '#fafaf9' }}>
        <div className="mb-5 flex items-center justify-between text-[10px] tracking-[0.24em] uppercase" style={{ color: '#a8a29e' }}>
          <span>JEMPUTAN RASMI</span>
          <span>{dayNum}.{monthName.slice(0, 3).toUpperCase()}.{yearNum}</span>
        </div>
        <h2 className="text-3xl leading-tight font-bold tracking-tight">
          {data.brideName || 'Fatima'} <span style={{ color: '#a8a29e' }}>&amp;</span>{' '}
          {data.groomName || 'Ahmed'}
        </h2>
        <p className="mt-2 text-xs" style={{ color: '#d6d3d1' }}>
          {formattedDate} &middot; {data.locationName || 'Dewan Seri Perdana'}
        </p>
      </header>

      {/* Quote Grid Block */}
      <section className="px-6 py-7" style={{ borderBottom: '1px solid #e7e5e4' }}>
        <p className="mb-2 text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#78716c' }}>
          01 / PETIKAN
        </p>
        <blockquote className="text-xs leading-relaxed" style={{ color: '#44403c' }}>
          &ldquo;{data.quote}&rdquo;
        </blockquote>
        <p className="mt-2.5 text-[11px] font-semibold" style={{ color: '#1c1917' }}>
          &mdash; {data.quoteSource || 'Surah Ar-Rum, Ayat 21'}
        </p>
      </section>

      {/* Couple & Parents Grid */}
      <section className="px-6 py-7" style={{ borderBottom: '1px solid #e7e5e4' }}>
        <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#78716c' }}>
          02 / MEMPELAI &amp; KELUARGA
        </p>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4" style={{ backgroundColor: '#f5f5f4', border: '1px solid #e7e5e4' }}>
            <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: '#78716c' }}>
              Pengantin Perempuan
            </p>
            <p className="mt-1 text-base font-bold" style={{ color: '#1c1917' }}>
              {data.brideName || 'Fatima Az-Zahra'}
            </p>
            <p className="mt-1 text-xs" style={{ color: '#57534e' }}>
              Puteri kepada {data.brideParents}
            </p>
          </div>
          <div className="p-4" style={{ backgroundColor: '#f5f5f4', border: '1px solid #e7e5e4' }}>
            <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: '#78716c' }}>
              Pengantin Lelaki
            </p>
            <p className="mt-1 text-base font-bold" style={{ color: '#1c1917' }}>
              {data.groomName || 'Ahmed Faris'}
            </p>
            <p className="mt-1 text-xs" style={{ color: '#57534e' }}>
              Putera kepada {data.groomParents}
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="px-6 py-7" style={{ borderBottom: '1px solid #e7e5e4' }}>
        <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#78716c' }}>
          03 / BUTIRAN MAJLIS
        </p>

        <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: '#e7e5e4', border: '1px solid #e7e5e4' }}>
          <div className="p-3.5" style={{ backgroundColor: '#ffffff' }}>
            <Calendar className="mb-2 h-4 w-4" style={{ color: '#1c1917' }} />
            <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: '#78716c' }}>
              Tarikh
            </p>
            <p className="mt-1 text-xs font-semibold" style={{ color: '#1c1917' }}>
              {formattedDate}
            </p>
          </div>

          <div className="p-3.5" style={{ backgroundColor: '#ffffff' }}>
            <Clock className="mb-2 h-4 w-4" style={{ color: '#1c1917' }} />
            <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: '#78716c' }}>
              Masa
            </p>
            <p className="mt-1 text-xs font-semibold" style={{ color: '#1c1917' }}>
              Akad: {data.akadTime || '9:00 Pagi'}
            </p>
            <p className="text-[11px]" style={{ color: '#57534e' }}>
              Jamuan: {data.eventTime || '12:00 Tengahari'}
            </p>
          </div>

          <div className="col-span-2 p-3.5" style={{ backgroundColor: '#ffffff' }}>
            <MapPin className="mb-2 h-4 w-4" style={{ color: '#1c1917' }} />
            <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: '#78716c' }}>
              Lokasi Majlis
            </p>
            <p className="mt-1 text-xs font-semibold" style={{ color: '#1c1917' }}>
              {data.locationName || 'Dewan Seri Perdana'}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2">
          <a
            id="btn-google-maps"
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-[0.12em] uppercase"
            style={{ border: '1.5px solid #1c1917', color: '#1c1917', backgroundColor: '#ffffff' }}
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Google Maps
            </span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <a
            id="btn-rsvp-whatsapp"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-[0.12em] uppercase"
            style={{ backgroundColor: '#1c1917', color: '#ffffff' }}
          >
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="h-3.5 w-3.5" />
              RSVP via WhatsApp
            </span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-7" style={{ borderBottom: '1px solid #e7e5e4' }}>
        <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#78716c' }}>
          04 / GALERI
        </p>
        <div className="grid grid-cols-2 gap-2">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.src} className="aspect-square overflow-hidden" style={{ backgroundColor: '#f5f5f4' }}>
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Kiraan Detik (Countdown) */}
      <CountdownSection data={data} variant="minimal" />

      {/* Kod QR Lokasi & DuitNow */}
      <QrGiftSection data={data} variant="minimal" />

      {/* Buku Ucapan Tetamu (Guestbook) */}
      <GuestbookSection data={data} wishes={wishes} onAddWish={onAddWish} variant="minimal" />

      {/* Footer */}
      <footer className="px-6 py-7 text-left" style={{ backgroundColor: '#fafaf9' }}>
        <p className="text-xs leading-relaxed" style={{ color: '#57534e' }}>
          {data.closingNote}
        </p>
        <p className="mt-4 text-sm font-bold tracking-tight" style={{ color: '#1c1917' }}>
          {data.brideName || 'Fatima'} &amp; {data.groomName || 'Ahmed'}
        </p>
      </footer>
    </div>
  )
}
