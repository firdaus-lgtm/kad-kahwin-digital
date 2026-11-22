import { Calendar, Clock, Leaf, MapPin, MessageCircle } from 'lucide-react'
import {
  GALLERY_IMAGES,
  buildWhatsAppLink,
  formatMalayDate,
  sanitizeUrl,
} from '../../utils/cardHelpers'
import QrGiftSection from '../QrGiftSection'
import CountdownSection from '../CountdownSection'
import GuestbookSection from '../GuestbookSection'

export default function TemplateBotanical({ data, isOpen, onOpen, wishes, onAddWish }) {
  const dateInfo = formatMalayDate(data.eventDate)
  const formattedDate = typeof dateInfo === 'string' ? dateInfo : dateInfo.full
  const withDay = typeof dateInfo === 'string' ? dateInfo : dateInfo.withDay
  const waHref = buildWhatsAppLink(data.whatsappPhone, data.brideName, data.groomName)
  const mapsHref = sanitizeUrl(data.mapsUrl)
  const botanicalBg = `${import.meta.env.BASE_URL || '/'}assets/botanical-olive-bg.jpg`

  if (!isOpen) {
    return (
      <div
        className="relative flex min-h-[640px] w-full flex-col items-center justify-center overflow-hidden px-6 py-10 text-center"
        style={{
          backgroundColor: '#f5f2e8',
          backgroundImage: `url('${botanicalBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#2f3822',
        }}
      >
        <div
          className="relative z-10 w-full rounded-2xl px-5 py-9 shadow-sm"
          style={{
            backgroundColor: 'rgba(249, 247, 240, 0.88)',
            border: '1px solid #c5ccb2',
          }}
        >
          <p className="font-arabic mb-2 text-lg font-bold" style={{ color: '#4a5d23' }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <p
            className="mb-2 text-[11px] font-bold tracking-[0.26em] uppercase"
            style={{ color: '#5c6b3c' }}
          >
            WALIMATUL URUS
          </p>

          <h2 className="font-serif-royal text-4xl leading-tight font-semibold" style={{ color: '#3a4a24' }}>
            <span className="block">{data.brideName || 'Fatima'}</span>
            <span className="my-1 block text-2xl font-normal italic" style={{ color: '#5c6b3c' }}>
              &amp;
            </span>
            <span className="block">{data.groomName || 'Ahmed'}</span>
          </h2>

          <p className="mt-4 mb-6 text-xs tracking-[0.12em] uppercase" style={{ color: '#5d664e' }}>
            {withDay}
          </p>

          <button
            id="preview-open-invitation-btn"
            type="button"
            onClick={onOpen}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-bold tracking-[0.12em] uppercase shadow-md transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: '#4a5d23',
              color: '#f9f7f0',
            }}
          >
            <Leaf className="h-4 w-4" />
            <span>Buka Jemputan</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-up w-full" style={{ backgroundColor: '#f9f7f0', color: '#2f3822' }}>
      {/* Hero */}
      <header
        className="px-5 py-9 text-center"
        style={{
          background: 'linear-gradient(180deg, #3a4a24 0%, #2a3619 100%)',
          color: '#f9f7f0',
          borderBottom: '3px solid #8fa368',
        }}
      >
        <p className="font-arabic mb-2 text-lg" style={{ color: '#d6e0be' }} dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="mb-1 text-[10px] font-bold tracking-[0.28em] uppercase" style={{ color: '#b7c793' }}>
          RUSTIC BOTANICAL WEDDING
        </p>
        <h2 className="font-serif-royal text-3xl font-semibold">
          {data.brideName || 'Fatima'}{' '}
          <span className="font-normal italic" style={{ color: '#b7c793' }}>
            &amp;
          </span>{' '}
          {data.groomName || 'Ahmed'}
        </h2>
        <p
          className="mt-3 inline-block rounded-full px-4 py-1 text-[11px] tracking-[0.1em] uppercase"
          style={{ border: '1px solid rgba(183, 199, 147, 0.5)', color: '#e6edd5' }}
        >
          {formattedDate}
        </p>
      </header>

      {/* Quote */}
      <section className="px-5 py-7 text-center">
        <div
          className="rounded-2xl px-5 py-5"
          style={{ backgroundColor: '#ffffff', border: '1px solid #c5ccb2' }}
        >
          <p className="mb-3 text-xs leading-relaxed italic" style={{ color: '#5d664e' }}>
            &ldquo;{data.quote}&rdquo;
          </p>
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: '#4a5d23' }}>
            &mdash; {data.quoteSource || 'Surah Ar-Rum, Ayat 21'}
          </p>
        </div>
      </section>

      {/* Couple & Parents */}
      <section className="px-5 py-7 text-center" style={{ borderTop: '1px solid #d9d6c8' }}>
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: '#5c6b3c' }}>
          Dengan Izin Allah S.W.T.
        </p>
        <h3 className="font-serif-royal mt-1 mb-4 text-xl font-semibold" style={{ color: '#3a4a24' }}>
          Mempelai &amp; Keluarga
        </h3>

        <div
          className="mb-4 rounded-xl px-4 py-3 text-xs"
          style={{ backgroundColor: '#eef1e6', border: '1px solid #c5ccb2' }}
        >
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: '#5c6b3c' }}>
            Restu Keluarga
          </p>
          <p className="font-serif-royal mt-1 font-semibold" style={{ color: '#2f3822' }}>
            {data.brideParents}
          </p>
          <p className="font-serif-royal mt-1 font-semibold" style={{ color: '#2f3822' }}>
            {data.groomParents}
          </p>
        </div>

        <div
          className="rounded-2xl px-4 py-5"
          style={{ backgroundColor: '#3a4a24', color: '#f9f7f0', border: '1px solid #8fa368' }}
        >
          <p className="font-serif-royal text-xl font-semibold" style={{ color: '#e6edd5' }}>
            {data.brideName || 'Fatima Az-Zahra'}
          </p>
          <p className="font-serif-royal my-1 text-base italic" style={{ color: '#b7c793' }}>
            &amp;
          </p>
          <p className="font-serif-royal text-xl font-semibold" style={{ color: '#e6edd5' }}>
            {data.groomName || 'Ahmed Faris'}
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="px-5 py-7 text-center" style={{ borderTop: '1px solid #d9d6c8' }}>
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: '#5c6b3c' }}>
          Aturcara Majlis
        </p>
        <h3 className="font-serif-royal mt-1 mb-4 text-xl font-semibold" style={{ color: '#3a4a24' }}>
          Butiran Majlis
        </h3>

        <div
          className="rounded-2xl p-4 text-left text-xs shadow-xs"
          style={{ backgroundColor: '#ffffff', border: '1px solid #c5ccb2' }}
        >
          <div className="space-y-2.5">
            <p className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: '#4a5d23' }} />
              <span>
                <strong>Tarikh:</strong> {withDay}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: '#4a5d23' }} />
              <span>
                <strong>Akad Nikah:</strong> {data.akadTime || '9:00 Pagi'}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: '#4a5d23' }} />
              <span>
                <strong>Jamuan:</strong> {data.eventTime || '12:00 Tengahari'}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: '#4a5d23' }} />
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
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#ffffff', color: '#3a4a24', border: '1.5px solid #4a5d23' }}
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
            style={{ backgroundColor: '#4a5d23', color: '#f9f7f0' }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>RSVP via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-5 py-7 text-center" style={{ borderTop: '1px solid #d9d6c8' }}>
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: '#5c6b3c' }}>
          Detik Indah
        </p>
        <h3 className="font-serif-royal mt-1 mb-4 text-xl font-semibold" style={{ color: '#3a4a24' }}>
          Galeri Kenangan
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.src}
              className="aspect-square overflow-hidden rounded-xl"
              style={{ border: '1px solid #c5ccb2' }}
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <CountdownSection data={data} variant="botanical" />
      <QrGiftSection data={data} variant="botanical" />
      <GuestbookSection data={data} wishes={wishes} onAddWish={onAddWish} variant="botanical" />

      {/* Footer */}
      <footer
        className="px-5 py-7 text-center"
        style={{ backgroundColor: '#3a4a24', color: '#f9f7f0', borderTop: '2px solid #8fa368' }}
      >
        <p className="font-serif-royal mb-2 text-lg font-semibold" style={{ color: '#e6edd5' }}>
          Terima Kasih
        </p>
        <p className="mb-3 text-xs leading-relaxed" style={{ color: 'rgba(249, 247, 240, 0.85)' }}>
          {data.closingNote}
        </p>
        <p className="font-serif-royal text-base italic" style={{ color: '#b7c793' }}>
          {data.brideName || 'Fatima'} &amp; {data.groomName || 'Ahmed'}
        </p>
      </footer>
    </div>
  )
}
