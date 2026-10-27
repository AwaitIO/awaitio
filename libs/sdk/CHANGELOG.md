# awaitio

## 1.2.0

### Minor Changes

- e0af1b8: io.select.table with several rows gets a … menu next to the pager with Select all and Clear all for the rows that match the filter, offering only what would change something; RowMenu items can now run an onClick instead of linking to an href.

### Patch Changes

- 5b242a8: Long values without spaces, such as a login link with a token, wrap inside their card and table instead of running out of it or scrolling sideways.

## 1.1.0

### Minor Changes

- 2b000c9: io.select.single is a searchable react-select drop-down with a new `clearable` option that shows a × to empty it, while io.select.singleNative keeps the browser's own `<select>` through the new `NativeSelect` theme block (a theme drawn without the default one has to add it); component and theme scripts get ReactDOM from the host instead of bundling it.
- Every package moves to 1.1.0 with awaitio: from now on major and minor follow awaitio, and each package raises the last number for its own changes.

### Patch Changes

- 6ede4cf: License: users are the most people with access at the same time in a month, clients are counted one by one even when hosted, a SaaS counts all its customers, any organization other than a non-profit or school pays past 3 users, and a new Examples section answers common cases.
- 9c55aa6: License: a team that cannot afford the license right now can ask for an exception or individual terms at license@awaitio.com.

## 1.0.0

### Major Changes

- First stable release: AwaitIO runs in production, and the API now follows semver, so breaking changes come only in a new major version.

### Patch Changes

- 17c72b1: Show the log out button in the header as a plain icon without a border, so it does not stand out next to the user's name.
- 110d089: Show the app name in the header and on the login page larger.
- f1a2441: License: users are counted across a group of companies, the 3-user limit applies to individuals too, a 30-day evaluation with any number of users, $250 a month for 11–50 users with standard support and an Enterprise agreement above 50, whoever runs an app pays (an agency may buy the license for its client), components and plugins may be sold, a written answer or license confirmation on request, and Czech law.
- f671629: License: invoices, Enterprise agreements, license questions and confirmations go to license@awaitio.com.
- 7a98ee2: Add the maxFailedLogins option: the number of failed logins per email before it is locked, or false to turn the lock off.
