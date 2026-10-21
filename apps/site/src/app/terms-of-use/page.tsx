import { LegalPage } from '../../components/LegalPage';
import { constants } from '../../constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of use – AwaitIO',
};

// Draft, to be reviewed by a lawyer before launch.
const TermsPage = () => {
  return (
    <LegalPage title="Terms of use">
      <p>
        These terms cover the website awaitio.com and its documentation at docs.awaitio.com. The site and AwaitIO are run by Orukami s.r.o., Rybná 716/24, 110 00 Praha 1, Czech Republic, company ID
        64049159, VAT ID CZ64049159, registered in the Commercial Register kept by the Municipal Court in Prague, section C, file 74046 (&quot;we&quot;). Contact:{' '}
        <a href={`mailto:${constants.CONTACT_EMAIL}`}>{constants.CONTACT_EMAIL}</a>.
      </p>
      <h2>Using the software</h2>
      <p>
        AwaitIO itself is governed by the <a href={constants.LICENSE_URL}>AwaitIO License</a>, not by these terms. In short: it is free for up to 3 users, for non-profits and education, and for a
        30-day evaluation with any number of users; larger for-profit organizations need a Company License. Users are counted across a whole group of companies, and the 3-user limit applies to
        individuals too. Nobody may sell AwaitIO or a fork of it, offer it as a framework or builder for others to make internal tools, or offer a commercial hosted service built on it without a
        written agreement; your own components and plugins for it are yours to sell. The license text decides in every detail.
      </p>
      <h2>Company Licenses</h2>
      <p>
        A Company License costs 50 USD per month per organization for 4 to 10 users and 250 USD per month for 11 to 50 users; more than 50 users need an Enterprise agreement. It is paid as a monthly
        sponsorship with the Company License tier for your number of users on <a href={constants.SPONSORS_URL}>GitHub Sponsors</a> and is valid while the sponsorship is active. We issue an invoice for
        every payment on request. A written contract, an SLA or custom terms are agreed by email as an Enterprise agreement. Prices may change; a change does not affect a month already paid. Other
        sponsorships, one-time or monthly, are gifts that support AwaitIO and do not grant a Company License.
      </p>
      <h2>The website</h2>
      <ul>
        <li>The site and the documentation are provided as they are, to help you use AwaitIO. We try to keep them correct, but we do not guarantee it.</li>
        <li>The texts, code samples and images on the site are ours. Code samples in the documentation may be copied into your own projects.</li>
        <li>Links to other sites are for convenience; we are not responsible for their content.</li>
      </ul>
      <h2>No warranty</h2>
      <p>AwaitIO and this site come without warranty of any kind. To the extent the law allows, we are not liable for damages arising from their use.</p>
      <h2>Governing law</h2>
      <p>These terms and the AwaitIO License are governed by Czech law. Disputes go to the courts in Prague, unless mandatory law lets a consumer sue in their own country.</p>
      <h2>Changes</h2>
      <p>We may change these terms. The date at the top shows the current version.</p>
    </LegalPage>
  );
};

// eslint-disable-next-line import/no-default-export
export default TermsPage;
