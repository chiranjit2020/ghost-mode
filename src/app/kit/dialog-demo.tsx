'use client';

import { useState } from 'react';
import { PiCopy, PiShareNetwork, PiTrash, PiWhatsappLogo, PiXLogo } from 'react-icons/pi';
import {
  AvatarPicker,
  Button,
  ConfirmDialog,
  Dialog,
  GhostAvatar,
  menuItemClasses,
  RadioGroup,
  Sheet,
  TextArea,
  type AvatarKey,
} from '@/ui/components';

function Result({ text }: { text: string | null }) {
  return (
    <p aria-live="polite" className="text-sm text-smoke">
      {text ?? 'What happened shows here.'}
    </p>
  );
}

/** Danger confirm, with the loading step a real delete has. */
export function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary" size="sm" icon={PiTrash} onClick={() => setOpen(true)}>
        Delete post
      </Button>
      <Result text={result} />
      <ConfirmDialog
        open={open}
        danger
        title="Delete this post?"
        description="It disappears for everyone, and the 40 Devil Points it earned go with it. This can’t be undone."
        confirmLabel="Delete"
        loading={busy}
        onClose={() => {
          setOpen(false);
          setResult('Cancelled. Nothing was deleted.');
        }}
        onConfirm={() => {
          setBusy(true);
          setTimeout(() => {
            setBusy(false);
            setOpen(false);
            setResult('Deleted (pretend).');
          }, 1200);
        }}
      />
    </div>
  );
}

/** A short form, which can't be closed by accident once you've typed. */
export function ReportDemo() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const dirty = reason !== '' || note !== '';
  const close = (msg: string) => {
    setOpen(false);
    setReason('');
    setNote('');
    setResult(msg);
  };
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Report MidnightMoth
      </Button>
      <Result text={result} />
      <Dialog
        open={open}
        size="md"
        dismissible={!dirty}
        onClose={() => close('Closed without reporting.')}
        title="Report MidnightMoth"
        description="Only moderators see reports. MidnightMoth won’t know it was you."
        footer={
          <>
            <Button variant="secondary" size="sm" className="max-sm:w-full" onClick={() => close('Cancelled. Nothing was sent.')}>
              Cancel
            </Button>
            <Button size="sm" className="max-sm:w-full" disabled={!reason} onClick={() => close(`Report sent: ${reason}.`)}>
              Send report
            </Button>
          </>
        }
      >
        <RadioGroup
          legend="What’s wrong?"
          name="report-reason"
          value={reason}
          onChange={setReason}
          options={[
            { value: 'Bullying', label: 'Bullying or threats' },
            { value: 'Real name', label: 'Shares someone’s real name or photo', description: 'Ghost Mode is never about real people.' },
            { value: 'Spam', label: 'Spam or scams' },
            { value: 'Other', label: 'Something else' },
          ]}
        />
        <TextArea
          label="Anything else?"
          optional
          rows={3}
          maxLength={300}
          className="mt-4"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Dialog>
    </div>
  );
}

/** Sheet: a list to pick from. Bottom of the screen on phones. */
export function ShareSheetDemo() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const pick = (what: string) => () => {
    setOpen(false);
    setResult(what);
  };
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary" size="sm" icon={PiShareNetwork} onClick={() => setOpen(true)}>
        Share
      </Button>
      <Result text={result} />
      <Sheet open={open} onClose={() => setOpen(false)} title="Share this post" description="Links show the post, never who wrote it.">
        <ul className="-mx-2">
          {[
            { label: 'Copy link', icon: PiCopy },
            { label: 'WhatsApp', icon: PiWhatsappLogo },
            { label: 'X', icon: PiXLogo },
          ].map(({ label, icon: Icon }) => (
            <li key={label}>
              <button type="button" className={menuItemClasses()} onClick={pick(`Shared to ${label} (pretend).`)}>
                <Icon aria-hidden className="size-5 shrink-0" />
                <span className="font-medium">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}

/** Sheet with a form inside and a Save button. */
export function AvatarSheetDemo() {
  const [open, setOpen] = useState(false);
  const [face, setFace] = useState<AvatarKey>('ghost');
  const [draft, setDraft] = useState<AvatarKey>('ghost');
  return (
    <div className="flex flex-wrap items-center gap-4">
      <GhostAvatar avatarKey={face} />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          setDraft(face);
          setOpen(true);
        }}
      >
        Change face
      </Button>
      <Sheet
        open={open}
        size="md"
        onClose={() => setOpen(false)}
        title="Choose your face"
        footer={
          <>
            <Button variant="secondary" size="sm" className="max-sm:w-full" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="max-sm:w-full"
              onClick={() => {
                setFace(draft);
                setOpen(false);
              }}
            >
              Save
            </Button>
          </>
        }
      >
        {open ? <AvatarPicker legend="Faces" defaultValue={draft} onChange={setDraft} /> : null}
      </Sheet>
    </div>
  );
}
