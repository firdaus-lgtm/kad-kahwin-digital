import { useState } from 'react'
import { Check, Code2, Copy, Download, FileText, Printer, X } from 'lucide-react'

export default function ExportModal({
  isOpen,
  onClose,
  generatedHtml,
  onExportPdf,
  isExportingPdf,
  pdfError,
  brideName,
  groomName,
}) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const slug = `${brideName || 'kad'}-${groomName || 'kahwin'}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleDownloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `kad-kahwin-${slug || 'digital'}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      id="export-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h2 id="export-modal-title" className="text-base font-bold text-stone-900">
              Simpan / Jana Kad Kahwin
            </h2>
            <p className="text-xs text-stone-500">
              Eksport terus ke PDF, cetak, atau muat turun kod HTML yang dijana.
            </p>
          </div>
          <button
            id="btn-close-export-modal"
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="cursor-pointer rounded-lg p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-3 border-b border-stone-200 bg-stone-50 p-5 sm:grid-cols-3">
          <button
            id="btn-download-pdf"
            type="button"
            disabled={isExportingPdf}
            onClick={() => onExportPdf(`kad-kahwin-${slug || 'digital'}.pdf`)}
            className="flex cursor-pointer flex-col items-start rounded-xl border border-stone-900 bg-stone-900 p-3.5 text-left text-white transition hover:bg-stone-800 disabled:opacity-60"
          >
            <FileText className="mb-2 h-5 w-5 text-amber-300" />
            <span className="text-sm font-semibold">
              {isExportingPdf ? 'Menjana PDF...' : 'Muat Turun PDF'}
            </span>
            <span className="mt-0.5 text-[11px] text-stone-300">
              html2canvas + jsPDF
            </span>
          </button>

          <button
            id="btn-download-html"
            type="button"
            onClick={handleDownloadHtml}
            className="flex cursor-pointer flex-col items-start rounded-xl border border-stone-300 bg-white p-3.5 text-left text-stone-900 transition hover:border-stone-400 hover:bg-stone-100/60"
          >
            <Download className="mb-2 h-5 w-5 text-rose-800" />
            <span className="text-sm font-semibold">Muat Turun HTML</span>
            <span className="mt-0.5 text-[11px] text-stone-500">
              Fail tunggal siap guna
            </span>
          </button>

          <button
            id="btn-print-card"
            type="button"
            onClick={() => window.print()}
            className="flex cursor-pointer flex-col items-start rounded-xl border border-stone-300 bg-white p-3.5 text-left text-stone-900 transition hover:border-stone-400 hover:bg-stone-100/60"
          >
            <Printer className="mb-2 h-5 w-5 text-stone-700" />
            <span className="text-sm font-semibold">Cetak / Print</span>
            <span className="mt-0.5 text-[11px] text-stone-500">
              Dialog cetak pelayar
            </span>
          </button>
        </div>

        {pdfError && (
          <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs text-red-700">
            {pdfError}
          </div>
        )}

        {/* HTML Code Viewer */}
        <div className="flex flex-1 flex-col overflow-hidden p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <Code2 className="h-4 w-4" />
              Kod HTML Dijana
            </span>
            <button
              id="btn-copy-html"
              type="button"
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-2.5 py-1 text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Salin Kod</span>
                </>
              )}
            </button>
          </div>

          <pre className="flex-1 overflow-auto rounded-xl bg-stone-950 p-4 font-mono text-[11px] leading-relaxed text-stone-200">
            <code>{generatedHtml}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
