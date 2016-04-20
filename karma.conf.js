module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      //'app/**/*.js',
      // 'app/scripts/Class.js/*.js',
      'app/scripts/Section/*.js',
      'test/**/*.js'
      // 'test/**/*_test.js'
    ],

    // list of files to exclude
    exclude: [],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/**/*.js': ['coverage']
    },

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress', 'coverage'],

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: [],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    // optionally, configure the reporter
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      // subdir: 'reports/',
      subdir: function(browser) {
        // normalization process to keep a consistent browser name accross different
        // OS
        // Would output the results into: './coverage/firefox/'
        return 'reports/' + browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        {type: 'html', dir:'coverage/'}//,
        // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        // { type: 'text', subdir: '.', file: 'text.txt' },
        // { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ]
    }
  });
};