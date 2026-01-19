'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  glow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-gradient-to-r from-cyberpunk-primary to-cyberpunk-accent text-cyberpunk-bg hover:shadow-lg hover:shadow-cyberpunk-primary/50',
    secondary:
      'bg-gradient-to-r from-cyberpunk-secondary to-cyberpunk-primary text-cyberpunk-bg hover:shadow-lg hover:shadow-cyberpunk-secondary/50',
    accent:
      'bg-cyberpunk-accent text-cyberpunk-bg hover:shadow-lg hover:shadow-cyberpunk-accent/50',
    outline:
      'border-2 border-cyberpunk-primary text-cyberpunk-primary hover:bg-cyberpunk-primary/10 hover:border-cyberpunk-accent',
    ghost:
      'text-cyberpunk-primary hover:text-cyberpunk-accent hover:bg-cyberpunk-primary/5',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm rounded',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        glow && 'hover:shadow-xl shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
