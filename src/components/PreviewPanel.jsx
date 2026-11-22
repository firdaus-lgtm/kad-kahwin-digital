import { Eye, Lock, MailOpen, Music, Pause, Play, Smartphone, Download } from 'lucide-react'
import TemplateRoyal from './templates/TemplateRoyal'
import TemplateMinimal from './templates/TemplateMinimal'
import TemplateFloral from './templates/TemplateFloral'

const TEMPLATE_LABELS = {
  royal: 'Royal Burgundy',
  minimal: 'Modern Minimalist',
  floral: 'Floral Pastel',
}

export default function PreviewPanel({
  cardData,
  selectedTemplate,
  isInvitationOpen,
  onToggleInvitation,
  cardRef,
  onOpenExport,
  isMusicPlaying,
  onToggleMusic,
  wishes,
  onAddWish,
}) {
  const renderTemplate = () => {
    const props = {
      data: cardData,
      isOpen: isInvitationOpen,
      onOpen: () => onToggleInvitation(true),
      wishes,
      onAddWish,
    }

    switch (selectedTemplate) {
      case 'minimal':
        return <TemplateMinimal {...props} />
      case 'floral':
        return <TemplateFloral {...props} />
      case 'royal':
      default:
        return <TemplateRoyal {...props} />
    }
  }

  return (
    <section
      aria-label="Panel Pratonton Kad Kahwin"
      className="flex h-full flex-col items-center justify-start overflow-y-auto bg-stone-200/75 px-4 py-6 sm:px-6 lg:py-8"
    >
      {/* Bar Kawalan Pratonton */}
      <div className="mb-5 flex w-full max-w-[400px] flex-wrap items-center justify-between gap-2 rounded-2xl border border-stone-300/80 bg-white/90 px-3.5 py-2.5 shadow-xs backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-stone-600" />
          <span className="text-xs font-semibold text-stone-800">
            {TEMPLATE_LABELS[selectedTemplate] || 'Royal Burgundy'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="btn-toggle-cover"
            type="button"
            onClick={() => onToggleInvitation(!isInvitationOpen)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-100 px-2.5 py-1.5 text-[11px] font-semibold text-stone-700 transition hover:bg-stone-200"
          >
            {isInvitationOpen ? (
              <>
                <Lock className="h-3.5 w-3.5" />
                <span>Lihat Cover</span>
              </>
            ) : (
              <>
                <MailOpen className="h-3.5 w-3.5" />
                <span>Buka Isi</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenExport}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-stone-900 px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:bg-stone-800"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Jana</span>
          </button>
        </div>
      </div>

      {/* Bingkai Telefon Pintar (Mobile Screen Ratio) */}
      <div className="relative w-full max-w-[385px] rounded-[42px] border-[10px] border-stone-900 bg-stone-900 shadow-2xl">
        {/* Status Bar & Dynamic Notch */}
        <div className="flex items-center justify-between rounded-t-[30px] bg-stone-950 px-6 pt-2.5 pb-2 text-[11px] font-medium text-stone-300">
          <span>9:41</span>
          <div className="h-4 w-24 rounded-full bg-stone-900 ring-1 ring-stone-800" />
          <span className="flex items-center gap-1 text-[10px]">
            <Eye className="h-3 w-3" />
            <span>Live</span>
          </span>
        </div>

        {/* Skrin Kad Boleh Tatal */}
        <div className="relative h-[640px] w-full overflow-hidden rounded-b-[30px] bg-white">
          <div className="phone-scroll h-full w-full overflow-y-auto">
            <div id="printable-card-area" ref={cardRef}>
              {renderTemplate()}
            </div>
          </div>

          {/* Pemain Muzik Latar Terapung (dipaparkan selepas jemputan dibuka) */}
          {cardData.musicEnabled && isInvitationOpen && (
            <button
              id="preview-audio-toggle-btn"
              type="button"
              onClick={onToggleMusic}
              aria-label={isMusicPlaying ? 'Hentikan muzik latar' : 'Mainkan muzik latar'}
              className="absolute right-3.5 bottom-3.5 z-20 flex max-w-[235px] cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-stone-950/85 px-3 py-2 text-left text-white shadow-lg backdrop-blur-md transition hover:bg-stone-900"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#cfa855] text-[#3a050b]">
                {isMusicPlaying ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="ml-0.5 h-3.5 w-3.5" />
                )}
              </span>
              <span className="min-w-0 pr-1">
                <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-amber-200 uppercase">
                  <Music className="h-2.5 w-2.5" />
                  <span>{isMusicPlaying ? 'Sedang Dimainkan' : 'Muzik Latar'}</span>
                </span>
                <span className="block truncate text-[11px] font-medium text-white">
                  {cardData.musicTitle || 'Alunan Klasik Walimatul Urus'}
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-stone-500">
        {isInvitationOpen
          ? 'Tatal (scroll) di dalam skrin telefon untuk melihat keseluruhan kad & Kod QR.'
          : 'Klik butang "Buka Jemputan" pada skrin telefon untuk membuka kad & muzik latar.'}
      </p>
    </section>
  )
}
