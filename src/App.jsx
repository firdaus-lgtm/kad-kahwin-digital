import { useEffect, useMemo, useRef, useState } from 'react'
import { Eye, SlidersHorizontal, Sparkles } from 'lucide-react'
import ControlPanel from './components/ControlPanel'
import PreviewPanel from './components/PreviewPanel'
import ExportModal from './components/ExportModal'
import { exportCardToPdf, generateStandaloneHtml } from './utils/cardHelpers'
import { weddingAudio } from './utils/weddingAudio'

const DEFAULT_CARD_DATA = {
  brideName: 'Fatima Az-Zahra',
  groomName: 'Ahmed Faris',
  brideParents: 'Tuan Haji Abdul Rahman & Puan Hajah Aminah',
  groomParents: "Dato' Haji Ismail & Datin Hajah Zainab",
  eventDate: '2026-12-20',
  akadTime: '9:00 Pagi',
  eventTime: '12:00 Tengahari - 4:00 Petang',
  locationName: 'Dewan Seri Perdana, Kuala Lumpur',
  mapsUrl: 'https://maps.google.com',
  whatsappPhone: '60123456789',
  quote:
    'Dan di antara tanda-tanda yang membuktikan kekuasaan-Nya ialah Dia menciptakan untuk kamu pasangan hidup daripada jenis kamu sendiri, supaya kamu bersenang hati dan hidup mesra dengannya, dan dijadikan-Nya di antara kamu perasaan kasih sayang dan belas kasihan.',
  quoteSource: 'Surah Ar-Rum, Ayat 21',
  closingNote:
    'Kehadiran serta doa restu daripada para tetamu amat kami hargai dan menjadi penyeri hari bahagia kami.',
  musicEnabled: true,
  musicTitle: 'Alunan Klasik Walimatul Urus',
  customAudioUrl: '',
  showLocationQr: true,
  showDuitNowQr: true,
  showCountdown: true,
  showGuestbook: true,
  bankName: 'Maybank',
  bankHolder: 'Fatima Az-Zahra binti Abdul Rahman',
  bankAccount: '1624 8810 2934',
  duitNowQrImage: '',
}

const DEFAULT_WISHES = [
  {
    id: 1,
    name: 'Aisyah & Keluarga',
    attendance: 'Hadir',
    message: 'Selamat Pengantin Baru Fatima & Ahmed! Semoga kekal bahagia hingga ke Jannah.',
    time: '2 jam lalu',
  },
  {
    id: 2,
    name: 'Ustaz Hakim',
    attendance: 'Hadir',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fi khair.',
    time: 'Semalam',
  },
]

export default function App() {
  const [cardData, setCardData] = useState(DEFAULT_CARD_DATA)
  const [wishes, setWishes] = useState(DEFAULT_WISHES)
  const [selectedTemplate, setSelectedTemplate] = useState('royal')
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [mobileTab, setMobileTab] = useState('editor')
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const [pdfError, setPdfError] = useState('')

  const cardRef = useRef(null)

  useEffect(() => {
    weddingAudio.setCustomAudio(cardData.customAudioUrl)
  }, [cardData.customAudioUrl])

  useEffect(() => {
    if (!cardData.musicEnabled && isMusicPlaying) {
      weddingAudio.pause()
      setIsMusicPlaying(false)
    }
  }, [cardData.musicEnabled, isMusicPlaying])

  useEffect(() => {
    return () => {
      weddingAudio.stop()
    }
  }, [])

  const handleFieldChange = (field, value) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddWish = (newWish) => {
    setWishes((prev) => [newWish, ...prev])
  }

  const handleResetDefaults = () => {
    weddingAudio.stop()
    setIsMusicPlaying(false)
    setCardData(DEFAULT_CARD_DATA)
    setWishes(DEFAULT_WISHES)
  }

  const handleToggleMusic = () => {
    if (!cardData.musicEnabled) return
    if (isMusicPlaying) {
      weddingAudio.pause()
      setIsMusicPlaying(false)
    } else {
      weddingAudio.play()
      setIsMusicPlaying(true)
    }
  }

  const handleToggleInvitation = (nextOpen) => {
    setIsInvitationOpen(nextOpen)
    if (nextOpen && cardData.musicEnabled && !isMusicPlaying) {
      weddingAudio.play()
      setIsMusicPlaying(true)
    }
  }

  const generatedHtml = useMemo(
    () => generateStandaloneHtml(cardData, selectedTemplate),
    [cardData, selectedTemplate]
  )

  const handleExportPdf = async (filename) => {
    setPdfError('')
    setIsExportingPdf(true)
    try {
      if (!isInvitationOpen) {
        setIsInvitationOpen(true)
      }
      if (mobileTab !== 'preview') {
        setMobileTab('preview')
      }
      await new Promise((resolve) => window.setTimeout(resolve, 450))
      await exportCardToPdf(cardRef.current, filename)
    } catch (err) {
      setPdfError(err?.message || 'Gagal menjana fail PDF. Sila cuba lagi.')
    } finally {
      setIsExportingPdf(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-stone-100 text-stone-900">
      {/* Header Aplikasi */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-stone-200 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5c0a14] text-[#e5c985] shadow-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold tracking-tight text-stone-900 sm:text-base">
              Pembina Kad Kahwin
            </h1>
            <p className="hidden text-[11px] text-stone-500 sm:block">
              Reka, pratonton langsung &amp; eksport kad jemputan anda
            </p>
          </div>
        </div>

        {/* Penukar Tab untuk Skrin Telefon Pintar */}
        <div
          role="tablist"
          aria-label="Paparan Pembina"
          className="flex rounded-xl bg-stone-100 p-1 lg:hidden"
        >
          <button
            id="tab-mobile-editor"
            role="tab"
            aria-selected={mobileTab === 'editor'}
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              mobileTab === 'editor'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Sunting</span>
          </button>

          <button
            id="tab-mobile-preview"
            role="tab"
            aria-selected={mobileTab === 'preview'}
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              mobileTab === 'preview'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Pratonton</span>
          </button>
        </div>
      </header>

      {/* Ruang Kerja 2 Bahagian (Desktop Split / Mobile Tabs) */}
      <main className="grid flex-1 grid-cols-1 lg:h-[calc(100dvh-61px)] lg:grid-cols-[440px_1fr] lg:overflow-hidden">
        <div className={`${mobileTab === 'editor' ? 'block' : 'hidden'} lg:block lg:h-full lg:overflow-hidden`}>
          <ControlPanel
            cardData={cardData}
            onChange={handleFieldChange}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={(tpl) => setSelectedTemplate(tpl)}
            onOpenExport={() => setIsExportOpen(true)}
            onResetDefaults={handleResetDefaults}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
          />
        </div>

        <div className={`${mobileTab === 'preview' ? 'block' : 'hidden'} lg:block lg:h-full lg:overflow-hidden`}>
          <PreviewPanel
            cardData={cardData}
            selectedTemplate={selectedTemplate}
            isInvitationOpen={isInvitationOpen}
            onToggleInvitation={handleToggleInvitation}
            cardRef={cardRef}
            onOpenExport={() => setIsExportOpen(true)}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
            wishes={wishes}
            onAddWish={handleAddWish}
          />
        </div>
      </main>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        generatedHtml={generatedHtml}
        onExportPdf={handleExportPdf}
        isExportingPdf={isExportingPdf}
        pdfError={pdfError}
        brideName={cardData.brideName}
        groomName={cardData.groomName}
      />
    </div>
  )
}
