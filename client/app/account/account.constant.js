/**
 * Created by jiahao.li on 3/17/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.account')
        .constant('accountConfig',
            {
                verificationPath: '/fe/account/verification',
                createPasswordPath: '/fe/account/createPassword',
                activationSuccessPath: '/fe/account/activationSuccess',
                activationErrorPath: '/fe/account/activationError'
            }
        );
})();
