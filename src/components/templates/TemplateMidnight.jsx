import { Calendar, Clock, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import {
  GALLERY_IMAGES,
  buildWhatsAppLink,
  formatMalayDate,
  sanitizeUrl,
} from '../../utils/cardHelpers'
import QrGiftSection from '../QrGiftSection'
import CountdownSection from '../CountdownSection'
import GuestbookSection from '../GuestbookSection'

export default function TemplateMidnight({ data, isOpen, onOpen, wishes, onAddWish }) {
  const dateInfo = formatMalayDate(data.eventDate)
  const formattedDate = typeof dateInfo === 'string' ? dateInfo : dateInfo.full
  const withDay = typeof dateInfo === 'string' ? dateInfo : dateInfo.withDay
  const waHref = buildWhatsAppLink(data.whatsappPhone, data.brideName, data.groomName)
  const mapsHref = sanitizeUrl(data.mapsUrl)
  const midnightBg = `${import.meta.env.BASE_URL || '/'}assets/midnight-elegance-bg.jpg`

  if (!isOpen) {
    return (
      <div
        className="font-sans-modern relative flex min-h-[640px] w-full flex-col items-center justify-center overflow-hidden px-6 py-10 text-center"
        style={{
          backgroundColor: '#0b132b',
          backgroundImage: `url('${midnightBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#f8fafc',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(11,19,43,0.45) 0%, rgba(6,10,23,0.72) 85%)',
          }}
        />

        <div className="relative z-10 w-full px-4 py-8">
          <p className="font-arabic mb-3 text-xl" style={{ color: '#cbd5e1' }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <p
            className="mb-4 text-[10px] font-bold tracking-[0.35em] uppercase"
            style={{ color: '#d4af37' }}
          >
            THE WEDDING CELEBRATION
          </p>

          <h2 className="text-4xl leading-tight font-bold tracking-tight" style={{ color: '#ffffff' }}>
            <span className="block">{data.brideName || 'Fatima'}</span>
            <span className="my-1 block text-xl font-light" style={{ color: '#d4af37' }}>
              &amp;
            </span>
            <span className="block">{data.groomName || 'Ahmed'}</span>
          </h2>

          <p className="mt-4 mb-8 text-xs font-medium tracking-[0.2em] uppercase" style={{ color: '#cbd5e1' }}>
            {formattedDate}
          </p>

          <button
            id="preview-open-invitation-btn"
            type="button"
            onClick={onOpen}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold tracking-[0.14em] uppercase shadow-xl transition-transform hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #b38e24 100%)',
              color: '#0b132b',
              border: '1px solid #f3d87a',
            }}
          >
            <Sparkles className="h-4 w-4" />
            <span>Buka Jemputan</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="font-sans-modern animate-fade-up w-full"
      style={{ backgroundColor: '#0b132b', color: '#f1f5f9' }}
    >
      {/* Header */}
      <header
        className="px-6 py-9 text-center"
        style={{
          background: 'linear-gradient(180deg, #060a17 0%, #0b132b 100%)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.35)',
        }}
      >
        <p className="font-arabic mb-2 text-lg" style={{ color: '#cbd5e1' }} dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="mb-2 text-[10px] font-bold tracking-[0.32em] uppercase" style={{ color: '#d4af37' }}>
          MIDNIGHT ELEGANCE
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {data.brideName || 'Fatima'}{' '}
          <span className="font-light" style={{ color: '#d4af37' }}>
            &amp;
          </span>{' '}
          {data.groomName || 'Ahmed'}
        </h2>
        <p
          className="mt-3 inline-block rounded-full px-4 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase"
          style={{ border: '1px solid rgba(203, 213, 225, 0.35)', color: '#cbd5e1' }}
        >
          {withDay}
        </p>
      </header>

      {/* Quote */}
      <section className="px-5 py-7 text-center">
        <div
          className="rounded-2xl px-5 py-5"
          style={{ backgroundColor: '#121d3b', border: '1px solid rgba(212, 175, 55, 0.3)' }}
        >
          <p className="mb-3 text-xs leading-relaxed italic" style={{ color: '#cbd5e1' }}>
            &ldquo;{data.quote}&rdquo;
          </p>
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: '#d4af37' }}>
            &mdash; {data.quoteSource || 'Surah Ar-Rum, Ayat 21'}
          </p>
        </div>
      </section>

      {/* Couple & Parents */}
      <section
        className="px-5 py-7 text-center"
        style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
      >
        <p className="text-[10px] font-bold tracking-[0.26em] uppercase" style={{ color: '#cbd5e1' }}>
          Mempelai Yang Diraikan
        </p>
        <h3 className="mt-1 mb-4 text-lg font-bold tracking-[0.06em] uppercase text-white">
          Keluarga &amp; Pengantin
        </h3>

        <div
          className="mb-4 rounded-xl px-4 py-3 text-xs"
          style={{ backgroundColor: '#121d3b', border: '1px solid rgba(203, 213, 225, 0.2)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: '#d4af37' }}>
            Dengan Restu Ibu Bapa
          </p>
          <p className="mt-1.5 font-medium text-slate-200">{data.brideParents}</p>
          <p className="mt-1 font-medium text-slate-200">{data.groomParents}</p>
        </div>

        <div
          className="rounded-2xl px-4 py-5"
          style={{
            background: 'linear-gradient(145deg, #162244 0%, #091024 100%)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
          }}
        >
          <p className="text-xl font-bold tracking-tight" style={{ color: '#f3d87a' }}>
            {data.brideName || 'Fatima Az-Zahra'}
          </p>
          <p className="my-1 text-sm font-light" style={{ color: '#cbd5e1' }}>
            &amp;
          </p>
          <p className="text-xl font-bold tracking-tight" style={{ color: '#f3d87a' }}>
            {data.groomName || 'Ahmed Faris'}
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section
        className="px-5 py-7 text-center"
        style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
      >
        <p className="text-[10px] font-bold tracking-[0.26em] uppercase" style={{ color: '#cbd5e1' }}>
          Aturcara
        </p>
        <h3 className="mt-1 mb-4 text-lg font-bold tracking-[0.06em] uppercase text-white">
          Butiran Majlis
        </h3>

        <div
          className="rounded-2xl p-4 text-left text-xs"
          style={{ backgroundColor: '#121d3b', border: '1px solid rgba(212, 175, 55, 0.35)' }}
        >
          <div className="space-y-2.5 text-slate-200">
            <p className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: '#d4af37' }} />
              <span>
                <strong>Tarikh:</strong> {withDay}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: '#d4af37' }} />
              <span>
                <strong>Akad Nikah:</strong> {data.akadTime || '9:00 Pagi'}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: '#d4af37' }} />
              <span>
                <strong>Jamuan:</strong> {data.eventTime || '12:00 Tengahari'}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: '#d4af37' }} />
              <span>
                <strong>Lokasi:</strong> {data.locationName || 'Dewan Seri Perdana'}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2.5">
          <a
            id="btn-google-maps"
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-bold tracking-wider uppercase transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#121d3b', color: '#cbd5e1', border: '1px solid #cbd5e1' }}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Buka di Google Maps</span>
          </a>

          <a
            id="btn-rsvp-whatsapp"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-bold tracking-wider uppercase transition-opacity hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #b38e24 100%)',
              color: '#0b132b',
            }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>RSVP via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section
        className="px-5 py-7 text-center"
        style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
      >
        <p className="text-[10px] font-bold tracking-[0.26em] uppercase" style={{ color: '#cbd5e1' }}>
          Galeri
        </p>
        <h3 className="mt-1 mb-4 text-lg font-bold tracking-[0.06em] uppercase text-white">
          Detik Eksklusif
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.src}
              className="aspect-square overflow-hidden rounded-xl"
              style={{ border: '1px solid rgba(212, 175, 55, 0.35)' }}
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <CountdownSection data={data} variant="midnight" />
      <QrGiftSection data={data} variant="midnight" />
      <GuestbookSection data={data} wishes={wishes} onAddWish={onAddWish} variant="midnight" />

      {/* Footer */}
      <footer
        className="px-5 py-7 text-center"
        style={{ backgroundColor: '#060a17', borderTop: '1px solid rgba(212, 175, 55, 0.35)' }}
      >
        <p className="mb-2 text-sm font-bold tracking-wider uppercase" style={{ color: '#f3d87a' }}>
          Terima Kasih
        </p>
        <p className="mb-3 text-xs leading-relaxed text-slate-300">{data.closingNote}</p>
        <p className="text-sm font-bold tracking-wide text-slate-200">
          {data.brideName || 'Fatima'} &amp; {data.groomName || 'Ahmed'}
        </p>
      </footer>
    </div>
  )
}
