---
'awaitio': minor
'@awaitio/select-single': minor
'@awaitio/select-single-native': patch
'@awaitio/theme-default': minor
---

io.select.single is a searchable react-select drop-down with a new `clearable` option that shows a × to empty it, while io.select.singleNative keeps the browser's own `<select>` through the new `NativeSelect` theme block (a theme drawn without the default one has to add it); component and theme scripts get ReactDOM from the host instead of bundling it.
