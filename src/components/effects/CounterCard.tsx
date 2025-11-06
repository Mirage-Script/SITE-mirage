import { useRef } from 'react';

import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface CounterCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

/**
 * Displays an animated counter card with label.
 * Counter animates from 0 to the specified value when entering viewport.
 * 
 * @example
 * <CounterCard 
 *   label="Projects Completed"
 *   value={150}
 *   suffix="+"
 *   duration={2}
 * />
 */
export function CounterCard({
  label,
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  labelClassName = 'text-neutral-400 text-sm',
  valueClassName = 'text-3xl font-semibold text-neutral-900 dark:text-neutral-50',
}: CounterCardProps) {
  const counterRef = useRef<HTMLDivElement>(null);

  useCounterAnimation(counterRef, {
    to: value,
    duration,
    format: (val) => `${prefix}${Math.round(val).toLocaleString()}${suffix}`,
  });

  return (
    <div className={className}>
      <dt className={labelClassName}>{label}</dt>
      <dd ref={counterRef} className={valueClassName}>
        {prefix}0{suffix}
      </dd>
    </div>
  );
}

