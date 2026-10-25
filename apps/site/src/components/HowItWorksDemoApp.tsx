import { useRef } from 'react';
import { DemoCursor } from './DemoCursor';
import { GlideCursor } from './GlideCursor';
import { TypedText } from './TypedText';
import { CircleCheckIcon } from '../icons/CircleCheckIcon';
import type { HowItWorksStep } from '../types/HowItWorksStep';
import type { FC } from 'react';

export type HowItWorksDemoAppProps = {
  view: HowItWorksStep['view'];
};

const tabs = ['Customers', 'Orders', 'Billing', 'Support'];

const orders = [
  { number: '#48213', customer: 'Ana Ruiz', total: '$129.00', placedAt: 'Oct 20, 2026' },
  { number: '#48207', customer: 'Ana Ruiz', total: '$54.00', placedAt: 'Oct 18, 2026' },
  { number: '#48190', customer: 'Ana Ruiz', total: '$212.50', placedAt: 'Oct 12, 2026' },
  { number: '#48172', customer: 'Ana Ruiz', total: '$39.90', placedAt: 'Oct 3, 2026' },
];

const email = 'ana@northwind.example';

// The backoffice in the browser of the how-it-works demo, laid out like the AwaitIO app itself: the header with tabs,
// the page with its actions as buttons, and each io call as a card on the grey page, in the warm colors of the site.
export const HowItWorksDemoApp: FC<HowItWorksDemoAppProps> = ({ view }) => {
  const isForm = view === 'email' || view === 'typing' || view === 'filled';
  const isTable = view === 'table' || view === 'pickOne' || view === 'pickTwo';
  const isRefund = view === 'refundOne' || view === 'refundTwo';
  const picked = [view === 'pickOne' || view === 'pickTwo', false, view === 'pickTwo', false];
  const tableRef = useRef<HTMLDivElement>(null);
  const firstRowRef = useRef<HTMLSpanElement>(null);
  const thirdRowRef = useRef<HTMLSpanElement>(null);
  const continueRef = useRef<HTMLSpanElement>(null);
  const tableTargets = {
    table: { ref: firstRowRef, delay: 300 },
    pickOne: { ref: thirdRowRef, delay: 0 },
    pickTwo: { ref: continueRef, delay: 150 },
  };
  const tableTarget = isTable ? tableTargets[view] : undefined;

  return (
    <div className="flex min-h-[25rem] flex-1 flex-col bg-white text-left text-gray-900">
      <div className="border-b border-gray-200 px-4 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Backoffice</span>
          <span className="text-[11px] text-gray-500">Demo</span>
        </div>
        <div className="mt-2 flex gap-4 text-[11px] text-gray-500">
          {tabs.map((tab) => {
            return (
              <span key={tab} className={['pb-2', tab === 'Orders' && 'border-b-2 border-gray-900 font-medium text-gray-900'].filter(Boolean).join(' ')}>
                {tab}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 bg-gray-50">
        <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-4">
          {view === 'list' && (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Orders</p>
                  <p className="text-[11px] text-gray-500">Every order placed in the stores.</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <span className="relative rounded-md bg-gray-900 px-2.5 py-1 text-[11px] font-medium text-white">
                    Refund orders
                    <DemoCursor key={view} delay={1300} />
                  </span>
                  <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium">Resend receipt</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white text-[11px]">
                <div className="grid grid-cols-[1fr_1.3fr_1fr] px-3 py-2 text-gray-500">
                  <span>Number</span>
                  <span>Customer</span>
                  <span>Total</span>
                </div>
                {orders.map((order) => {
                  return (
                    <div key={order.number} className="grid grid-cols-[1fr_1.3fr_1fr] border-t border-gray-100 px-3 py-2">
                      <span className="font-mono">{order.number}</span>
                      <span className="text-orange-600">{order.customer}</span>
                      <span>{order.total}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {view !== 'list' && (
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <p className="text-[11px] text-gray-500">← Orders</p>
                <p className="text-sm font-semibold">Refund orders</p>
              </div>
              {view !== 'done' && <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium">Cancel</span>}
            </div>
          )}

          {isForm && (
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <label className="flex flex-col gap-1.5 text-xs font-medium">
                Customer email
                <span className="rounded-md border border-gray-300 px-2.5 py-1.5 font-normal ring-2 ring-orange-200">
                  {view === 'email' && <span className="inline-block h-[1em] w-px trangray-y-[2px] animate-pulse bg-gray-900" />}
                  {view === 'typing' && <TypedText text={email} duration={1200} />}
                  {view === 'filled' && email}
                </span>
              </label>
              <span
                className={['relative self-start rounded-md px-3 py-1.5 text-[11px] font-medium text-white', view === 'filled' && 'bg-gray-700', view !== 'filled' && 'bg-gray-900']
                  .filter(Boolean)
                  .join(' ')}
              >
                Continue
                {view === 'filled' && <DemoCursor key={view} delay={0} />}
              </span>
            </div>
          )}

          {(view === 'loading' || isRefund) && (
            <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <span className="flex items-center gap-2 text-xs font-medium">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
                {view === 'loading' ? 'Loading orders…' : 'Refunding orders…'}
              </span>
              {isRefund && (
                <span className="flex items-center gap-3 pl-5.5 text-[11px] text-gray-500">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <span
                      className={['block h-full rounded-full bg-orange-500 transition-[width] duration-700', view === 'refundOne' && 'w-1/2', view === 'refundTwo' && 'w-full']
                        .filter(Boolean)
                        .join(' ')}
                    />
                  </span>
                  {view === 'refundOne' ? 1 : 2} of 2
                </span>
              )}
            </div>
          )}

          {isTable && (
            <div ref={tableRef} className="relative flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium">Orders to refund</p>
              <div className="overflow-hidden rounded-lg border border-gray-200 text-[11px]">
                <div className="flex items-center justify-between border-b border-gray-200 px-2.5 py-1.5">
                  <span className="w-24 rounded border border-gray-300 px-1.5 py-0.5 text-gray-400">Filter</span>
                  <span className="text-gray-500">1–4 of 4</span>
                </div>
                <div className="grid grid-cols-[1.5rem_1fr_1fr_1.4fr] bg-gray-50 px-2.5 py-1.5 text-gray-500">
                  <span />
                  <span>Number</span>
                  <span>Total</span>
                  <span>Placed at</span>
                </div>
                {orders.map((order, index) => {
                  return (
                    <div key={order.number} className="grid grid-cols-[1.5rem_1fr_1fr_1.4fr] items-center border-t border-gray-100 px-2.5 py-1.5">
                      <span
                        ref={index === 0 ? firstRowRef : index === 2 ? thirdRowRef : undefined}
                        className={[
                          'flex h-3 w-3 items-center justify-center rounded-[3px] border text-[8px] text-white',
                          picked[index] && 'border-gray-900 bg-gray-900',
                          !picked[index] && 'border-gray-300',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {picked[index] && '✓'}
                      </span>
                      <span className="font-mono">{order.number}</span>
                      <span>{order.total}</span>
                      <span>{order.placedAt}</span>
                    </div>
                  );
                })}
              </div>
              <span ref={continueRef} className="self-start rounded-md bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white">
                Continue
              </span>
              {tableTarget && <GlideCursor containerRef={tableRef} targetRef={tableTarget.ref} clickKey={view} delay={tableTarget.delay} />}
            </div>
          )}

          {view === 'done' && (
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <span className="flex items-center gap-2 text-xs font-medium text-done">
                <CircleCheckIcon />
                Completed
              </span>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[11px]">
                <dt className="text-gray-500">refunded</dt>
                <dd className="font-mono">2</dd>
              </dl>
              <span className="self-start rounded-md border border-gray-200 px-3 py-1.5 text-[11px] font-medium">Run again</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
