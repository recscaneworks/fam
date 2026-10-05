import React from 'react';
import { Partner } from '../types';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface PartnersSectionProps {
  partners: Partner[];
  onOpenAdmin: () => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ partners, onOpenAdmin }) => {
  return (
    <section id="emekdasliqlar" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-neutral-200 bg-white">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
          <Award className="w-3.5 h-3.5 text-black" />
          <span>Etibar və Əməkdaşlıq</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 mb-2">
          Rəsmi Əməkdaşlıqlarımız
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Bakıda və beynəlxalq miqyasda ən mötəbər dövlət tədbirlərində, forumlarda və iri şirkətlərin ziyafətlərində FAM FOOD keyfiyyətinə güvənirlər.
        </p>
      </div>

      {/* Partners Cards with REAL LOGOS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-6">
        {partners.map(partner => (
          <div
            key={partner.id}
            className="group bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-black rounded-2xl p-3.5 flex flex-col items-center justify-between text-center transition-all duration-200 shadow-2xs hover:shadow-md min-h-[140px]"
          >
            {/* Real Logo Image Container */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-100 border-2 border-neutral-200 group-hover:border-black p-0.5 mb-2.5 shadow-2xs transition-all flex items-center justify-center shrink-0">
              {partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fb = document.createElement('div');
                      fb.className = 'w-full h-full flex items-center justify-center font-bold text-xs text-black';
                      fb.innerText = partner.name.slice(0, 2).toUpperCase();
                      parent.appendChild(fb);
                    }
                  }}
                />
              ) : (
                <div className="font-bold text-xs text-black">
                  {partner.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="w-full">
              <h3 className="font-sans text-xs sm:text-sm font-extrabold text-neutral-950 mb-0.5 leading-snug truncate">
                {partner.name}
              </h3>
              <span className="text-[10px] text-neutral-500 font-semibold block truncate">
                {partner.type}
              </span>
              {partner.highlight && (
                <span className="text-[9px] text-neutral-400 mt-1 line-clamp-1 hidden sm:block">
                  {partner.highlight}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Admin Quick Trigger Button */}
      <div className="text-center pt-2">
        <button
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-600 hover:text-black bg-neutral-100 hover:bg-neutral-200 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-black" />
          <span>Şirkət və ya Loqo Əlavə Et (Şifrəli Admin)</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </section>
  );
};
