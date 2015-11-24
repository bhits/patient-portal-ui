(function () {

    'use strict';

    /*
     * The utility service
     *
     */
    function UtilityService($location, $anchorScroll) {
        var showHealthInformationMenu = false;
        return {

            /**
             * Returns the current year.
             *
             * @returns {int} - the current year.
             */
            getYear: function () {
                return (new Date()).getFullYear();
            },

            /**
             * Redirects to the set path.
             * @param path - the path to redirect to.
             */
            redirectTo: function (path) {
                $location.path(path);
            },
            /**
             * Determines if is undefined or null.
             *
             * @param value - the value to determine if null or undefined.
             * @returns {*|boolean} - true if value is null or undefined.
             */
            isUnDefinedOrNull: function (value) {
                return (angular.isUndefined(value) || value === null );
            },
            /**
             * Determines if is defined and not null.
             *
             * @param value - the value to determine if it is defined and not null.
             * @returns {*|boolean} - true if value is not null and defined.
             */
            isDefinedAndNotNull: function (value) {
                return (angular.isDefined(value) && value !== null );
            },
            /**
             * Setter function for the global variable showHealthInformationMenu
             * which show or hide the Health Information menu.
             *
             * @param show - boolean variable to hide/show the Health Information menu.
             */
            setShowHealthInformationMenu: function (show) {
                showHealthInformationMenu = show;
            },
            /**
             * Getter function for the global variable showHealthInformationMenu
             * which show or hide the Health Information menu.
             *
             * @returns {boolean} - variable to hide/show the Health Information menu.
             */
            getShowHealthInformationMenu: function () {
                return showHealthInformationMenu;
            },

            /**
             * Scroll to a position on the page
             *
             * @param {String} position - where to scroll to.
             */
            scrollTo: function (position) {
                $location.hash(position);
                $anchorScroll();
            },

            /**
             * If str has string, returns str. Otherwise, returns undefined.
             * @param str
             * @returns {*} str or undefined
             */
            hasString: function (str) {
                return angular.isDefined(str) && angular.isString(str) && str.length > 0 ? str : undefined;
            },

            startsWith: function (str, prefix) {
                return angular.isString(str) && angular.isString(prefix) &&
                    str.substring(0, prefix.length) === prefix;
            },

            endsWith: function (str, suffix) {
                return angular.isString(str) && angular.isString(suffix) &&
                    str.substring(str.length - suffix.length, str.length) === suffix;
            },

            randomAlphanumeric: function(len, charSet){
                charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var randomString = '';
                for (var i = 0; i < len; i++) {
                    var randomPoz = Math.floor(Math.random() * charSet.length);
                    randomString += charSet.substring(randomPoz,randomPoz+1);
                }
                return randomString;
            },

            /**
             * Checks if the given argument is array and has at least one element
             * @param arr
             * @returns {*|boolean}
             */
            isNotEmpty: function (arr) {
                return angular.isDefined(arr) && angular.isArray(arr) && arr.length > 0;
            },

            /**
             * Formats the given zipCode integer value to 12345 or 12345-6789
             * @param zipCode
             * @returns {string} formatted zip code
             */
            formatZipCode: function (zipCode) {
                var formattedZipCode = parseInt(zipCode).toString();
                if (formattedZipCode.toString().length > 5) {
                    formattedZipCode = formattedZipCode.slice(0, 5) + "-" + formattedZipCode.slice(5);
                }
                return formattedZipCode;
            }
        };
    }

    /*
     * General utility module for the application
     */
    angular.module('app.servicesModule', [])
        .factory('utilityService', UtilityService);
})();
