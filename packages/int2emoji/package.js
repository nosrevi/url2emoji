Package.describe({
  name: 'bwumeteor:int2emoji',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Convert a string of integer into emojis from custom defined emoji set',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.use("templating", "client");
  api.addFiles('int2emoji.js', 'client');
  api.export('Int2emoji', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('bwumeteor:int2emoji');
  api.addFiles('int2emoji-tests.js');
});
