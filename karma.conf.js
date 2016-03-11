// Karma configuration
// Generated on Sat Jul 04 2015 22:26:29 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: ['jspm','jasmine'],

    files: [
        'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
        'node_modules/jasmine-async-sugar/jasmine-async-sugar.js'
    ],

    jspm: {
        config: 'config.js',
        loadFiles: [
          'src/app/stepway/edaStepWayEasyFormGen.main.js',
          'src/app/dragdropway/edaDragDropWay.main.js',
          'src/app/formviewer/eda.easyFormViewer.main.js',
          'src/app/**/*.spec.js'
        ],
        serveFiles: [
          'src/app/**/*.+(js|html|css|json)'
        ] // *.{a,b,c} to *.+(a|b|c) https://github.com/karma-runner/karma/issues/1532
    },


    // list of files to exclude
    exclude: [],

    proxies: {
        '/src/app/': '/base/src/app/',
        '/jspm_packages/': '/base/jspm_packages/'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // 'Chrome' || 'PhantomJS'
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
