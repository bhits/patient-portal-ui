/**
 * Created by Jiahao.Li on 3/24/2016.
 */

(function () {

    'use strict';

    angular.module('app.core')
        .constant("coreConstants",
            {
                PASSWORD_REGEX: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})$/
            });
})();