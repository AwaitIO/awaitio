import { LegalPage } from '../../components/LegalPage';
import { constants } from '../../constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy – AwaitIO',
};

// Draft, to be reviewed by a lawyer before launch.
const PrivacyPage = () => {
  return (
    <LegalPage title="Privacy policy">
      <p>
        This policy explains what personal data awaitio.com and AwaitIO handle. The controller is Orukami s.r.o., Rybná 716/24, 110 00 Praha 1, Czech Republic, company ID 64049159, contact{' '}
        <a href={`mailto:${constants.CONTACT_EMAIL}`}>{constants.CONTACT_EMAIL}</a>.
      </p>
      <h2>This website</h2>
      <ul>
        <li>The site sets no cookies and uses no analytics or tracking scripts.</li>
        <li>Like any website, the hosting provider may keep standard server logs (such as IP address and time of a request) for security and operation.</li>
      </ul>
      <h2>License requests</h2>
      <p>
        The license request form does not send anything itself: it opens your own email app with the request filled in. If you send that email, we receive your name, email address, company and what
        you wrote. We use it only to reply, to issue the license and the invoice, and keep it as long as accounting law requires.
      </p>
      <h2>The AwaitIO software</h2>
      <p>
        AwaitIO runs on your own servers. It sends nothing to us: there is no telemetry, no license check and no hosted service. The users, passwords, inputs and results in your AwaitIO apps stay with
        you, and you are responsible for them under your own privacy obligations.
      </p>
      <h2>Your rights</h2>
      <p>You can ask what data about you we hold, have it corrected or deleted, or object to its use by writing to the contact above. You may also complain to your data protection authority.</p>
    </LegalPage>
  );
};

// eslint-disable-next-line import/no-default-export
export default PrivacyPage;
