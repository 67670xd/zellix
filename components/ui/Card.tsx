'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = false, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        'glass rounded-lg border border-cyberpunk-primary/30 p-6 backdrop-blur-md',
        hover && 'transition-all duration-300 hover:border-cyberpunk-primary/60 hover:shadow-lg hover:shadow-cyberpunk-primary/20 cursor-pointer',
        glow && 'shadow-lg shadow-cyberpunk-primary/10',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4 pb-4 border-b border-cyberpunk-primary/20', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-primary via-cyberpunk-accent to-cyberpunk-secondary', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-cyberpunk-text/70', className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-6 flex items-center gap-4 border-t border-cyberpunk-primary/20 pt-6', className)}>
      {children}
    </div>
  );
}
