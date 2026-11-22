import { Calendar, Clock, Flower2, MapPin, MessageCircle } from 'lucide-react'
import {
  GALLERY_IMAGES,
  buildWhatsAppLink,
  formatMalayDate,
  sanitizeUrl,
} from '../../utils/cardHelpers'
import QrGiftSection from '../QrGiftSection'
import CountdownSection from '../CountdownSection'
import GuestbookSection from '../GuestbookSection'

export default function TemplateFloral({ data, isOpen, onOpen, wishes, onAddWish }) {
  const dateInfo = formatMalayDate(data.eventDate)
  const formattedDate = typeof dateInfo === 'string' ? dateInfo : dateInfo.full
  const withDay = typeof dateInfo === 'string' ? dateInfo : dateInfo.withDay
  const waHref = buildWhatsAppLink(data.whatsappPhone, data.brideName, data.groomName)
  const mapsHref = sanitizeUrl(data.mapsUrl)
  const floralBg = `${import.meta.env.BASE_URL || '/'}assets/floral-pastel-bg.jpg`

  if (!isOpen) {
    return (
      <div
        className="relative flex min-h-[640px] w-full flex-col items-center justify-center overflow-hidden px-6 py-10 text-center"
        style={{
          backgroundColor: '#fdf2f5',
          backgroundImage: `url('${floralBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#4a353b',
        }}
      >
        <div
          className="relative z-10 w-full rounded-3xl px-5 py-9 shadow-sm"
          style={{
            backgroundColor: 'rgba(255, 250, 251, 0.84)',
            border: '1px solid #ebd6dc',
          }}
        >
          <p className="font-arabic mb-2 text-lg" style={{ color: '#5c7361' }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <p
            className="font-serif-floral mb-2 text-xs font-semibold tracking-[0.24em] uppercase italic"
            style={{ color: '#9d5c6c' }}
          >
            Walimatul Urus
          </p>

          <h2 className="font-script-floral text-5xl leading-tight" style={{ color: '#7a3e4d' }}>
            <span className="block">{data.brideName || 'Fatima'}</span>
            <span className="my-0.5 block text-3xl" style={{ color: '#5c7361' }}>
              &amp;
            </span>
            <span className="block">{data.groomName || 'Ahmed'}</span>
          </h2>

          <p className="font-serif-floral mt-3 mb-6 text-sm italic" style={{ color: '#6b555b' }}>
            {withDay}
          </p>

          <button
            id="preview-open-invitation-btn"
            type="button"
            onClick={onOpen}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-semibold tracking-[0.12em] uppercase shadow-md transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: '#5c7361',
              color: '#ffffff',
            }}
          >
            <Flower2 className="h-4 w-4" />
            <span>Buka Jemputan</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="font-serif-floral animate-fade-up w-full"
      style={{ backgroundColor: '#fffafa', color: '#4a353b' }}
    >
      {/* Pastel Hero */}
      <header
        className="px-5 py-9 text-center"
        style={{
          background: 'linear-gradient(180deg, #fdf2f5 0%, #f7e6eb 100%)',
          borderBottom: '1px solid #ebd6dc',
        }}
      >
        <p className="font-arabic mb-2 text-lg" style={{ color: '#5c7361' }} dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="text-xs font-semibold tracking-[0.22em] uppercase italic" style={{ color: '#9d5c6c' }}>
          Jemputan Walimatul Urus
        </p>
        <h2 className="font-script-floral mt-2 text-5xl" style={{ color: '#7a3e4d' }}>
          {data.brideName || 'Fatima'} &amp; {data.groomName || 'Ahmed'}
        </h2>
        <p
          className="mt-3 inline-block rounded-full px-4 py-1 text-xs italic"
          style={{ backgroundColor: '#ffffff', color: '#5c7361', border: '1px solid #d7e2d9' }}
        >
          {formattedDate}
        </p>
      </header>

      {/* Quote */}
      <section className="px-5 py-7 text-center">
        <div
          className="rounded-3xl px-5 py-5"
          style={{ backgroundColor: '#ffffff', border: '1px solid #ebd6dc' }}
        >
          <p className="text-sm leading-relaxed italic" style={{ color: '#6b555b' }}>
            &ldquo;{data.quote}&rdquo;
          </p>
          <p className="mt-2.5 text-xs font-semibold tracking-wider uppercase" style={{ color: '#5c7361' }}>
            &mdash; {data.quoteSource || 'Surah Ar-Rum, Ayat 21'}
          </p>
        </div>
      </section>

      {/* Couple & Parents */}
      <section className="px-5 py-6 text-center" style={{ borderTop: '1px solid #f2e2e7' }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase italic" style={{ color: '#5c7361' }}>
          Dengan Penuh Rasa Syukur
        </p>
        <h3 className="font-script-floral mt-1 mb-4 text-4xl" style={{ color: '#7a3e4d' }}>
          Pasangan Mempelai
        </h3>

        <div
          className="mb-4 rounded-2xl p-4 text-sm"
          style={{ backgroundColor: '#f4f7f4', border: '1px solid #dce6de' }}
        >
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#5c7361' }}>
            Restu Ibu Bapa
          </p>
          <p className="mt-1 font-semibold" style={{ color: '#4a353b' }}>
            {data.brideParents}
          </p>
          <p className="mt-1 font-semibold" style={{ color: '#4a353b' }}>
            {data.groomParents}
          </p>
        </div>

        <div
          className="rounded-3xl px-4 py-5"
          style={{ backgroundColor: '#fdf2f5', border: '1px solid #ebd6dc' }}
        >
          <p className="font-script-floral text-3xl" style={{ color: '#7a3e4d' }}>
            {data.brideName || 'Fatima Az-Zahra'}
          </p>
          <p className="my-0.5 text-base italic" style={{ color: '#5c7361' }}>
            &amp;
          </p>
          <p className="font-script-floral text-3xl" style={{ color: '#7a3e4d' }}>
            {data.groomName || 'Ahmed Faris'}
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="px-5 py-6 text-center" style={{ borderTop: '1px solid #f2e2e7' }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase italic" style={{ color: '#5c7361' }}>
          Hari Bahagia
        </p>
        <h3 className="font-script-floral mt-1 mb-4 text-4xl" style={{ color: '#7a3e4d' }}>
          Butiran Majlis
        </h3>

        <div
          className="rounded-3xl p-5 text-left text-sm"
          style={{ backgroundColor: '#ffffff', border: '1px solid #ebd6dc' }}
        >
          <div className="space-y-2.5">
            <p className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4 shrink-0" style={{ color: '#9d5c6c' }} />
              <span>
                <strong>Tarikh:</strong> {withDay}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0" style={{ color: '#9d5c6c' }} />
              <span>
                <strong>Akad Nikah:</strong> {data.akadTime || '9:00 Pagi'}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0" style={{ color: '#9d5c6c' }} />
              <span>
                <strong>Walimatul Urus:</strong> {data.eventTime || '12:00 Tengahari'}
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#9d5c6c' }} />
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
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-semibold tracking-[0.1em] uppercase"
            style={{ backgroundColor: '#ffffff', color: '#5c7361', border: '1.5px solid #5c7361' }}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Buka di Google Maps</span>
          </a>

          <a
            id="btn-rsvp-whatsapp"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-semibold tracking-[0.1em] uppercase"
            style={{ backgroundColor: '#9d5c6c', color: '#ffffff' }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>RSVP via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-5 py-6 text-center" style={{ borderTop: '1px solid #f2e2e7' }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase italic" style={{ color: '#5c7361' }}>
          Memori Terindah
        </p>
        <h3 className="font-script-floral mt-1 mb-4 text-4xl" style={{ color: '#7a3e4d' }}>
          Galeri Kami
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.src}
              className="aspect-square overflow-hidden rounded-2xl"
              style={{ border: '1px solid #ebd6dc' }}
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Kiraan Detik (Countdown) */}
      <CountdownSection data={data} variant="floral" />

      {/* Kod QR Lokasi & DuitNow */}
      <QrGiftSection data={data} variant="floral" />

      {/* Buku Ucapan Tetamu (Guestbook) */}
      <GuestbookSection data={data} wishes={wishes} onAddWish={onAddWish} variant="floral" />

      {/* Footer */}
      <footer
        className="px-5 py-7 text-center"
        style={{
          background: 'linear-gradient(180deg, #fdf2f5 0%, #f5e2e8 100%)',
          borderTop: '1px solid #ebd6dc',
        }}
      >
        <p className="text-sm leading-relaxed italic" style={{ color: '#6b555b' }}>
          {data.closingNote}
        </p>
        <p className="font-script-floral mt-3 text-3xl" style={{ color: '#7a3e4d' }}>
          {data.brideName || 'Fatima'} &amp; {data.groomName || 'Ahmed'}
        </p>
      </footer>
    </div>
  )
}
