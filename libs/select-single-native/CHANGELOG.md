# @awaitio/select-single-native

## 1.1.0

### Minor Changes

- Every package moves to 1.1.0 with awaitio: from now on major and minor follow awaitio, and each package raises the last number for its own changes.

### Patch Changes

- 2b000c9: io.select.single is a searchable react-select drop-down with a new `clearable` option that shows a × to empty it, while io.select.singleNative keeps the browser's own `<select>` through the new `NativeSelect` theme block (a theme drawn without the default one has to add it); component and theme scripts get ReactDOM from the host instead of bundling it.
