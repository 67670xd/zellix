'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent">
          {label}
        </label>
      )}
      <input
        className={cn(
          'glass w-full rounded-lg border border-cyberpunk-primary/30 bg-cyberpunk-surface/50 px-4 py-3 text-cyberpunk-text placeholder-cyberpunk-text/40 transition-all duration-200',
          'focus:border-cyberpunk-primary/60 focus:outline-none focus:ring-2 focus:ring-cyberpunk-primary/30 focus:shadow-lg focus:shadow-cyberpunk-primary/10',
          'hover:border-cyberpunk-primary/50',
          error && 'border-red-500 focus:ring-red-500/30',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
