import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Check, Copy, Gift, MapPin, QrCode } from 'lucide-react'
import { sanitizeUrl } from '../utils/cardHelpers'

const VARIANT_STYLES = {
  royal: {
    borderTop: '1px solid rgba(207, 168, 85, 0.25)',
    kickerColor: '#9c792e',
    titleColor: '#5c0a14',
    titleClass: 'font-serif-royal text-xl font-semibold',
    cardBg: '#ffffff',
    cardBorder: '1px solid rgba(207, 168, 85, 0.45)',
    cardRadius: 'rounded-2xl',
    badgeBg: '#5c0a14',
    badgeColor: '#e5c985',
    duitNowAccent: '#ed2e67',
    textColor: '#2c181a',
    mutedColor: '#61474a',
    qrDark: '#5c0a14',
    btnBg: '#f4ece0',
    btnColor: '#5c0a14',
  },
  minimal: {
    borderTop: '1px solid #e7e5e4',
    kickerColor: '#78716c',
    titleColor: '#1c1917',
    titleClass: 'font-sans-modern text-sm font-bold tracking-[0.12em] uppercase',
    cardBg: '#fafaf9',
    cardBorder: '1px solid #e7e5e4',
    cardRadius: 'rounded-none',
    badgeBg: '#1c1917',
    badgeColor: '#ffffff',
    duitNowAccent: '#ed2e67',
    textColor: '#1c1917',
    mutedColor: '#57534e',
    qrDark: '#1c1917',
    btnBg: '#ffffff',
    btnColor: '#1c1917',
  },
  floral: {
    borderTop: '1px solid #f2e2e7',
    kickerColor: '#5c7361',
    titleColor: '#7a3e4d',
    titleClass: 'font-script-floral text-4xl',
    cardBg: '#ffffff',
    cardBorder: '1px solid #ebd6dc',
    cardRadius: 'rounded-3xl',
    badgeBg: '#5c7361',
    badgeColor: '#ffffff',
    duitNowAccent: '#ed2e67',
    textColor: '#4a353b',
    mutedColor: '#6b555b',
    qrDark: '#4a353b',
    btnBg: '#fdf2f5',
    btnColor: '#7a3e4d',
  },
  botanical: {
    borderTop: '1px solid #d9d6c8',
    kickerColor: '#5c6b3c',
    titleColor: '#3a4a24',
    titleClass: 'font-serif-royal text-xl font-semibold',
    cardBg: '#ffffff',
    cardBorder: '1px solid #c5ccb2',
    cardRadius: 'rounded-2xl',
    badgeBg: '#4a5d23',
    badgeColor: '#f9f7f0',
    duitNowAccent: '#ed2e67',
    textColor: '#2f3822',
    mutedColor: '#5d664e',
    qrDark: '#3a4a24',
    btnBg: '#eef1e6',
    btnColor: '#3a4a24',
  },
  midnight: {
    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
    kickerColor: '#cbd5e1',
    titleColor: '#f8fafc',
    titleClass: 'font-sans-modern text-lg font-bold tracking-[0.06em] uppercase',
    cardBg: '#121d3b',
    cardBorder: '1px solid rgba(212, 175, 55, 0.35)',
    cardRadius: 'rounded-2xl',
    badgeBg: '#d4af37',
    badgeColor: '#0b132b',
    duitNowAccent: '#ed2e67',
    textColor: '#f1f5f9',
    mutedColor: '#94a3b8',
    qrDark: '#0b132b',
    btnBg: '#1c2a52',
    btnColor: '#f3d87a',
  },
  terracotta: {
    borderTop: '1px solid #e4d2c1',
    kickerColor: '#a64d32',
    titleColor: '#7a3420',
    titleClass: 'font-serif-floral text-2xl font-semibold',
    cardBg: '#ffffff',
    cardBorder: '1px solid #dfc3ab',
    cardRadius: 'rounded-3xl',
    badgeBg: '#b85035',
    badgeColor: '#fbf6f0',
    duitNowAccent: '#ed2e67',
    textColor: '#4a2e23',
    mutedColor: '#7d5a48',
    qrDark: '#7a3420',
    btnBg: '#f3e5d8',
    btnColor: '#7a3420',
  },
}

