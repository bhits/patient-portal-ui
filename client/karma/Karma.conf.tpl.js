module.exports = function (karma) {
    karma.set({
        /**
         * From where to look for files, starting with the location of this file.
         * After this file is compiled by grunt, it is located under <%= grunt.config('build_debug_dir')%>
         */
        basePath: '../../', // The basePath configuration here means that starting from client folder to search files

        /**
         * This is the list of file patterns to load into the browser during testing.
         */
        files: [
            'assets/js/jquery/jquery-2.1.1.min.js',
            'assets/js/plugins/jquery-ui/jquery-ui.js',
            'assets/js/bootstrap/bootstrap.min.js',
            'assets/js/plugins/metisMenu/jquery.metisMenu.js',
            'assets/js/plugins/slimscroll/jquery.slimscroll.min.js',
            'assets/js/inspinia.js',
            'assets/js/angular/angular.min.js',
            'assets/js/plugins/oclazyload/dist/ocLazyLoad.min.js',
            'assets/js/angular-translate/angular-translate.min.js',
            'assets/js/ui-router/angular-ui-router.min.js',
            'assets/js/bootstrap/ui-bootstrap-tpls-0.12.0.min.js',
            'assets/js/plugins/angular-idle/angular-idle.js',
            'assets/js/plugins/angular-notify/angular-notify.min.js',
            'assets/js/angular/angular-messages.min.js',
            <% scripts.forEach( function ( file ) { %>'<%= file %>',
                <% }); %>
            'app/**/*module*.js','app/**/*config*.js',
            'app/**/*.js'
        ],

         exclude: [
            'app/**/*.e2e.js'
        ],

        /**
        * Disable file watching by default.
        */
        autoWatch: false,

        frameworks: [ 'jasmine' ],

        /**
        * The list of browsers to launch to test on. This includes only "Firefox" by
        * default, but other browser names include:
        * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
        *
        * Note that you can also use the executable name of the browser, like "chromium"
        * or "firefox", but that these vary based on your operating system.
        *
        * You may also leave this blank and manually navigate your browser to
        * http://localhost:9018/ when you're running tests. The window/tab can be left
        * open and the tests will automatically occur there during the build. This has
        * the aesthetic advantage of not launching a browser every time you save.
        */
        browsers: ['Chrome'],

        /**
        * How to report, by default.
        * possible values: 'dots', 'progress'
        * CLI --reporters progress
        */
        reporters: ['dots', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: '<%= grunt.config('build_reports_dir') %>/unit/coverage/'
        },

        preprocessors: {
            'app/**/!(*.spec).js': ['coverage'],
            'common/**/!(*.spec).js': ['coverage'],
        },

        /**
        * On which port should the browser connect, on which port is the test runner
        * operating, and what is the URL path for the browser to use.
        */
        port: 9018,

        runnerPort: 9100,

        urlRoot: '/',

        /** enable / disable colors in the output (reporters and logs)
        * CLI --colors --no-colors
        */
        colors: true,

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 20000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: true,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-phantomjs-launcher',
            'karma-script-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-coverage'
        ],

        // you can define custom flags
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                    options: {
                    windowName: 'my-window',
                        settings: {
                        webSecurityEnabled: false
                    },
                },
                flags: ['--load-images=true'],
                    debug: true
            }
         },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }

    });
};