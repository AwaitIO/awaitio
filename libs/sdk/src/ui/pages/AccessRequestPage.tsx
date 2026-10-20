import { useState, type FC } from 'react';
import { match, P } from 'ts-pattern';
import { constants as sharedConstants } from '../../shared/constants';
import type { AppInfo } from '../../shared/types/AppInfo';
import { Button } from '../../uikit/Button';
import { Card } from '../../uikit/Card';
import { Field } from '../../uikit/Field';
import { Input } from '../../uikit/Input';
import { requestAccess } from '../api/requestAccess';
import { AppTitle } from '../components/AppTitle';
import { NavLink } from '../components/NavLink';
import { routes } from '../utils/routes';
import { toErrorMessage } from '../utils/toErrorMessage';
import { toUsersEntry } from '../utils/toUsersEntry';

export type AccessRequestPageProps = {
  info: AppInfo | null;
};

// For someone without a login: they choose their password here and get a line for `users` to send to whoever runs
// AwaitIO. The line holds only a hash, so it can go by email or chat; the password never leaves this form.
export const AccessRequestPage: FC<AccessRequestPageProps> = ({ info }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [entry, setEntry] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="w-full max-w-lg">
      <Card>
        {match(entry)
          .with(P.string, (line) => {
            return (
              <div className="flex flex-col gap-4">
                {info && <AppTitle info={info} />}
                <h1 className="text-xl font-semibold">Send this to your admin</h1>
                <pre className="overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-3 font-mono text-xs whitespace-pre-wrap break-all">{line}</pre>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      void navigator.clipboard.writeText(line).then(() => {
                        setIsCopied(true);
                      });
                    }}
                  >
                    {isCopied ? 'Copied' : 'Copy'}
                  </Button>
                  <NavLink href={routes.actionList()} className="self-center text-sm text-gray-600 hover:text-gray-900">
                    Back to log in
                  </NavLink>
                </div>
              </div>
            );
          })
          .otherwise(() => {
            return (
              <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                  event.preventDefault();

                  if (password !== passwordAgain) {
                    setErrorMessage('The passwords do not match.');

                    return;
                  }

                  setIsSubmitting(true);
                  setErrorMessage(null);
                  requestAccess({ email, name, password })
                    .then((user) => {
                      setEntry(toUsersEntry(user));
                    })
                    .catch((error) => {
                      setErrorMessage(toErrorMessage(error));
                    })
                    .finally(() => {
                      setIsSubmitting(false);
                    });
                }}
              >
                {info && <AppTitle info={info} />}
                <h1 className="text-xl font-semibold">Create an account</h1>
                <Field label="Email">
                  <Input type="email" autoComplete="username" autoFocus required value={email} onChange={setEmail} disabled={isSubmitting} />
                </Field>
                <Field label="Name">
                  <Input autoComplete="name" required value={name} onChange={setName} disabled={isSubmitting} />
                </Field>
                <Field label="Password" helpText={`At least ${sharedConstants.MIN_PASSWORD_LENGTH} characters.`}>
                  <Input type="password" autoComplete="new-password" required minLength={sharedConstants.MIN_PASSWORD_LENGTH} value={password} onChange={setPassword} disabled={isSubmitting} />
                </Field>
                <Field label="Password again" error={errorMessage}>
                  <Input type="password" autoComplete="new-password" required value={passwordAgain} onChange={setPasswordAgain} disabled={isSubmitting} />
                </Field>
                <div className="flex items-center gap-3">
                  <Button type="submit" disabled={isSubmitting}>
                    Create account
                  </Button>
                  <NavLink href={routes.actionList()} className="text-sm text-gray-600 hover:text-gray-900">
                    Back to log in
                  </NavLink>
                </div>
              </form>
            );
          })}
      </Card>
    </div>
  );
};
