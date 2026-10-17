import { match, P } from 'ts-pattern';
import { EnvironmentBadge } from './EnvironmentBadge';
import { EnvironmentSwitcher } from './EnvironmentSwitcher';
import { NavLink } from './NavLink';
import type { AppInfo } from '../../shared/types/AppInfo';
import type { FC } from 'react';

export type AppTitleProps = {
  info: AppInfo;
  // Where the name links to; the login page shows it as plain text.
  homeHref?: string;
};

// The project's name with the current environment. A logged-in user gets the environment list, so the badge becomes
// a switcher.
export const AppTitle: FC<AppTitleProps> = ({ info, homeHref }) => {
  return (
    <div className="flex items-center gap-2">
      {match(homeHref)
        .with(P.string, (href) => {
          return (
            <NavLink href={href} className="font-semibold text-gray-900 hover:text-gray-600">
              {info.name}
            </NavLink>
          );
        })
        .otherwise(() => {
          return <span className="font-semibold text-gray-900">{info.name}</span>;
        })}
      {match(info)
        .with({ environments: [P._, ...P.array()] }, ({ environment, environments }) => {
          return <EnvironmentSwitcher environment={environment} environments={environments} />;
        })
        .with({ environment: P.nonNullable }, ({ environment }) => {
          return (
            <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700" style={{ borderColor: environment.color }}>
              <EnvironmentBadge environment={environment} />
            </span>
          );
        })
        .otherwise(() => {
          return null;
        })}
    </div>
  );
};
