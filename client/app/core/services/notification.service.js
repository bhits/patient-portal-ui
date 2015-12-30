/**
 * Created by tomson.ngassa on 10/8/2015.
 */

(function () {

    'use strict';

    angular
        .module('app.core')
            .factory('notificationService',notificationService);

            /* @ngInject */
            function notificationService(notify){

                var templateUrl = "app/core/services/notify.html";
                var duration = 2000;

                var service = {};
                service.success = success;
                service.info = info;
                service.warn = warn;
                service.error = error;

                return service;

                function success(msg){
                    notify({ message: msg, duration: duration, classes: 'alert-info', templateUrl: templateUrl});
                }

                function info(msg){
                    notify({ message: msg, duration: duration, classes: 'alert-success', templateUrl: templateUrl});
                }

                function warn (msg){
                    notify({ message: msg, duration: duration, classes: 'alert-warning', templateUrl: templateUrl});
                }
                function error (msg){
                    notify({ message: msg, duration: duration, classes: 'alert-danger', templateUrl: templateUrl});
                }
            }
})();
