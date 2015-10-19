/**
 * Created by tomson.ngassa on 10/8/2015.
 */
(function () {

    'use strict';

    /**
     * The notify functionion
     *
     * @param notify - The Angular-notify service
     * @returns {{success: Function, error: Function}} - The success and error toast messages.
     *
     * @constructor
     */
    function NotificationService(notify){

        var templateUrl = "common/tmpl/notify.tpl.html";
        var duration = 3000;

        return {
            success: function(msg){
                notify({ message: msg, duration: duration, classes: 'alert-info', templateUrl: templateUrl});
            },
            info: function(msg){
                notify({ message: msg, duration: duration, classes: 'alert-success', templateUrl: templateUrl});
            },
            warn: function(msg){
                notify({ message: msg, duration: duration, classes: 'alert-warning', templateUrl: templateUrl});
            },
            error: function(msg){
                notify({ message: msg, duration: duration, classes: 'alert-danger', templateUrl: templateUrl});
            }
        };
    }
    /*
     * The notfication service
     */
    angular.module('app.notificationModule', ['cgNotify'])
        .factory('notificationService',NotificationService);
})();
