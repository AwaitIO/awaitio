import { useEffect, useRef, useState, type FC } from 'react';
import { match, P } from 'ts-pattern';
import { EnvironmentBadge } from './EnvironmentBadge';
import type { AppEnvironment } from '../../shared/types/AppEnvironment';
import type { EnvironmentLink } from '../../shared/types/EnvironmentLink';

export type EnvironmentSwitcherProps = {
  environment: AppEnvironment | null;
  environments: EnvironmentLink[];
};

// The badge opens a list of all environments. The links lead to the action list, never to the open action: opening
// /actions/<slug> starts a run, and switching to production must not start one by accident.
export const EnvironmentSwitcher: FC<EnvironmentSwitcherProps> = ({ environment, environments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
        style={{ borderColor: environment?.color }}
      >
        {match(environment)
          .with(P.nonNullable, (current) => {
            return <EnvironmentBadge environment={current} />;
          })
          .otherwise(() => {
            return 'Environments';
          })}
        <span aria-hidden="true">▾</span>
      </button>
      {isOpen && (
        <ul role="menu" className="absolute left-0 z-10 mt-1 min-w-48 rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg">
          {environments.map((link) => {
            return (
              <li key={link.url} role="none">
                <a role="menuitem" href={link.url} aria-current={link.isCurrent ? 'true' : undefined} className="flex items-center justify-between gap-3 px-3 py-1.5 hover:bg-gray-50">
                  <EnvironmentBadge environment={link} />
                  {link.isCurrent && <span className="text-xs text-gray-400">current</span>}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
