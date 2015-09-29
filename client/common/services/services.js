'use strict';

/*
 * General utility module for the application
 */
angular.module('app.servicesModule', [])

 /*
 * The utility service
 *
 */
 .factory('utilityService', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        var showHealthInformationMenu = false;
        return {
            /**
             * Returns the current year.
             *
             * @returns {int} - the current year.
             */
            getYear : function(){
                return (new Date()).getFullYear();
            },

            /**
             * Redirects to the set path.
             * @param path - the path to redirect to.
             */
            redirectTo : function(path){
                $location.path(path);
            },
            /**
             * Determines if is undefined or null.
             *
             * @param value - the value to determine if null or undefined.
             * @returns {*|boolean} - true if value is null or undefined.
             */
            isUnDefinedOrNull: function(value){
                return  (angular.isUndefined(value) || value === null );
            },
            /**
             * Determines if is defined and not null.
             *
             * @param value - the value to determine if it is defined and not null.
             * @returns {*|boolean} - true if value is not null and defined.
             */
            isDefinedAndNotNull: function(value){
                return  (angular.isDefined(value) && value !== null );
            },
            /**
             * Setter function for the global variable showHealthInformationMenu
             * which show or hide the Health Information menu.
             *
             * @param show - boolean variable to hide/show the Health Information menu.
             */
            setShowHealthInformationMenu: function(show){
                showHealthInformationMenu = show;
            },
            /**
             * Getter function for the global variable showHealthInformationMenu
             * which show or hide the Health Information menu.
             *
             * @returns {boolean} - variable to hide/show the Health Information menu.
             */
            getShowHealthInformationMenu: function(){
                return showHealthInformationMenu;
            },

            /**
             * Scroll to a position on the page
             *
             * @param {String} position - where to scroll to.
             */
            scrollTo : function(position){
                $location.hash(position);
                $anchorScroll();
            }
        };
 }]);
