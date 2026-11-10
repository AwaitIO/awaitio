// The sitemap script imports pages for their LAST_MODIFIED_AT, and pages import CSS modules that Node cannot read: they load as an empty object.
require.extensions['.css'] = (module) => {
  module.exports = {};
};
