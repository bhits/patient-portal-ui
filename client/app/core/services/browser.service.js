/**
 * Created by Shruti.Rao on 8/25/2016.
 */

(function () {
    'use strict';
    angular
        .module('app.core')
            .service('browser', ['$window', function($window) {
                var service = {};
                service.detectBrowser = detectBrowser;
                service.isChrome = isChrome;
                service.isSafari = isSafari;
                service.isFireFox = isFireFox;
                service.isIE = isIE;

                return service;

                function detectBrowser() {

                    var userAgent = $window.navigator.userAgent;
                    var browsers = {
                        chrome: /chrome/i,
                        safari: /safari/i,
                        firefox: /firefox/i,
                        ie: /internet explorer/i
                    };
        
                    for(var key in browsers) {
                        if (browsers[key].test(userAgent)) {
                            return key;
                        }
                    }
                    return 'unknown';
                }

                function isChrome(){
                    if(detectBrowser() === 'chrome'){
                       return true;
                    } else {
                        return false;
                    }
                }

                function isFireFox(){
                    if(detectBrowser() === 'firefox'){
                        return true;
                    } else{
                        return false;
                    }
                }

                function isIE(){
                    if(detectBrowser() === 'ie' ||
                        navigator.appVersion.toString().indexOf('.NET') > 0){
                        return true;
                    } else{
                        return false;
                    }
                }

                function isSafari(){
                    if(detectBrowser() === 'safari'){
                        return true;
                    } else{
                        return false;
                    }
                }


    }]);
})();
