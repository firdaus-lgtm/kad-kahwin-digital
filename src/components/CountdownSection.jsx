import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

const VARIANT_STYLES = {
  royal: {
    borderTop: '1px solid rgba(207, 168, 85, 0.25)',
    kickerColor: '#9c792e',
    titleColor: '#5c0a14',
    titleClass: 'font-serif-royal text-xl font-semibold',
    boxBg: 'linear-gradient(155deg, #5c0a14 0%, #3a050b 100%)',
    boxBorder: '1px solid #cfa855',
    boxRadius: 'rounded-xl',
    numColor: '#e5c985',
    numClass: 'font-serif-royal text-xl font-bold',
    labelColor: 'rgba(252, 248, 242, 0.8)',
    statusColor: '#9c792e',
  },
  minimal: {
    borderTop: '1px solid #e7e5e4',
    kickerColor: '#78716c',
    titleColor: '#1c1917',
    titleClass: 'font-sans-modern text-sm font-bold tracking-[0.12em] uppercase',
    boxBg: '#1c1917',
    boxBorder: '1px solid #1c1917',
    boxRadius: 'rounded-none',
    numColor: '#ffffff',
    numClass: 'font-sans-modern text-xl font-bold',
    labelColor: '#a8a29e',
    statusColor: '#57534e',
  },
  floral: {
    borderTop: '1px solid #f2e2e7',
    kickerColor: '#5c7361',
    titleColor: '#7a3e4d',
    titleClass: 'font-script-floral text-4xl',
    boxBg: '#fdf2f5',
    boxBorder: '1px solid #ebd6dc',
    boxRadius: 'rounded-2xl',
    numColor: '#7a3e4d',
    numClass: 'font-serif-floral text-2xl font-bold',
    labelColor: '#5c7361',
    statusColor: '#5c7361',
  },
  botanical: {
    borderTop: '1px solid #d9d6c8',
    kickerColor: '#5c6b3c',
    titleColor: '#3a4a24',
    titleClass: 'font-serif-royal text-xl font-semibold',
    boxBg: '#eef1e6',
    boxBorder: '1px solid #c5ccb2',
    boxRadius: 'rounded-xl',
    numColor: '#3a4a24',
    numClass: 'font-serif-royal text-xl font-bold',
    labelColor: '#5c6b3c',
    statusColor: '#5c6b3c',
  },
  midnight: {
    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
    kickerColor: '#cbd5e1',
    titleColor: '#f8fafc',
    titleClass: 'font-sans-modern text-lg font-bold tracking-[0.06em] uppercase',
    boxBg: 'linear-gradient(155deg, #162244 0%, #0b132b 100%)',
    boxBorder: '1px solid rgba(212, 175, 55, 0.45)',
    boxRadius: 'rounded-xl',
    numColor: '#f3d87a',
    numClass: 'font-sans-modern text-xl font-bold',
    labelColor: '#cbd5e1',
    statusColor: '#cbd5e1',
  },
  terracotta: {
    borderTop: '1px solid #e4d2c1',
    kickerColor: '#a64d32',
    titleColor: '#7a3420',
    titleClass: 'font-serif-floral text-2xl font-semibold',
    boxBg: '#f3e5d8',
    boxBorder: '1px solid #dfc3ab',
    boxRadius: 'rounded-2xl',
    numColor: '#b85035',
    numClass: 'font-serif-floral text-2xl font-bold',
    labelColor: '#7d5a48',
    statusColor: '#a64d32',
  },
}

function calculateCountdown(isoDate) {
  if (!isoDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false }
  }
  const target = new Date(`${isoDate}T09:00:00`)
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (Number.isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isPast: false }
}

export default function CountdownSection({ data, variant = 'royal' }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateCountdown(data.eventDate))
  const s = VARIANT_STYLES[variant] || VARIANT_STYLES.royal

  useEffect(() => {
    setTimeLeft(calculateCountdown(data.eventDate))
    const timer = window.setInterval(() => {
      setTimeLeft(calculateCountdown(data.eventDate))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [data.eventDate])

  if (data.showCountdown === false) return null

  const items = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Minit', value: timeLeft.minutes },
    { label: 'Saat', value: timeLeft.seconds },
  ]

  return (
    <section
      id="countdown-section"
      className="px-5 py-6 text-center"
      style={{ borderTop: s.borderTop }}
    >
      <p
        className="flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.24em] uppercase"
        style={{ color: s.kickerColor }}
      >
        <Clock className="h-3 w-3" />
        <span>Menghitung Hari</span>
      </p>
      <h3 className={`mt-1 mb-4 ${s.titleClass}`} style={{ color: s.titleColor }}>
        Menuju Hari Bahagia
      </h3>

      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={`${s.boxRadius} px-2 py-3 shadow-xs`}
            style={{ background: s.boxBg, border: s.boxBorder }}
          >
            <p className={s.numClass} style={{ color: s.numColor }}>
              {String(item.value).padStart(2, '0')}
            </p>
            <p
              className="mt-0.5 text-[10px] font-semibold tracking-wider uppercase"
              style={{ color: s.labelColor }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {timeLeft.isPast && (
        <p className="mt-3 text-xs font-medium italic" style={{ color: s.statusColor }}>
          Alhamdulillah, majlis telah berlangsung dengan penuh keberkatan.
        </p>
      )}
    </section>
  )
}
