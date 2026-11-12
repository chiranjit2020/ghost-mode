'use client';

import { useEffect, useRef, useState } from 'react';

function toHex(rgb: string): string {
  const m = rgb.match(/rgba?\(([^)]+)\)/);
  if (!m) return rgb;
  const [r, g, b, a] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  const hex = '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('');
  return a !== undefined && a < 1 ? `${hex} · ${Math.round(a * 100)}%` : hex;
}

/**
 * A colour swatch that reads its value from the page's real CSS, so the kit can never show a stale hex
 * (the token file stays the only place a colour is written).
 */
export function Swatch({ className, name, role }: { className: string; name: string; role: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    if (ref.current) setValue(toHex(getComputedStyle(ref.current).backgroundColor));
  }, []);
  return (
    <li className="overflow-hidden rounded-field border border-line bg-surface">
      <div ref={ref} className={`h-16 border-b border-line ${className}`} />
      <div className="p-3">
        <p className="text-sm font-semibold text-bone">{name}</p>
        <p className="mt-0.5 font-mono text-xs text-smoke">{value || ' '}</p>
        <p className="mt-1.5 text-xs leading-snug text-ash">{role}</p>
      </div>
    </li>
  );
}
