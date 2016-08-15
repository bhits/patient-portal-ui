(function () {

    'use strict';

    angular
        .module('app.security')
        .constant('oauthConfig', {
            loginPath: '/fe/login',
            loginSuccessPath: '/fe/index/home',
            accessScope: "ppUI.access",
            accountLockedErrorMessage: "Your account has been locked because of too many failed attempts to login."
        });
})();