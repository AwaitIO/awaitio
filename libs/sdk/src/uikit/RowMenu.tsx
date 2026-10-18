import { useEffect, useRef, useState, type FC } from 'react';
import { Link } from './Link';

export type RowMenuItem = {
  label: string;
  href: string;
};

export type RowMenuProps = {
  items: RowMenuItem[];
};

type MenuPosition = {
  top: number;
  right: number;
};

// The "…" button at the end of a table row with links for that row. The list is fixed to the window, so the table's
// sideways scroll box cannot cut it off at the last rows; it closes on a click outside, Escape or scrolling.
export const RowMenu: FC<RowMenuProps> = ({ items }) => {
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!position) {
      return undefined;
    }

    const close = (event: Event) => {
      const isInside = event.type === 'mousedown' && root.current?.contains(event.target as Node);
      const isOtherKey = event instanceof KeyboardEvent && event.key !== 'Escape';

      if (!isInside && !isOtherKey) {
        setPosition(null);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);

    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [position]);

  return (
    <div ref={root} className="flex justify-end">
      <button
        type="button"
        aria-label="Row actions"
        aria-expanded={position !== null}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPosition(position ? null : { top: rect.bottom + 4, right: window.innerWidth - rect.right });
        }}
        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-current">
          <circle cx="4.5" cy="10" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="15.5" cy="10" r="1.5" />
        </svg>
      </button>
      {position && (
        <div style={{ top: position.top, right: position.right }} className="fixed z-20 flex min-w-40 flex-col rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {items.map((item) => {
            return (
              <Link key={item.label} href={item.href} className="px-3 py-2 text-sm whitespace-nowrap text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
