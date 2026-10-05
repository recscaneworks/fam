import React, { useState } from 'react';
import { X, Copy, Check, Download, CodeXml } from 'lucide-react';

interface SingleHtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  singleHtmlCode: string;
}

export const SingleHtmlExportModal: React.FC<SingleHtmlExportModalProps> = ({
  isOpen,
  onClose,
  singleHtmlCode
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(singleHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([singleHtmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ziyafet_catering_fpv.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-[#1a1410] border border-[#443322] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#231b14] border-b border-[#3b2d1e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c5a059] flex items-center justify-center text-black font-bold">
              <CodeXml className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#f5efe4]">
                Tək Fayllıq (Single-File) HTML Kod
              </h3>
              <p className="text-xs text-[#9c8e7d]">
                Bütün HTML, CSS, JavaScript və Tailwind CDN tək bir müstəqil fayl kimi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9e8f7e] hover:text-white rounded-lg hover:bg-[#34271c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3 bg-[#16120e] border-b border-[#2d2217] flex items-center justify-between gap-3">
          <span className="text-xs text-[#a59785]">
            Brauzerdə birbaşa açmaq üçün faylı yükləyin və ya kodu kopyalayın:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black bg-[#c5a059] hover:bg-[#d9b66f] rounded-lg transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#f5efe4] bg-[#2a2017] hover:bg-[#3a2d21] border border-[#443323] rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.HTML Yüklə</span>
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="p-4 bg-[#110e0c] flex-1 overflow-y-auto">
          <pre className="text-[11px] font-mono text-[#dcd2c4] leading-relaxed whitespace-pre-wrap select-all">
            {singleHtmlCode}
          </pre>
        </div>
      </div>
    </div>
  );
};
