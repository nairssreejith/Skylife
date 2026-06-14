import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export default function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition';
  const styles =
    variant === 'primary'
      ? 'bg-gold text-ink hover:bg-gold/90'
      : 'border border-bone/30 text-bone hover:bg-bone/5';
  return <button className={cn(base, styles, className)} {...props} />;
}
