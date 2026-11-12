import type { ReactNode } from 'react';
import { cn } from '@/ui/cn';

export type Status = 'done' | 'review' | 'next' | 'planned';

const STATUS_LABEL: Record<Status, string> = { done: 'Approved', review: 'In review', next: 'Next', planned: 'Planned' };
const STATUS_LOOK: Record<Status, string> = {
  done: 'bg-bone text-ink',
  review: 'bg-ember/15 text-ember',
  next: 'border border-line-strong text-ash',
  planned: 'text-smoke',
};

export function StatusTag({ status }: { status: Status }) {
  return (
    <span className={cn('rounded-full px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide uppercase', STATUS_LOOK[status])}>
      {STATUS_LABEL[status]}
    </span>
  );
}

/** One component's page section: name, status, what it's for, then the specimens. */
export function Spec({
  id,
  title,
  status,
  summary,
  use,
  avoid,
  children,
}: {
  id: string;
  title: string;
  status: Status;
  summary: string;
  use?: string[];
  avoid?: string[];
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-3xl font-extrabold text-bone">{title}</h2>
        <StatusTag status={status} />
      </div>
      <p className="mt-3 max-w-2xl text-ash">{summary}</p>
      {use || avoid ? (
        <div className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
          {use ? <RuleList title="Use for" items={use} /> : null}
          {avoid ? <RuleList title="Don't use for" items={avoid} /> : null}
        </div>
      ) : null}
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

function RuleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-field border border-line bg-surface/60 p-4">
      <p className="text-xs font-semibold tracking-[0.16em] text-smoke uppercase">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-bone">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="text-smoke">
              ·
            </span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A labelled box of specimens. */
export function Specimen({ title, note, children, className }: { title: string; note?: string; children: ReactNode; className?: string }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-base font-bold text-bone">{title}</h3>
        {note ? <p className="text-sm text-smoke">{note}</p> : null}
      </div>
      <div className={cn('rounded-card border border-line bg-charcoal p-5 sm:p-6', className)}>{children}</div>
    </div>
  );
}

/** A grid of rows (variants) × columns (states), each cell labelled on phones where there's no header row. */
export function StateGrid({ columns, rows }: { columns: string[]; rows: { label: string; cells: ReactNode[] }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-left">
        <thead className="hidden md:table-header-group">
          <tr>
            <th className="w-28 pb-1 text-xs font-semibold tracking-[0.14em] text-smoke uppercase">Variant</th>
            {columns.map((c) => (
              <th key={c} className="pb-1 text-xs font-semibold tracking-[0.14em] text-smoke uppercase">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="flex flex-wrap items-center gap-3 border-b border-line pb-3 md:table-row md:border-0 md:pb-0">
              <th scope="row" className="w-full text-sm font-semibold text-bone md:w-28 md:pr-4">
                {r.label}
              </th>
              {r.cells.map((cell, i) => (
                <td key={columns[i]} className="md:pr-4">
                  <span className="mb-1 block text-[0.68rem] text-smoke uppercase md:hidden">{columns[i]}</span>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
