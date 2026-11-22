import { Calendar, Clock, MapPin, MessageCircle, Sun } from 'lucide-react'
import {
  GALLERY_IMAGES,
  buildWhatsAppLink,
  formatMalayDate,
  sanitizeUrl,
} from '../../utils/cardHelpers'
import QrGiftSection from '../QrGiftSection'
import CountdownSection from '../CountdownSection'
import GuestbookSection from '../GuestbookSection'

export default function TemplateTerracotta({ data, isOpen, onOpen, wishes, onAddWish }) {
  const dateInfo = formatMalayDate(data.eventDate)
  const formattedDate = typeof dateInfo === 'string' ? dateInfo : dateInfo.full
  const withDay = typeof dateInfo === 'string' ? dateInfo : dateInfo.withDay
  const waHref = buildWhatsAppLink(data.whatsappPhone, data.brideName, data.groomName)
  const mapsHref = sanitizeUrl(data.mapsUrl)
  const bohoBg = `${import.meta.env.BASE_URL || '/'}assets/terracotta-boho-bg.jpg`

  if (!isOpen) {
    return (
      <div
        className="font-serif-floral relative flex min-h-[640px] w-full flex-col items-center justify-center overflow-hidden px-6 py-10 text-center"
        style={{
          backgroundColor: '#f3e5d8',
          backgroundImage: `url('${bohoBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#4a2e23',
        }}
      >
        <div
          className="relative z-10 w-full rounded-t-[120px] rounded-b-3xl px-5 pt-12 pb-8 shadow-sm"
          style={{
            backgroundColor: 'rgba(251, 246, 240, 0.88)',
            border: '1px solid #dfc3ab',
          }}
        >
          <p className="font-arabic mb-2 text-lg" style={{ color: '#a64d32' }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <p
            className="mb-2 text-[11px] font-semibold tracking-[0.26em] uppercase"
            style={{ color: '#a64d32' }}
          >
            WALIMATUL URUS
          </p>

          <h2 className="text-4xl leading-tight font-semibold" style={{ color: '#7a3420' }}>
            <span className="block">{data.brideName || 'Fatima'}</span>
            <span className="my-1 block text-2xl font-normal italic" style={{ color: '#b85035' }}>
              &amp;
            </span>
            <span className="block">{data.groomName || 'Ahmed'}</span>
          </h2>

          <p className="mt-4 mb-6 text-sm italic" style={{ color: '#7d5a48' }}>
            {withDay}
          </p>

          <button
            id="preview-open-invitation-btn"
            type="button"
            onClick={onOpen}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-bold tracking-[0.12em] uppercase shadow-md transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: '#b85035',
              color: '#fbf6f0',
            }}
          >
            <Sun className="h-4 w-4" />
            <span>Buka Jemputan</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="font-serif-floral animate-fade-up w-full"
      style={{ backgroundColor: '#fbf6f0', color: '#4a2e23' }}
    >
      {/* Hero */}
      <header
        className="px-5 py-9 text-center"
        style={{
          background: 'linear-gradient(180deg, #b85035 0%, #8f3923 100%)',
          color: '#fbf6f0',
          borderBottom: '3px solid #e6c6a8',
        }}
      >
        <p className="font-arabic mb-2 text-lg" style={{ color: '#f5dec9' }} dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="mb-1 text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: '#f5dec9' }}>
          TERRACOTTA BOHO CELEBRATION
        </p>
        <h2 className="text-4xl font-semibold">
          {data.brideName || 'Fatima'}{' '}
          <span className="font-normal italic" style={{ color: '#f5dec9' }}>
            &amp;
          </span>{' '}
          {data.groomName || 'Ahmed'}
        </h2>
        <p
          className="mt-3 inline-block rounded-full px-4 py-1 text-xs italic"
          style={{ border: '1px solid rgba(245, 222, 201, 0.55)', color: '#fbf6f0' }}
        >
          {formattedDate}
        </p>
      </header>

      {/* Quote */}
      <section className="px-5 py-7 text-center">
        <div
          className="rounded-3xl px-5 py-5"
          style={{ backgroundColor: '#ffffff', border: '1px solid #dfc3ab' }}
        >
          <p className="mb-3 text-sm leading-relaxed italic" style={{ color: '#7d5a48' }}>
            &ldquo;{data.quote}&rdquo;
          </p>
          <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#b85035' }}>
            &mdash; {data.quoteSource || 'Surah Ar-Rum, Ayat 21'}
          </p>
        </div>
      </section>

      {/* Couple & Parents */}
      <section className="px-5 py-7 text-center" style={{ borderTop: '1px solid #e4d2c1' }}>
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#a64d32' }}>
          Dengan Penuh Kesyukuran
        </p>
        <h3 className="mt-1 mb-4 text-2xl font-semibold" style={{ color: '#7a3420' }}>
          Mempelai Yang Diraikan
        </h3>

        <div
          className="mb-4 rounded-2xl px-4 py-3 text-sm"
          style={{ backgroundColor: '#f3e5d8', border: '1px solid #dfc3ab' }}
        >
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#a64d32' }}>
            Keluarga Pengantin
          </p>
          <p className="mt-1 font-semibold" style={{ color: '#4a2e23' }}>
            {data.brideParents}
          </p>
          <p className="mt-1 font-semibold" style={{ color: '#4a2e23' }}>
            {data.groomParents}
          </p>
        </div>

        <div
          className="rounded-3xl px-4 py-5"
          style={{ backgroundColor: '#9e4129', color: '#fbf6f0', border: '1px solid #e6c6a8' }}
        >
          <p className="text-2xl font-semibold" style={{ color: '#fbf6f0' }}>
            {data.brideName || 'Fatima Az-Zahra'}
          </p>
          <p className="my-1 text-base italic" style={{ color: '#f5dec9' }}>
            &amp;
          </p>
          <p className="text-2xl font-semibold" style={{ color: '#fbf6f0' }}>
            {data.groomName || 'Ahmed Faris'}
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="px-5 py-7 text-center" style={{ borderTop: '1px solid #e4d2c1' }}>
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#a64d32' }}>
          Aturcara Majlis
        </p>
        <h3 className="mt-1 mb-4 text-2xl font-semibold" style={{ color: '#7a3420' }}>
          Butiran Majlis
        </h3>

        <div
          className="rounded-3xl p-4 text-left text-sm shadow-xs"
          style={{ backgroundColor: '#ffffff', border: '1px solid #dfc3ab' }}
        >
          <div className="space-y-2.5">
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" style={{ color: '#b85035' }} />
              <span>
                <strong>Tarikh:</strong> {withDay}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" style={{ color: '#b85035' }} />
              <span>
                <strong>Akad Nikah:</strong> {data.akadTime || '9:00 Pagi'}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" style={{ color: '#b85035' }} />
              <span>
                <strong>Jamuan:</strong> {data.eventTime || '12:00 Tengahari'}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#b85035' }} />
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
            style={{ backgroundColor: '#ffffff', color: '#7a3420', border: '1.5px solid #b85035' }}
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
            style={{ backgroundColor: '#b85035', color: '#fbf6f0' }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>RSVP via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-5 py-7 text-center" style={{ borderTop: '1px solid #e4d2c1' }}>
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#a64d32' }}>
          Memori Indah
        </p>
        <h3 className="mt-1 mb-4 text-2xl font-semibold" style={{ color: '#7a3420' }}>
          Galeri Kenangan
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.src}
              className="aspect-square overflow-hidden rounded-2xl"
              style={{ border: '1px solid #dfc3ab' }}
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <CountdownSection data={data} variant="terracotta" />
      <QrGiftSection data={data} variant="terracotta" />
      <GuestbookSection data={data} wishes={wishes} onAddWish={onAddWish} variant="terracotta" />

      {/* Footer */}
      <footer
        className="px-5 py-7 text-center"
        style={{ backgroundColor: '#9e4129', color: '#fbf6f0', borderTop: '2px solid #e6c6a8' }}
      >
        <p className="mb-2 text-xl font-semibold" style={{ color: '#f5dec9' }}>
          Terima Kasih
        </p>
        <p className="mb-3 text-sm leading-relaxed" style={{ color: 'rgba(251, 246, 240, 0.9)' }}>
          {data.closingNote}
        </p>
        <p className="text-lg italic" style={{ color: '#f5dec9' }}>
          {data.brideName || 'Fatima'} &amp; {data.groomName || 'Ahmed'}
        </p>
      </footer>
    </div>
  )
}
