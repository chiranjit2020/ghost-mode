import Image from 'next/image';
import Link from 'next/link';
import { PiList, PiX } from 'react-icons/pi';
import { ButtonLink, iconButtonClasses, iconButtonIconClass, menuItemClasses, menuPanelClasses, Tag } from '@/ui/components';

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
      <Tag size="sm" tone="crimson">
        Ghost Mode
      </Tag>
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
            <nav aria-label="Sections" className={`${menuPanelClasses} absolute right-0 mt-2`}>
              <ul>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={menuItemClasses()}>
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
