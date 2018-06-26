var fs = require('fs');

module.exports = function (config) {

	// Use ENV vars on Travis and sauce.json locally to get credentials
	if (!process.env.SAUCE_USERNAME) {
		if (!fs.existsSync('credentials.json')) {
			console.log('Create a credentials.json with your credentials.');
			process.exit(1);
		} else {
			process.env.SAUCE_USERNAME = require('./sauce').username;
			process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
		}
	}

	// Browsers to run on Sauce Labs
	var customLaunchers = {
		'SL_Chrome': {
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'Windows 10',
			version: "latest"
		},
		'SL_Firefox': {
			base: 'SauceLabs',
			browserName: 'firefox',
			platform: 'Windows 10',
			version: "latest"
		},
		'SL_Safari': {
			base: 'SauceLabs',
			browserName: 'safari',
			platform: 'OS X 10.11',
			version: "latest"
		},
		'SL_IE_11': {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows 8.1',
			version: '11'
		}
	};

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			'src/*/*/*.js',
			'tests/*/*.js'
		],


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// web server port
		port: 9876,

		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_DEBUG,

		sauceLabs: {
			testName: 'Web App Unit Tests',
			tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
			username: process.env.SAUCE_USERNAME,
			accessKey: process.env.SAUCE_ACCESS_KEY,
			startConnect: false,
			connectOptions: {
				port: 5757,
				logfile: 'sauce_connect.log'
			}
		},

		captureTimeout: 120000,
		customLaunchers: customLaunchers,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: Object.keys(customLaunchers),
		singleRun: true
	});
};