export default function QrGiftSection({ data, variant = 'royal' }) {
  const [locationQrUrl, setLocationQrUrl] = useState('')
  const [duitNowFallbackUrl, setDuitNowFallbackUrl] = useState('')
  const [copiedAcc, setCopiedAcc] = useState(false)

  const s = VARIANT_STYLES[variant] || VARIANT_STYLES.royal
  const showLocation = data.showLocationQr !== false
  const showDuitNow = data.showDuitNowQr !== false

  useEffect(() => {
    let active = true
    if (!showLocation) return
    const mapsTarget = sanitizeUrl(data.mapsUrl)
    QRCode.toDataURL(mapsTarget, {
      width: 220,
      margin: 1,
      color: { dark: s.qrDark, light: '#ffffff' },
    })
      .then((url) => {
        if (active) setLocationQrUrl(url)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [data.mapsUrl, showLocation, s.qrDark])

  useEffect(() => {
    let active = true
    if (!showDuitNow || data.duitNowQrImage) return
    const payload = `DUITNOW|BANK:${data.bankName || 'Maybank'}|ACC:${data.bankAccount || '123456789012'}|NAME:${data.bankHolder || data.brideName || 'Fatima'}`
    QRCode.toDataURL(payload, {
      width: 240,
      margin: 1,
      color: { dark: '#2c181a', light: '#ffffff' },
    })
      .then((url) => {
        if (active) setDuitNowFallbackUrl(url)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [data.bankName, data.bankAccount, data.bankHolder, data.brideName, data.duitNowQrImage, showDuitNow])

  if (!showLocation && !showDuitNow) return null

  const handleCopyAccount = async () => {
    if (!data.bankAccount) return
    try {
      await navigator.clipboard.writeText(data.bankAccount)
      setCopiedAcc(true)
      window.setTimeout(() => setCopiedAcc(false), 2000)
    } catch {
      setCopiedAcc(false)
    }
  }

  return (
    <section
      className="px-5 py-7 text-center"
      style={{ borderTop: s.borderTop }}
    >
      <p
        className="text-[10px] font-bold tracking-[0.24em] uppercase"
        style={{ color: s.kickerColor }}
      >
        Imbas Kod QR
      </p>
      <h3 className={`mt-1 mb-4 ${s.titleClass}`} style={{ color: s.titleColor }}>
        Lokasi &amp; Salam Kaut
      </h3>

      <div className="space-y-3.5">
        {/* Kod QR Lokasi */}
        {showLocation && (
          <div
            className={`${s.cardRadius} p-4 shadow-xs`}
            style={{ backgroundColor: s.cardBg, border: s.cardBorder }}
          >
            <div className="mb-3 flex items-center justify-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" style={{ color: s.titleColor }} />
              <p className="text-xs font-bold tracking-wider uppercase" style={{ color: s.titleColor }}>
                QR Lokasi Google Maps
              </p>
            </div>

            {locationQrUrl ? (
              <div className="mx-auto inline-block rounded-xl bg-white p-2.5 shadow-xs" style={{ border: '1px solid #e7e5e4' }}>
                <img
                  src={locationQrUrl}
                  alt="Kod QR Lokasi Google Maps"
                  className="mx-auto h-32 w-32 object-contain"
                />
              </div>
            ) : (
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-xl bg-stone-100">
                <QrCode className="h-8 w-8 text-stone-400" />
              </div>
            )}

            <p className="mt-2.5 text-[11px]" style={{ color: s.mutedColor }}>
              Imbas dengan kamera telefon untuk terus ke lokasi majlis.
            </p>
          </div>
        )}

        {/* Kod QR Hadiah / DuitNow */}
        {showDuitNow && (
          <div
            className={`${s.cardRadius} p-4 shadow-xs`}
            style={{ backgroundColor: s.cardBg, border: s.cardBorder }}
          >
            <div className="mb-2 flex items-center justify-center gap-1.5">
              <Gift className="h-3.5 w-3.5" style={{ color: s.duitNowAccent }} />
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase"
                style={{ backgroundColor: s.duitNowAccent }}
              >
                DuitNow QR
              </span>
            </div>

            <p className="mb-3 text-xs font-semibold" style={{ color: s.textColor }}>
              Hadiah &amp; Salam Kaut Digital
            </p>

            {data.duitNowQrImage || duitNowFallbackUrl ? (
              <div
                className="mx-auto inline-block rounded-xl bg-white p-2.5 shadow-xs"
                style={{ border: `2px solid ${s.duitNowAccent}` }}
              >
                <img
                  src={data.duitNowQrImage || duitNowFallbackUrl}
                  alt="Kod QR DuitNow Hadiah"
                  className="mx-auto h-36 w-36 object-contain"
                />
              </div>
            ) : (
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-xl bg-stone-100">
                <QrCode className="h-8 w-8 text-stone-400" />
              </div>
            )}

            <div className="mt-3 space-y-0.5 text-xs" style={{ color: s.textColor }}>
              <p className="font-bold">{data.bankName || 'Maybank'}</p>
              <p style={{ color: s.mutedColor }}>{data.bankHolder || data.brideName || 'Fatima Az-Zahra'}</p>
              <p className="font-mono text-sm font-bold tracking-wide">
                {data.bankAccount || '1624 8810 2934'}
              </p>
            </div>

            <button
              id="btn-copy-bank-account"
              type="button"
              onClick={handleCopyAccount}
              className="mt-3 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold transition-opacity hover:opacity-85"
              style={{ backgroundColor: s.btnBg, color: s.btnColor, border: s.cardBorder }}
            >
              {copiedAcc ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Nombor Akaun Disalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Salin No. Akaun</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
