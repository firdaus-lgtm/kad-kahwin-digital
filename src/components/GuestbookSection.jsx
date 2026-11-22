import { useState } from 'react'
import { MessageSquareHeart, Send, UserCheck } from 'lucide-react'

const VARIANT_STYLES = {
  royal: {
    borderTop: '1px solid rgba(207, 168, 85, 0.25)',
    kickerColor: '#9c792e',
    titleColor: '#5c0a14',
    titleClass: 'font-serif-royal text-xl font-semibold',
    cardBg: '#ffffff',
    cardBorder: '1px solid rgba(207, 168, 85, 0.45)',
    cardRadius: 'rounded-2xl',
    itemBg: '#fcf8f2',
    itemBorder: '1px solid rgba(207, 168, 85, 0.35)',
    textColor: '#2c181a',
    mutedColor: '#61474a',
    btnBg: 'linear-gradient(135deg, #5c0a14 0%, #3a050b 100%)',
    btnColor: '#e5c985',
    badgeBg: 'rgba(92, 10, 20, 0.1)',
    badgeColor: '#5c0a14',
  },
  minimal: {
    borderTop: '1px solid #e7e5e4',
    kickerColor: '#78716c',
    titleColor: '#1c1917',
    titleClass: 'font-sans-modern text-sm font-bold tracking-[0.12em] uppercase',
    cardBg: '#fafaf9',
    cardBorder: '1px solid #e7e5e4',
    cardRadius: 'rounded-none',
    itemBg: '#ffffff',
    itemBorder: '1px solid #e7e5e4',
    textColor: '#1c1917',
    mutedColor: '#57534e',
    btnBg: '#1c1917',
    btnColor: '#ffffff',
    badgeBg: '#e7e5e4',
    badgeColor: '#1c1917',
  },
  floral: {
    borderTop: '1px solid #f2e2e7',
    kickerColor: '#5c7361',
    titleColor: '#7a3e4d',
    titleClass: 'font-script-floral text-4xl',
    cardBg: '#ffffff',
    cardBorder: '1px solid #ebd6dc',
    cardRadius: 'rounded-3xl',
    itemBg: '#fffafa',
    itemBorder: '1px solid #f2e2e7',
    textColor: '#4a353b',
    mutedColor: '#6b555b',
    btnBg: '#5c7361',
    btnColor: '#ffffff',
    badgeBg: '#fdf2f5',
    badgeColor: '#9d5c6c',
  },
  botanical: {
    borderTop: '1px solid #d9d6c8',
    kickerColor: '#5c6b3c',
    titleColor: '#3a4a24',
    titleClass: 'font-serif-royal text-xl font-semibold',
    cardBg: '#ffffff',
    cardBorder: '1px solid #c5ccb2',
    cardRadius: 'rounded-2xl',
    itemBg: '#f9f7f0',
    itemBorder: '1px solid #d9d6c8',
    textColor: '#2f3822',
    mutedColor: '#5d664e',
    btnBg: '#4a5d23',
    btnColor: '#f9f7f0',
    badgeBg: '#eef1e6',
    badgeColor: '#3a4a24',
  },
  midnight: {
    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
    kickerColor: '#cbd5e1',
    titleColor: '#f8fafc',
    titleClass: 'font-sans-modern text-lg font-bold tracking-[0.06em] uppercase',
    cardBg: '#121d3b',
    cardBorder: '1px solid rgba(212, 175, 55, 0.35)',
    cardRadius: 'rounded-2xl',
    itemBg: '#0b132b',
    itemBorder: '1px solid rgba(203, 213, 225, 0.2)',
    textColor: '#f1f5f9',
    mutedColor: '#94a3b8',
    btnBg: 'linear-gradient(135deg, #d4af37 0%, #b38e24 100%)',
    btnColor: '#0b132b',
    badgeBg: 'rgba(212, 175, 55, 0.16)',
    badgeColor: '#f3d87a',
  },
  terracotta: {
    borderTop: '1px solid #e4d2c1',
    kickerColor: '#a64d32',
    titleColor: '#7a3420',
    titleClass: 'font-serif-floral text-2xl font-semibold',
    cardBg: '#ffffff',
    cardBorder: '1px solid #dfc3ab',
    cardRadius: 'rounded-3xl',
    itemBg: '#fbf6f0',
    itemBorder: '1px solid #e4d2c1',
    textColor: '#4a2e23',
    mutedColor: '#7d5a48',
    btnBg: '#b85035',
    btnColor: '#fbf6f0',
    badgeBg: '#f3e5d8',
    badgeColor: '#7a3420',
  },
}

