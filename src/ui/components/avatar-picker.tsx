'use client';

import { useId, useState } from 'react';
import { cn } from '../cn';
import { AVATAR_KEYS, AVATAR_PRESETS, AVATAR_TINT, type AvatarKey } from './avatar';

/**
 * AvatarPicker: choose your preset face (sign-up, and later your profile). See /kit#avatar.
 *
 * It is a radio group underneath (one of many, arrow keys move, the form sends `name=<key>`), shown as a grid of
 * faces. The chosen face gets a bone ring, and its name is written under the grid, because an icon alone can be
 * read two ways. Every tile is 56px, above the 44px minimum.
 */
export function AvatarPicker({
  legend = 'Choose your face',
  name = 'avatar',
  defaultValue = 'ghost',
  onChange,
  className,
}: {
  legend?: string;
  name?: string;
  defaultValue?: AvatarKey;
  onChange?: (key: AvatarKey) => void;
  className?: string;
}) {
  const groupId = useId();
  const [chosen, setChosen] = useState<AvatarKey>(defaultValue);
  return (
    <fieldset className={className}>
      <legend className="mb-2 text-sm font-semibold text-bone">{legend}</legend>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {AVATAR_KEYS.map((key) => {
          const p = AVATAR_PRESETS[key];
          const Icon = p.icon;
          const id = `${groupId}-${key}`;
          return (
            <label key={key} htmlFor={id} className="flex cursor-pointer justify-center">
              <input
                id={id}
                type="radio"
                name={name}
                value={key}
                checked={chosen === key}
                onChange={() => {
                  setChosen(key);
                  onChange?.(key);
                }}
                className="peer sr-only"
              />
              <span className="sr-only">{p.label}</span>
              <span
                aria-hidden
                className={cn(
                  'flex size-14 items-center justify-center rounded-full border-2 border-transparent p-1 transition-colors duration-150',
                  'hover:border-line-strong peer-checked:border-bone',
                  'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember',
                )}
              >
                <span className={cn('flex size-full items-center justify-center rounded-full ring-1 ring-line ring-inset', AVATAR_TINT[p.tint])}>
                  <Icon className="size-6" />
                </span>
              </span>
            </label>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-ash">
        Chosen: <span className="font-semibold text-bone">{AVATAR_PRESETS[chosen].label}</span>
      </p>
    </fieldset>
  );
}
