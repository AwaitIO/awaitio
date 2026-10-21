'use client';

import { useEffect, useState, type FC } from 'react';

export type BrandTabsProps = {
  sections: { id: string; label: string }[];
};

// Section links as tabs with an underline, the one in view marked as active.
export const BrandTabs: FC<BrandTabsProps> = ({ sections }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => {
          return entry.isIntersecting;
        });

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return (
    <nav className="sticky top-[57px] z-20 -mx-4 mt-8 overflow-x-auto border-b border-gray-200 bg-white/90 px-4 backdrop-blur">
      <ul className="flex gap-6">
        {sections.map((section) => {
          const isActive = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  '-mb-px block border-b-2 py-3 text-sm whitespace-nowrap',
                  isActive && 'border-orange-500 font-medium text-gray-900',
                  !isActive && 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
