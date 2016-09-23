/**
 * Created by Jiahao.Li on 3/24/2016.
 */

(function () {
    'use strict';

    angular.module('app.core')
        .constant("coreConstants",
            {
                PASSWORD_REGEX: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$% !"&'()*+,-./:;<=>?\\\[\]^_`{|}~]).{8,20})$/,
                EMAIL_REGEXP: /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
                alphanumericConstant: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            });
})();