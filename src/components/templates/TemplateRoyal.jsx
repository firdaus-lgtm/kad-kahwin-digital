import { Calendar, Clock, MapPin, MessageCircle, MailOpen } from 'lucide-react'
import {
  GALLERY_IMAGES,
  buildWhatsAppLink,
  formatMalayDate,
  sanitizeUrl,
} from '../../utils/cardHelpers'
import QrGiftSection from '../QrGiftSection'
import CountdownSection from '../CountdownSection'
import GuestbookSection from '../GuestbookSection'

export default function TemplateRoyal({ data, isOpen, onOpen, wishes, onAddWish }) {
  const dateInfo = formatMalayDate(data.eventDate)
  const formattedDate = typeof dateInfo === 'string' ? dateInfo : dateInfo.full
  const withDay = typeof dateInfo === 'string' ? dateInfo : dateInfo.withDay
  const waHref = buildWhatsAppLink(data.whatsappPhone, data.brideName, data.groomName)
  const mapsHref = sanitizeUrl(data.mapsUrl)
  const coverBg = `${import.meta.env.BASE_URL || '/'}assets/cover-roses.jpg`

  if (!isOpen) {
    return (
      <div
        className="relative flex min-h-[640px] w-full flex-col items-center justify-center overflow-hidden px-5 py-8 text-center"
        style={{
          backgroundColor: '#5c0a14',
          backgroundImage: `url('${coverBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fcf8f2',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(58,5,11,0.68) 0%, rgba(42,4,8,0.68) 75%)',
          }}
        />

        <div
          className="relative z-10 flex w-full flex-col items-center justify-center px-5 py-10"
          style={{
            border: '1px solid rgba(207, 168, 85, 0.5)',
            backgroundColor: 'rgba(58, 5, 11, 0.42)',
          }}
        >
          <p className="font-arabic mb-2 text-xl font-bold" style={{ color: '#e5c985' }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <div className="my-3 flex w-28 items-center gap-2">
            <span className="h-px flex-1" style={{ backgroundColor: '#cfa855' }} />
            <span className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: '#cfa855' }} />
            <span className="h-px flex-1" style={{ backgroundColor: '#cfa855' }} />
          </div>

          <p
            className="mb-3 text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ color: '#cfa855' }}
          >
            THE WEDDING OF
          </p>

          <h2 className="font-serif-royal text-4xl leading-tight font-semibold" style={{ color: '#fcf8f2' }}>
            <span className="block">{data.brideName || 'Fatima'}</span>
            <span className="my-1 block text-2xl font-normal italic" style={{ color: '#cfa855' }}>
              &amp;
            </span>
            <span className="block">{data.groomName || 'Ahmed'}</span>
          </h2>

          <p
            className="mt-4 mb-7 text-xs tracking-[0.16em] uppercase"
            style={{ color: 'rgba(252, 248, 242, 0.85)' }}
          >
            {formattedDate}
          </p>

          <button
            id="preview-open-invitation-btn"
            type="button"
            onClick={onOpen}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold tracking-[0.12em] uppercase shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: 'linear-gradient(135deg, #cfa855 0%, #b58c38 100%)',
              color: '#3a050b',
              border: '1px solid #e5c985',
            }}
          >
            <MailOpen className="h-4 w-4" />
            <span>Buka Jemputan</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-up w-full" style={{ backgroundColor: '#fcf8f2', color: '#2c181a' }}>
      {/* Hero Banner */}
      <header
        className="px-5 py-9 text-center"
        style={{
          background: 'linear-gradient(180deg, #5c0a14 0%, #3a050b 100%)',
          color: '#fcf8f2',
          borderBottom: '3px solid #cfa855',
        }}
      >
        <p className="font-arabic mb-2 text-lg" style={{ color: '#e5c985' }} dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="mb-2 text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#cfa855' }}>
          WALIMATUL URUS
        </p>
        <h2 className="font-serif-royal text-3xl font-semibold" style={{ color: '#fcf8f2' }}>
          {data.brideName || 'Fatima'}{' '}
          <span className="font-normal italic" style={{ color: '#cfa855' }}>
            &amp;
          </span>{' '}
          {data.groomName || 'Ahmed'}
        </h2>
        <p
          className="mt-3 inline-block rounded-full px-4 py-1 text-[11px] tracking-[0.12em] uppercase"
          style={{ border: '1px solid rgba(207, 168, 85, 0.55)', color: '#e5c985' }}
        >
          {withDay}
        </p>
      </header>

      {/* Petikan Ayat / Ucapan */}
      <section className="px-5 py-7 text-center">
        <div
          className="rounded-2xl px-4 py-5 shadow-sm"
          style={{ backgroundColor: '#ffffff', border: '1px solid rgba(207, 168, 85, 0.45)' }}
        >
          <p className="mb-3 text-xs leading-relaxed italic" style={{ color: '#61474a' }}>
            &ldquo;{data.quote}&rdquo;
          </p>
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: '#9c792e' }}>
            &mdash; {data.quoteSource || 'Surah Ar-Rum, Ayat 21'}
          </p>
        </div>
      </section>

      {/* Info Pasangan */}
      <section
        className="px-5 py-7 text-center"
        style={{ borderTop: '1px solid rgba(207, 168, 85, 0.25)' }}
      >
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: '#9c792e' }}>
          Dengan Penuh Kesyukuran
        </p>
        <h3 className="font-serif-royal mt-1 mb-4 text-xl font-semibold" style={{ color: '#5c0a14' }}>
          Mempelai Yang Diraikan
        </h3>

        <div
          className="mb-4 rounded-xl px-4 py-3 text-xs"
          style={{ backgroundColor: '#f4ece0', border: '1px solid rgba(207, 168, 85, 0.35)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: '#9c792e' }}>
            Keluarga Pengantin
          </p>
          <p className="font-serif-royal mt-1 font-semibold" style={{ color: '#5c0a14' }}>
            {data.brideParents}
          </p>
          <p className="font-serif-royal mt-1 font-semibold" style={{ color: '#5c0a14' }}>
            {data.groomParents}
          </p>
        </div>

        <div
          className="rounded-2xl px-4 py-5"
          style={{
            background: 'linear-gradient(155deg, #5c0a14 0%, #3a050b 100%)',
            border: '1px solid #cfa855',
            color: '#fcf8f2',
          }}
        >
          <p className="font-serif-royal text-xl font-semibold" style={{ color: '#e5c985' }}>
            {data.brideName || 'Fatima Az-Zahra'}
          </p>
          <p className="font-serif-royal my-1 text-lg italic" style={{ color: '#cfa855' }}>
            &amp;
          </p>
          <p className="font-serif-royal text-xl font-semibold" style={{ color: '#e5c985' }}>
            {data.groomName || 'Ahmed Faris'}
          </p>
        </div>
      </section>

      {/* Butiran Majlis */}
      <section
        className="px-5 py-7 text-center"
        style={{ borderTop: '1px solid rgba(207, 168, 85, 0.25)' }}
      >
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: '#9c792e' }}>
          Aturcara Majlis
        </p>
        <h3 className="font-serif-royal mt-1 mb-4 text-xl font-semibold" style={{ color: '#5c0a14' }}>
          Butiran Majlis
        </h3>

        <div className="space-y-3 text-left">
          <div
            className="rounded-2xl p-4 shadow-sm"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(207, 168, 85, 0.5)',
              borderTop: '3px solid #5c0a14',
            }}
          >
            <p className="font-serif-royal mb-2 text-base font-semibold" style={{ color: '#5c0a14' }}>
              Akad Nikah &amp; Walimatul Urus
            </p>
            <div className="space-y-2 text-xs" style={{ color: '#2c181a' }}>
              <p className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: '#9c792e' }} />
                <span>
                  <strong>Tarikh:</strong> {withDay}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: '#9c792e' }} />
                <span>
                  <strong>Akad Nikah:</strong> {data.akadTime || '9:00 Pagi'}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: '#9c792e' }} />
                <span>
                  <strong>Jamuan:</strong> {data.eventTime || '12:00 Tengahari'}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: '#9c792e' }} />
                <span>
                  <strong>Lokasi:</strong> {data.locationName || 'Dewan Seri Perdana'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Butang Interaktif */}
        <div className="mt-4 grid gap-2.5">
          <a
            id="btn-google-maps"
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-bold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: '#ffffff',
              color: '#5c0a14',
              border: '1.5px solid #5c0a14',
            }}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Buka di Google Maps</span>
          </a>

          <a
            id="btn-rsvp-whatsapp"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-bold transition-opacity hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #5c0a14 0%, #3a050b 100%)',
              color: '#e5c985',
              border: '1px solid #cfa855',
            }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>RSVP via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Galeri 2 Kolum */}
      <section
        className="px-5 py-7 text-center"
        style={{ borderTop: '1px solid rgba(207, 168, 85, 0.25)' }}
      >
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: '#9c792e' }}>
          Detik Indah
        </p>
        <h3 className="font-serif-royal mt-1 mb-4 text-xl font-semibold" style={{ color: '#5c0a14' }}>
          Galeri Kenangan
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.src}
              className="aspect-square overflow-hidden rounded-xl"
              style={{ border: '1px solid rgba(207, 168, 85, 0.45)' }}
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Kiraan Detik (Countdown) */}
      <CountdownSection data={data} variant="royal" />

      {/* Kod QR Lokasi & DuitNow */}
      <QrGiftSection data={data} variant="royal" />

      {/* Buku Ucapan Tetamu (Guestbook) */}
      <GuestbookSection data={data} wishes={wishes} onAddWish={onAddWish} variant="royal" />

      {/* Footer */}
      <footer
        className="px-5 py-7 text-center"
        style={{
          background: 'linear-gradient(180deg, #5c0a14 0%, #3a050b 100%)',
          color: '#fcf8f2',
          borderTop: '2px solid #cfa855',
        }}
      >
        <p className="font-serif-royal mb-2 text-lg font-semibold" style={{ color: '#e5c985' }}>
          Terima Kasih
        </p>
        <p className="mb-3 text-xs leading-relaxed" style={{ color: 'rgba(252, 248, 242, 0.86)' }}>
          {data.closingNote}
        </p>
        <p className="font-serif-royal text-base italic" style={{ color: '#cfa855' }}>
          {data.brideName || 'Fatima'} &amp; {data.groomName || 'Ahmed'}
        </p>
      </footer>
    </div>
  )
}
