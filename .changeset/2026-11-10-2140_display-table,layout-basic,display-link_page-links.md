---
'@awaitio/display-table': patch
'@awaitio/layout-basic': patch
'@awaitio/display-link': patch
---

`rowMenuItems` of `io.display.table` and `menuItems` of `io.layout.basic` take a page's `page.route()` next to an action's route, and `io.display.link` takes a `route` to an action or a page instead of a `url`, labelled with the route's label; each opens it in the same tab.
