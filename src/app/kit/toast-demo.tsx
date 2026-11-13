'use client';

import { useState } from 'react';
import { PiBellSlash, PiCopy, PiPaperPlaneRight, PiTrash } from 'react-icons/pi';
import { Button, useToast } from '@/ui/components';

export function ToastDemo() {
  const toast = useToast();
  const [muted, setMuted] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" size="sm" icon={PiCopy} onClick={() => toast('Link copied')}>
          Plain
        </Button>
        <Button variant="secondary" size="sm" icon={PiPaperPlaneRight} onClick={() => toast('Posted to Confessions', { tone: 'success' })}>
          Success
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={PiBellSlash}
          onClick={() => {
            setMuted(true);
            toast('Muted MidnightMoth', { action: { label: 'Undo', onClick: () => setMuted(false) } });
          }}
        >
          With Undo
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={PiTrash}
          onClick={() =>
            toast('Couldn’t delete. Check your connection', {
              tone: 'error',
              action: { label: 'Retry', onClick: () => toast('Post deleted') },
            })
          }
        >
          Error
        </Button>
      </div>
      <p className="text-sm text-smoke">
        MidnightMoth is <span className="font-semibold text-bone">{muted ? 'muted' : 'not muted'}</span>.{' '}
        {muted ? (
          <button type="button" className="cursor-pointer text-link hover:underline" onClick={() => setMuted(false)}>
            Unmute
          </button>
        ) : null}
        {muted ? ' (Undo also lives here, because the toast goes away.)' : null}
      </p>
    </div>
  );
}
