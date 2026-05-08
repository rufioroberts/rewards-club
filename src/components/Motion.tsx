import type { ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Fade-up entrance animation. Content rises 20px with opacity.
 * Use `delay` (in ms) for staggering multiple elements.
 */
export function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
  return (
    <div
      className={`animate-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Scale-in entrance. Subtle pop for cards and badges.
 */
export function ScaleIn({ children, delay = 0, className = '' }: FadeUpProps) {
  return (
    <div
      className={`animate-scale-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Simple fade-in. No movement.
 */
export function FadeIn({ children, delay = 0, className = '' }: FadeUpProps) {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
