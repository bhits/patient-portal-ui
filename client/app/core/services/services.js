
(function () {


    'use strict';

    angular
        .module('app.core')
            .factory('utilityService',  utilityService);

            /* @ngInject */
            function utilityService($location, $anchorScroll) {
                var showHealthInformationMenu = false;
                var service = {};

                service.getYear = getYear;
                service.redirectTo = redirectTo;
                service.isUnDefinedOrNull = isUnDefinedOrNull;
                service.isDefinedAndNotNull = isDefinedAndNotNull;
                service.setShowHealthInformationMenu = setShowHealthInformationMenu;
                service.getShowHealthInformationMenu = getShowHealthInformationMenu;
                service.scrollTo = goTo;
                service.hasString = hasString;
                service.startsWith = startsWith;
                service.endsWith = endsWith;
                service.randomAlphanumeric = randomAlphanumeric;
                service.isNotEmpty = isNotEmpty;
                service.formatZipCode = formatZipCode;
                service.formatDate = formatDate;

                return service;

                function getYear() {
                    return (new Date()).getFullYear();
                }
                function redirectTo (path) {
                    $location.path(path);
                }
                function isUnDefinedOrNull (value) {
                    return (angular.isUndefined(value) || value === null );
                }
                function isDefinedAndNotNull(value) {
                    return (angular.isDefined(value) && value !== null );
                }
                function setShowHealthInformationMenu(show) {
                    showHealthInformationMenu = show;
                }
                function getShowHealthInformationMenu() {
                    return showHealthInformationMenu;
                }
                function goTo(position) {
                    $location.hash(position);
                    $anchorScroll();
                }
                function hasString(str) {
                    return angular.isDefined(str) && angular.isString(str) && str.length > 0 ? str : undefined;
                }
                function startsWith(str, prefix) {
                    return angular.isString(str) && angular.isString(prefix) &&
                        str.substring(0, prefix.length) === prefix;
                }
                function endsWith(str, suffix) {
                    return angular.isString(str) && angular.isString(suffix) &&
                        str.substring(str.length - suffix.length, str.length) === suffix;
                }
                function randomAlphanumeric (len, charSet){
                    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var randomString = '';
                    for (var i = 0; i < len; i++) {
                        var randomPoz = Math.floor(Math.random() * charSet.length);
                        randomString += charSet.substring(randomPoz,randomPoz+1);
                    }
                    return randomString;
                }
                function isNotEmpty (arr) {
                    return angular.isDefined(arr) && angular.isArray(arr) && arr.length > 0;
                }
                function formatZipCode(zipCode) {
                    var formattedZipCode = parseInt(zipCode).toString();
                    if (formattedZipCode.toString().length > 5) {
                        formattedZipCode = formattedZipCode.slice(0, 5) + "-" + formattedZipCode.slice(5);
                    }
                    return formattedZipCode;
                }
                function formatDate (dateObj){
                    var today = new Date(dateObj);
                    var day = today.getDate();
                    var month = today.getMonth() + 1;
                    var year = today.getFullYear();
                    if (day < 10) {
                        day = "0" + day;
                    }
                    if (month < 10) {
                        month = "0" + month;
                    }
                    var formatedDate = month + "/" + day + "/" + year;

                    return formatedDate;
                }
            }
    
})();
