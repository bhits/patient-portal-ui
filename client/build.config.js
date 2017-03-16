/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_debug_dir` folder is where our projects are build during
     * development (build task for debug target) and the `build_dist_dir` folder is where our app resides once it's
     * completely built (build task for dist target).
     */
    build_dir: 'target/',
    build_debug_dir: '<%=build_dir%>' + 'debug',
    build_dist_dir: '<%=build_dir%>' + 'dist',
    build_reports_dir: '<%=build_dir%>' + '.reports',
    build_war_dir: '<%=build_dir%>',
    config_dir: 'app/config',
    configInitialization_dir: 'configInitialization',

    /**
     * The `karma_conf_file` file name is where karma testing configuration resides.
     */
    karma_conf_file: 'karma.conf.js',

    /**
     * This is a collection of file patterns that refer to our app code.
     * These file paths are used in the configuration of build tasks:
     *  - `js` is all project javascript, less tests,
     *  - `jsunit` is all project javascript unit test files,
     *  - `html` is just our main HTML file,
     *  - `less` is our main stylesheet, and
     *  - `unit` contains our app's unit tests.
     *  - `debug_js` contains all the generated JS in the target\debug folder.
     */
    app_files: {
        js: ['app/**/*.js', '!app/**/*.spec.js', '!app/**/*.e2e.js'],
        js_generated: ['app_ts/**/*.js'],
        jsmap_generated: ['app_ts/**/*'],
        jsunit: ['app/**/*.spec.js'],
        e2e: ['app/**/*.e2e.js'],

        atpl: ['app/**/*.html'],
        i18nLib: ['app/languagesLib/*.json'],
        html: ['index.html'],
        less: 'less/main.less',
        debug_js: [
            'target/debug/**/*.js',
            '!target/debug/**/karma.conf.js',
            '!target/debug/node_modules/**/*.js',
            '!target/debug/assets/**/*.js',
            '!target/debug/configInitialization/**/*.js',
            '!target/debug/app_ts/**/*.js',
            '!target/debug/resources/**/*.js'
        ]
    },

    /**
     * This is a collection of file patterns that used for loading configuration for initializing Angular application
     * The order of the files: These files will be put in the html files as the order in the array
     */
    configInitialization_files: {
        js: ['configInitialization/**/*.js']
    },

    /**
     * Configuration for System.js
     */
    system_resources: {
        js: ['resources/**/*.js']
    },

    /**
     * This is a collection of files used during testing only.
     * The order of the files: These files will be put in the html files as the order in the array
     */
    test_files: {
        js: [
            'node_modules/angular-mocks/angular-mocks.js'
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     *
     * The order of the files: These files will be put in the html files as the order in the array
     */
    vendor_files: {
        js: [
            'node_modules/angular/angular.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-loading-bar/build/loading-bar.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/ngstorage/ngStorage.js',
            'node_modules/checklist-model/checklist-model.js',
            'node_modules/angular-jwt/dist/angular-jwt.js',
            'node_modules/core-js/client/shim.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js',
			'node_modules/x2js/xml2json.js',
			'node_modules/angular-translate/dist/angular-translate.js',
            'node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'node_modules/angular-i18n/angular-locale_en.js',
            'node_modules/angular-i18n/angular-locale_es.js',
            'node_modules/angular-i18n/angular-locale_zh.js',
            'node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.min.js',
            'node_modules/bootstrap-filestyle/src/bootstrap-filestyle.js'
        ],
        css: [
            'node_modules/angular-loading-bar/build/loading-bar.css'
        ],
        assets: [],
        angular2_lib: ['node_modules/@angular/**/*.js', 'node_modules/rxjs/**/*.js']
    }
};