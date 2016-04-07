Package.describe({
	name: 'freelancecourtyard:codenames',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: '',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.3');
	api.use([
		'ecmascript',
		'mongo',
		'aldeed:simple-schema'
	]);
	api.use(['templating'], 'client');
	api.addFiles([
		// css styles & html
		'templates/codenames.html',
	], 'client');
	api.addFiles([
		'words.js',
		'lib/collections/codenames.js',
	]);
	Npm.require('lodash');
	// there can only be 1 mainModule for each architecture
	// export only works for mainModule
	api.mainModule('codenames-client.js', 'client');
	api.mainModule('codenames-server.js', 'server');
	/*// NOTE: will get latest on each build, need to be changed
	Npm.depends({
		lodash: "4.8.1",
		async: "git+https://github.com/lodash/lodash.git#master"
	});*/
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('freelancecourtyard:codenames');
	api.mainModule('codenames-tests.js');
});
