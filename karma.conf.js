// Karma configuration
// Generated on Sat Jul 04 2015 22:26:29 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/angular/angular.js',

        'bower_components/jquery/dist/jquery.js',   

        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-animate/angular-animate.js',

        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',

        'bower_components/rangy/rangy-core.js',
        'bower_components/rangy/rangy-selectionsaverestore.js',
        'bower_components/textAngular/dist/textAngular-sanitize.js',
        'bower_components/textAngular/dist/textAngular.js',
        'bower_components/textAngular/dist/textAngularSetup.js',

        'bower_components/angularjs-toaster/toaster.js',
        'bower_components/angular-resource/angular-resource.js',

        'bower_components/nya-bootstrap-select/dist/js/nya-bs-select.js',

        'bower_components/api-check/dist/api-check.js',
        'bower_components/angular-formly/dist/formly.js',
        'bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',

        'bower_components/lodash/lodash.js',
         
        'public/clientMVC/main/**/clientMVC.min.js',
        'test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


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
  })
}
