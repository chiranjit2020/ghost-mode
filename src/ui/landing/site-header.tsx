import Image from 'next/image';
import Link from 'next/link';
import { PiList, PiX } from 'react-icons/pi';
import { ButtonLink, iconButtonClasses, iconButtonIconClass } from '@/ui/components';

const NAV = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#dark-world', label: 'Dark World' },
  { href: '#devil-powers', label: 'Devil Powers' },
  { href: '#the-hunt', label: 'The Hunt' },
  { href: '#shadow-cloak', label: 'Shadow Cloak' },
  { href: '#privacy', label: 'Privacy' },
] as const;

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Howdy Ghost Mode, home">
      <Image src="/brand/howdy-wordmark-white.png" alt="" width={96} height={30} priority className="h-6 w-auto" />
      <span className="rounded-full bg-crimson/15 px-2 py-0.5 whitespace-nowrap text-[0.7rem] font-bold tracking-[0.14em] text-crimson uppercase">
        Ghost Mode
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <Brand />

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-3 py-2 text-sm text-ash transition hover:bg-surface hover:text-bone">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/enter" size="sm">
            <span className="sm:hidden">Join</span>
            <span className="hidden sm:inline">Join the Underworld</span>
          </ButtonLink>

          <details className="menu relative lg:hidden">
            <summary aria-label="Menu" className={iconButtonClasses({ size: 'sm', className: 'group' })}>
              <PiList aria-hidden className={`${iconButtonIconClass('sm')} group-open:hidden`} />
              <PiX aria-hidden className={`${iconButtonIconClass('sm')} hidden group-open:block`} />
            </summary>
            <nav aria-label="Sections" className="absolute right-0 mt-2 w-56 rounded-2xl border border-line-strong bg-surface p-2 shadow-2xl">
              <ul>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="block rounded-xl px-3 py-3 text-sm text-bone hover:bg-surface-2">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
