import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface AnnotationProps {
  id: string;
  note: string;
  type?: 'info' | 'question' | 'api';
}

/**
 * Annotation overlay for team context.
 * NOT part of the design -- these are developer/designer notes
 * that explain where data comes from, flag open questions,
 * or clarify component behaviour.
 * 
 * Uses a portal so tooltips are never clipped by overflow:hidden parents.
 */
export function Annotation({ id, note, type = 'info' }: AnnotationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; below: boolean }>({ top: 0, left: 0, below: false });

  const colors = {
    info: 'bg-blue-500',
    question: 'bg-amber-500',
    api: 'bg-emerald-500',
  };

  const labels = {
    info: 'Note',
    question: 'Open question',
    api: 'API field',
  };

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const below = spaceAbove < 120; // not enough room above, show below

      setTooltipPos({
        top: below ? rect.bottom + 8 : rect.top - 8,
        left: rect.left + rect.width / 2,
        below,
      });
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isOpen]);

  return (
    <span className="relative inline-flex ml-1.5 align-middle">
      <button
        ref={buttonRef}
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsOpen(!isOpen); }}
        className={`w-4 h-4 rounded-full ${colors[type]} text-white text-[9px] font-bold flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm annotation-marker`}
        title={note}
      >
        ?
      </button>
      {isOpen && createPortal(
        <div
          className="fixed z-[99999] w-64 pointer-events-auto"
          style={{
            top: tooltipPos.below ? tooltipPos.top : undefined,
            bottom: tooltipPos.below ? undefined : `calc(100vh - ${tooltipPos.top}px)`,
            left: tooltipPos.left,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Arrow on top (when tooltip is below) */}
          {tooltipPos.below && (
            <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto mb-[-4px]" />
          )}
          <div className="bg-gray-900 text-white text-[11px] leading-relaxed rounded-lg p-3 shadow-xl">
            <div className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1.5 ${colors[type]} text-white`}>
              {labels[type]}
            </div>
            <p>{note}</p>
          </div>
          {/* Arrow on bottom (when tooltip is above) */}
          {!tooltipPos.below && (
            <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto mt-[-4px]" />
          )}
        </div>,
        document.body
      )}
    </span>
  );
}

/**
 * Floating toggle to show/hide all annotation markers on the page.
 * Sits in bottom-left so it doesn't conflict with content.
 */
export function AnnotationToggle() {
  const [visible, setVisible] = useState(true);

  const toggleAnnotations = () => {
    setVisible(!visible);
    const markers = document.querySelectorAll('.annotation-marker');
    markers.forEach(el => {
      (el as HTMLElement).style.display = visible ? 'none' : 'flex';
    });
  };

  return (
    <button
      onClick={toggleAnnotations}
      className="fixed bottom-4 left-4 z-[9999] px-3 py-2 bg-gray-900 text-white text-[10px] font-bold rounded-full shadow-lg hover:bg-gray-700 transition-colors cursor-pointer flex items-center gap-1.5"
      title="Toggle team annotations"
    >
      <span className="w-3 h-3 rounded-full bg-blue-500 text-[8px] flex items-center justify-center">?</span>
      {visible ? 'Hide' : 'Show'} notes
    </button>
  );
}
