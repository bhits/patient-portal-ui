(function () {

    'use strict';

    angular
        .module('app.security')
        .constant('oauthConfig', {
            loginPath: '/fe/login',
            loginSuccessPath: '/fe/index/home',
            accessScope: "ppUI.access",
            /**
             * The message that is from uaa is used for distinguishing between account locked and authentication error
             * Note: This value need to be updated if uaa changes the error message
             */
            accountLockedErrorMessage: "Your account has been locked because of too many failed attempts to login."
        });
})();