export default function GuestbookSection({
  data,
  wishes = [],
  onAddWish,
  variant = 'royal',
}) {
  const [guestName, setGuestName] = useState('')
  const [guestAttendance, setGuestAttendance] = useState('Hadir')
  const [guestMessage, setGuestMessage] = useState('')

  const s = VARIANT_STYLES[variant] || VARIANT_STYLES.royal

  if (data.showGuestbook === false) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!guestName.trim() || !guestMessage.trim()) return
    onAddWish?.({
      id: Date.now(),
      name: guestName.trim(),
      attendance: guestAttendance,
      message: guestMessage.trim(),
      time: 'Baru sahaja',
    })
    setGuestName('')
    setGuestMessage('')
  }

  return (
    <section
      id="guestbook-section"
      className="px-5 py-7 text-center"
      style={{ borderTop: s.borderTop }}
    >
      <p
        className="flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.24em] uppercase"
        style={{ color: s.kickerColor }}
      >
        <MessageSquareHeart className="h-3.5 w-3.5" />
        <span>Titipan Doa</span>
      </p>
      <h3 className={`mt-1 mb-4 ${s.titleClass}`} style={{ color: s.titleColor }}>
        Buku Ucapan Tetamu
      </h3>

      {/* Borang Hantar Ucapan */}
      <form
        onSubmit={handleSubmit}
        className={`${s.cardRadius} mb-4 space-y-2.5 p-4 text-left shadow-xs`}
        style={{ backgroundColor: s.cardBg, border: s.cardBorder }}
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input
            id="guestbook-input-name"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Nama anda..."
            aria-label="Nama tetamu"
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 outline-none focus:border-stone-800"
          />

          <select
            id="guestbook-select-attendance"
            value={guestAttendance}
            onChange={(e) => setGuestAttendance(e.target.value)}
            aria-label="Status kehadiran"
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 outline-none focus:border-stone-800"
          >
            <option value="Hadir">Insya-Allah Hadir</option>
            <option value="Tidak Pasti">Masih Dalam Perancangan</option>
            <option value="Tidak Hadir">Maaf, Tidak Dapat Hadir</option>
          </select>
        </div>

        <textarea
          id="guestbook-input-message"
          rows={2}
          value={guestMessage}
          onChange={(e) => setGuestMessage(e.target.value)}
          placeholder="Tulis ucapan & doa buat mempelai..."
          aria-label="Ucapan tetamu"
          className="w-full resize-none rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 outline-none focus:border-stone-800"
        />

        <button
          id="guestbook-submit-btn"
          type="submit"
          className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-opacity hover:opacity-90"
          style={{ background: s.btnBg, color: s.btnColor }}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Hantar Ucapan</span>
        </button>
      </form>

      {/* Senarai Ucapan */}
      <div className="max-h-56 space-y-2.5 overflow-y-auto pr-0.5 text-left">
        {wishes.map((item) => (
          <article
            key={item.id}
            className="rounded-xl p-3"
            style={{ backgroundColor: s.itemBg, border: s.itemBorder }}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-xs font-bold" style={{ color: s.titleColor }}>
                {item.name}
              </p>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: s.badgeBg, color: s.badgeColor }}
              >
                <UserCheck className="h-2.5 w-2.5" />
                {item.attendance}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: s.textColor }}>
              &ldquo;{item.message}&rdquo;
            </p>
            <p className="mt-1 text-[10px]" style={{ color: s.mutedColor }}>
              {item.time}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
