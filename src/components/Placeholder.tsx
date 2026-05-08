interface PlaceholderProps {
  label?: string;
  description?: string;
  aspectRatio?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Placeholder({ label = 'IMG', description, aspectRatio = 'aspect-square', className = '' }: PlaceholderProps) {
  return (
    <div className={`${aspectRatio} bg-gray-100 border-2 border-gray-300 rounded flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="w-10 h-14 border-2 border-gray-300 rounded mx-auto mb-1.5 flex items-center justify-center">
          <span className="text-[8px] text-gray-400 font-medium">IMG</span>
        </div>
        {label && <div className="text-[10px] text-gray-400 font-medium">{label}</div>}
        {description && <div className="text-[8px] text-gray-300">{description}</div>}
      </div>
    </div>
  );
}

export function LogoPlaceholder({ label = 'Logo', className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`w-10 h-10 bg-gray-100 border border-gray-300 rounded flex items-center justify-center flex-shrink-0 ${className}`}>
      <span className="text-[7px] text-gray-400 font-medium">{label}</span>
    </div>
  );
}
