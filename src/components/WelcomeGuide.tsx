import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FadeUp } from './Motion';

const slides = [
  {
    headline: 'Welcome to Rewards Club',
    body: 'Discounts on brands you use, plus access to gigs and meet and greets. New stuff lands every week.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    headline: 'Claim discount codes',
    body: 'Tap a card, get a code, use it at checkout. Brands like Myntra, Zepto, Nykaa. Each code is single use and has an expiry.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    headline: 'Register for events',
    body: 'Concerts, meet and greets, listening parties. Some are first come first served, others pick winners from entries. Register and we\'ll let you know.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    headline: 'Everything lives in History',
    body: 'Codes you\'ve claimed, events you\'ve registered for. It\'s all under History in the nav. You can always come back to copy a code or check a booking.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function WelcomeGuide() {
  const { state, dispatch } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);

  if (state.hasSeenWelcome) return null;

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      dispatch({ type: 'DISMISS_WELCOME' });
    }, 300);
  };

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      handleDismiss();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  return (
    <div className={`transition-all duration-300 ${isDismissing ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
      <FadeUp delay={100}>
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm overflow-hidden relative">
          {/* Close X */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 md:top-5 md:right-5 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group z-10"
            aria-label="Skip welcome guide"
          >
            <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Slide content */}
          <div className="px-5 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6">
            <div
              key={currentSlide}
              className="animate-fade-up"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 mb-4">
                {slide.icon}
              </div>

              {/* Text */}
              <h2 className="text-lg md:text-xl font-black text-gray-900 tracking-tight mb-2">
                {slide.headline}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                {slide.body}
              </p>
            </div>
          </div>

          {/* Footer: dots + navigation */}
          <div className="px-5 md:px-8 pb-5 md:pb-7 flex items-center justify-between gap-4">
            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? 'w-5 bg-gray-900'
                      : i < currentSlide
                        ? 'w-1.5 bg-gray-400'
                        : 'w-1.5 bg-gray-200'
                  }`}
                />
              ))}
              <span className="text-[10px] text-gray-300 ml-2 font-medium">
                {currentSlide + 1}/{slides.length}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              {currentSlide > 0 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {isLast ? 'Got it, let\'s go' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
