(function () {

    'use strict';

    angular
        .module('app.security')
        .constant('oauthConfig', {
            loginPath: '/fe/login',
            loginSuccessPath: '/fe/index/home'
        });
})();