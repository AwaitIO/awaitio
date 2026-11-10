---
'awaitio': minor
---

`ctx.redirect()` can open a folder's page: `app.definePage()` takes a `params` schema like an action, which parses and types the page's `ctx.params` and refuses a link that does not fit, and `page.route()` builds the link with the params typed by it.
