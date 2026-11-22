import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Music,
  Palette,
  Pause,
  Phone,
  Play,
  QrCode,
  Quote,
  Sparkles,
  Download,
  RotateCcw,
  Trash2,
  Upload,
} from 'lucide-react'

const TEMPLATES = [
  {
    id: 'royal',
    name: 'Royal Burgundy',
    desc: 'Mewah • Maroon, Emas & Serif',
    swatches: ['#5c0a14', '#cfa855', '#fcf8f2'],
  },
  {
    id: 'minimal',
    name: 'Modern Minimalist',
    desc: 'Bersih • Putih, Arang & Grid',
    swatches: ['#ffffff', '#1c1917', '#e7e5e4'],
  },
  {
    id: 'floral',
    name: 'Floral Pastel',
    desc: 'Lembut • Pink, Sage & Skrip',
    swatches: ['#fdf2f5', '#9d5c6c', '#5c7361'],
  },
]

export default function ControlPanel({
  cardData,
  onChange,
  selectedTemplate,
  onSelectTemplate,
  onOpenExport,
  onResetDefaults,
  isMusicPlaying,
  onToggleMusic,
}) {
  const handleInput = (field) => (e) => {
    onChange(field, e.target.value)
  }

  const handleCheckbox = (field) => (e) => {
    onChange(field, e.target.checked)
  }

  const handleQrImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange('duitNowQrImage', reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleAudioUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onChange('customAudioUrl', url)
    onChange('musicTitle', file.name.replace(/\.[^/.]+$/, ''))
  }

  return (
    <aside className="flex h-full flex-col bg-white lg:border-r lg:border-stone-200">
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-6">
        {/* Pemilih Templat */}
        <section aria-labelledby="template-switcher-title">
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="template-switcher-title"
              className="flex items-center gap-2 text-xs font-bold tracking-wider text-stone-800 uppercase"
            >
              <Palette className="h-4 w-4 text-rose-800" />
              <span>1. Pilih Templat Kad</span>
            </h2>
            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600">
              3 Gaya
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
            {TEMPLATES.map((tpl) => {
              const active = selectedTemplate === tpl.id
              return (
                <button
                  key={tpl.id}
                  id={`select-template-${tpl.id}`}
                  type="button"
                  onClick={() => onSelectTemplate(tpl.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition-all ${
                    active
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50/70 text-stone-800 hover:border-stone-300 hover:bg-stone-100/70'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold">{tpl.name}</p>
                    <p
                      className={`mt-0.5 text-xs ${
                        active ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {tpl.desc}
                    </p>
                  </div>
                  <div className="flex items-center -space-x-1">
                    {tpl.swatches.map((hex) => (
                      <span
                        key={hex}
                        className="h-5 w-5 rounded-full border border-white/80 shadow-xs"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* Maklumat Pasangan */}
        <section aria-labelledby="couple-form-title" className="space-y-3.5">
          <h2
            id="couple-form-title"
            className="flex items-center gap-2 text-xs font-bold tracking-wider text-stone-800 uppercase"
          >
            <Heart className="h-4 w-4 text-rose-800" />
            <span>2. Maklumat Pasangan</span>
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="input-bride-name" className="mb-1 block text-xs font-semibold text-stone-700">
                Pengantin Perempuan
              </label>
              <input
                id="input-bride-name"
                type="text"
                value={cardData.brideName}
                onChange={handleInput('brideName')}
                placeholder="cth: Fatima Az-Zahra"
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
              />
            </div>

            <div>
              <label htmlFor="input-groom-name" className="mb-1 block text-xs font-semibold text-stone-700">
                Pengantin Lelaki
              </label>
              <input
                id="input-groom-name"
                type="text"
                value={cardData.groomName}
                onChange={handleInput('groomName')}
                placeholder="cth: Ahmed Faris"
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label htmlFor="input-bride-parents" className="mb-1 block text-xs font-semibold text-stone-700">
                Ibu Bapa Pengantin Perempuan
              </label>
              <input
                id="input-bride-parents"
                type="text"
                value={cardData.brideParents}
                onChange={handleInput('brideParents')}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
              />
            </div>

            <div>
              <label htmlFor="input-groom-parents" className="mb-1 block text-xs font-semibold text-stone-700">
                Ibu Bapa Pengantin Lelaki
              </label>
              <input
                id="input-groom-parents"
                type="text"
                value={cardData.groomParents}
                onChange={handleInput('groomParents')}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
              />
            </div>
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* Tarikh, Masa & Lokasi */}
        <section aria-labelledby="event-form-title" className="space-y-3.5">
          <h2
            id="event-form-title"
            className="flex items-center gap-2 text-xs font-bold tracking-wider text-stone-800 uppercase"
          >
            <Calendar className="h-4 w-4 text-rose-800" />
            <span>3. Tarikh, Masa &amp; Lokasi</span>
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="input-event-date" className="mb-1 block text-xs font-semibold text-stone-700">
                Tarikh Majlis
              </label>
              <input
                id="input-event-date"
                type="date"
                value={cardData.eventDate}
                onChange={handleInput('eventDate')}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
              />
            </div>

            <div>
              <label htmlFor="input-akad-time" className="mb-1 block text-xs font-semibold text-stone-700">
                Masa Akad Nikah
              </label>
              <div className="relative">
                <Clock className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
                <input
                  id="input-akad-time"
                  type="text"
                  value={cardData.akadTime}
                  onChange={handleInput('akadTime')}
                  placeholder="9:00 Pagi"
                  className="w-full rounded-lg border border-stone-300 bg-white py-2 pr-3 pl-8 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="input-event-time" className="mb-1 block text-xs font-semibold text-stone-700">
              Masa Walimatul Urus
            </label>
            <input
              id="input-event-time"
              type="text"
              value={cardData.eventTime}
              onChange={handleInput('eventTime')}
              placeholder="12:00 Tengahari - 4:00 Petang"
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
            />
          </div>

          <div>
            <label htmlFor="input-location-name" className="mb-1 block text-xs font-semibold text-stone-700">
              Lokasi Majlis (Teks)
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
              <input
                id="input-location-name"
                type="text"
                value={cardData.locationName}
                onChange={handleInput('locationName')}
                placeholder="Dewan Seri Perdana, Kuala Lumpur"
                className="w-full rounded-lg border border-stone-300 bg-white py-2 pr-3 pl-8 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="input-maps-url" className="mb-1 block text-xs font-semibold text-stone-700">
              Pautan Google Maps
            </label>
            <input
              id="input-maps-url"
              type="url"
              value={cardData.mapsUrl}
              onChange={handleInput('mapsUrl')}
              placeholder="https://maps.google.com/..."
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
            />
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* RSVP & Ucapan */}
        <section aria-labelledby="rsvp-form-title" className="space-y-3.5">
          <h2
            id="rsvp-form-title"
            className="flex items-center gap-2 text-xs font-bold tracking-wider text-stone-800 uppercase"
          >
            <Quote className="h-4 w-4 text-rose-800" />
            <span>4. RSVP &amp; Petikan Ucapan</span>
          </h2>

          <div>
            <label htmlFor="input-whatsapp" className="mb-1 block text-xs font-semibold text-stone-700">
              Nombor Telefon RSVP (WhatsApp)
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
              <input
                id="input-whatsapp"
                type="tel"
                value={cardData.whatsappPhone}
                onChange={handleInput('whatsappPhone')}
                placeholder="60123456789"
                className="w-full rounded-lg border border-stone-300 bg-white py-2 pr-3 pl-8 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="input-quote" className="mb-1 block text-xs font-semibold text-stone-700">
              Teks Ucapan / Petikan Ayat
            </label>
            <textarea
              id="input-quote"
              rows={3}
              value={cardData.quote}
              onChange={handleInput('quote')}
              className="w-full resize-none rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
            />
          </div>

          <div>
            <label htmlFor="input-quote-source" className="mb-1 block text-xs font-semibold text-stone-700">
              Sumber Petikan
            </label>
            <input
              id="input-quote-source"
              type="text"
              value={cardData.quoteSource}
              onChange={handleInput('quoteSource')}
              placeholder="Surah Ar-Rum, Ayat 21"
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
            />
          </div>

          <div>
            <label htmlFor="input-closing" className="mb-1 block text-xs font-semibold text-stone-700">
              Ucapan Penutup
            </label>
            <textarea
              id="input-closing"
              rows={2}
              value={cardData.closingNote}
              onChange={handleInput('closingNote')}
              className="w-full resize-none rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
            />
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* 5. Muzik Latar Perkahwinan */}
        <section aria-labelledby="music-form-title" className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h2
              id="music-form-title"
              className="flex items-center gap-2 text-xs font-bold tracking-wider text-stone-800 uppercase"
            >
              <Music className="h-4 w-4 text-rose-800" />
              <span>5. Muzik Latar (Audio)</span>
            </h2>

            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-stone-700">
              <input
                id="toggle-music-enabled"
                type="checkbox"
                checked={cardData.musicEnabled}
                onChange={handleCheckbox('musicEnabled')}
                className="h-4 w-4 rounded border-stone-300 accent-stone-900"
              />
              <span>Aktif</span>
            </label>
          </div>

          {cardData.musicEnabled && (
            <div className="space-y-3 rounded-xl border border-stone-200 bg-stone-50/70 p-3.5">
              <div>
                <label htmlFor="input-music-title" className="mb-1 block text-xs font-semibold text-stone-700">
                  Tajuk Lagu / Alunan
                </label>
                <input
                  id="input-music-title"
                  type="text"
                  value={cardData.musicTitle}
                  onChange={handleInput('musicTitle')}
                  placeholder="Alunan Klasik Walimatul Urus"
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="btn-test-music"
                  type="button"
                  onClick={onToggleMusic}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-stone-800"
                >
                  {isMusicPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      <span>Henti Uji</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      <span>Uji Muzik</span>
                    </>
                  )}
                </button>

                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-100">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Muat Naik MP3</span>
                  <input
                    id="input-audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="sr-only"
                  />
                </label>

                {cardData.customAudioUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange('customAudioUrl', '')
                      onChange('musicTitle', 'Alunan Klasik Walimatul Urus')
                    }}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Guna Melodi Asal</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-stone-500">
                Melodi romantik terbina dimainkan secara automatik apabila tetamu klik &ldquo;Buka Jemputan&rdquo;, atau muat naik fail MP3 pilihan anda.
              </p>
            </div>
          )}
        </section>

        <hr className="border-stone-200" />

        {/* 6. Kod QR Lokasi & Hadiah (DuitNow QR) */}
        <section aria-labelledby="qr-form-title" className="space-y-3.5">
          <h2
            id="qr-form-title"
            className="flex items-center gap-2 text-xs font-bold tracking-wider text-stone-800 uppercase"
          >
            <QrCode className="h-4 w-4 text-rose-800" />
            <span>6. Kod QR Lokasi &amp; DuitNow</span>
          </h2>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-stone-700">
              <input
                id="toggle-location-qr"
                type="checkbox"
                checked={cardData.showLocationQr}
                onChange={handleCheckbox('showLocationQr')}
                className="h-4 w-4 rounded border-stone-300 accent-stone-900"
              />
              <span>Papar QR Lokasi Maps</span>
            </label>

            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-stone-700">
              <input
                id="toggle-duitnow-qr"
                type="checkbox"
                checked={cardData.showDuitNowQr}
                onChange={handleCheckbox('showDuitNowQr')}
                className="h-4 w-4 rounded border-stone-300 accent-stone-900"
              />
              <span>Papar DuitNow QR</span>
            </label>

            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-stone-700">
              <input
                id="toggle-countdown"
                type="checkbox"
                checked={cardData.showCountdown !== false}
                onChange={handleCheckbox('showCountdown')}
                className="h-4 w-4 rounded border-stone-300 accent-stone-900"
              />
              <span>Papar Kiraan Detik</span>
            </label>

            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-stone-700">
              <input
                id="toggle-guestbook"
                type="checkbox"
                checked={cardData.showGuestbook !== false}
                onChange={handleCheckbox('showGuestbook')}
                className="h-4 w-4 rounded border-stone-300 accent-stone-900"
              />
              <span>Papar Buku Ucapan</span>
            </label>
          </div>

          {cardData.showDuitNowQr && (
            <div className="space-y-3 rounded-xl border border-stone-200 bg-stone-50/70 p-3.5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="input-bank-name" className="mb-1 block text-xs font-semibold text-stone-700">
                    Nama Bank
                  </label>
                  <input
                    id="input-bank-name"
                    type="text"
                    value={cardData.bankName}
                    onChange={handleInput('bankName')}
                    placeholder="Maybank / CIMB"
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                  />
                </div>

                <div>
                  <label htmlFor="input-bank-account" className="mb-1 block text-xs font-semibold text-stone-700">
                    Nombor Akaun
                  </label>
                  <input
                    id="input-bank-account"
                    type="text"
                    value={cardData.bankAccount}
                    onChange={handleInput('bankAccount')}
                    placeholder="1624 8810 2934"
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="input-bank-holder" className="mb-1 block text-xs font-semibold text-stone-700">
                  Nama Pemegang Akaun
                </label>
                <input
                  id="input-bank-holder"
                  type="text"
                  value={cardData.bankHolder}
                  onChange={handleInput('bankHolder')}
                  placeholder="Fatima Az-Zahra binti Abdul Rahman"
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-100">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Muat Naik Gambar DuitNow QR</span>
                  <input
                    id="input-duitnow-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleQrImageUpload}
                    className="sr-only"
                  />
                </label>

                {cardData.duitNowQrImage && (
                  <button
                    type="button"
                    onClick={() => onChange('duitNowQrImage', '')}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Buang QR</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-2.5 border-t border-stone-200 bg-stone-50 px-5 py-4 sm:px-6">
        <button
          id="btn-reset-defaults"
          type="button"
          onClick={onResetDefaults}
          title="Tetapkan semula contoh asal"
          className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>

        <button
          id="btn-export-card"
          type="button"
          onClick={onOpenExport}
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800"
        >
          <Download className="h-4 w-4" />
          <span>Simpan / Jana Kad</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        </button>
      </div>
    </aside>
  )
}
