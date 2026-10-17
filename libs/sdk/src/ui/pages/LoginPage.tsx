import { useState, type FC } from 'react';
import type { AppInfo } from '../../shared/types/AppInfo';
import type { SessionUser } from '../../shared/types/SessionUser';
import { Field } from '../../uikit/Field';
import { Input } from '../../uikit/Input';
import { logIn } from '../api/logIn';
import { AppTitle } from '../components/AppTitle';
import { Button } from '../components/Button';
import { toErrorMessage } from '../utils/toErrorMessage';

export type LoginPageProps = {
  info: AppInfo | null;
  onLoggedIn: (user: SessionUser) => void;
};

// Stays on the URL that was opened, so a shared link to an action leads there right after logging in.
export const LoginPage: FC<LoginPageProps> = ({ info, onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <form
      className="mx-auto flex max-w-sm flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);
        logIn({ email, password })
          .then(onLoggedIn)
          .catch((error) => {
            setErrorMessage(toErrorMessage(error));
            setIsSubmitting(false);
          });
      }}
    >
      {info && <AppTitle info={info} />}
      <h1 className="text-xl font-semibold">Log in</h1>
      <Field label="Email">
        <Input type="email" autoComplete="username" autoFocus required value={email} onChange={setEmail} disabled={isSubmitting} />
      </Field>
      <Field label="Password" error={errorMessage}>
        <Input type="password" autoComplete="current-password" required value={password} onChange={setPassword} disabled={isSubmitting} />
      </Field>
      <Button type="submit" disabled={isSubmitting}>
        Log in
      </Button>
    </form>
  );
};
