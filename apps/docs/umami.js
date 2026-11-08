// Umami page views for docs.awaitio.com. Mintlify loads every .js file in the docs on every page, so this injects the tag.
// data-domains keeps `mint dev` on localhost out of the stats; client-side navigation is tracked by Umami's history hook.
if (!document.querySelector('script[src="https://analytics.orukami.cz/script.js"]')) {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://analytics.orukami.cz/script.js';
  script.setAttribute('data-website-id', 'da4c0904-6a38-486c-8651-4310f6a82534');
  script.setAttribute('data-domains', 'docs.awaitio.com');
  document.head.appendChild(script);
}
