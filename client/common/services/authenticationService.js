(function(){

    'use strict';
    /**
     *
     * @param $q
     * @param localStorageService
     * @param $resource
     * @param base64
     * @param jwtHelper
     * @param utilityService
     * @param ENVService
     * @param $http
     * @returns {{login: Function, logOut: Function, fillAuthData: Function, authentication: {isAuth: boolean, userName: string}, clearCache: Function, revokeToken: Function}}
     * @constructor
     */
    function AuthenticationService($q, localStorageService, $resource, base64, jwtHelper, utilityService, ENVService, $http){
        //The identity server URL
        var serviceBase = ENVService.stsBaseUri;
        var loginUrl = serviceBase + "/get/";

        //The URL to clear the cache
        var clearCacheUrl = ENVService.apiBaseUrl + "/user/clearcacheforuser";
        // Clear cache resource
        var clearCacheResource = $resource(clearCacheUrl);

        // Revoke token URL
        var revokeUrl = serviceBase + "/revoke/";
        // Revoke token Resource
        var revokeTokenResource = $resource(revokeUrl);

        var authentication = { isAuth: false, userName : ""};

        /**
         * Delete all the data stored in the local storage
         * @private
         */
        var _logout = function () {
            localStorageService.remove('session');
            localStorageService.remove('activity');
            authentication.isAuth = false;
            authentication.userName = "";
        };

        // The success callback
        var successCb = function(data){
            console.log("AuthenticationService: Success in processing request");

        };

        // The error callback.
        var errorCb = function(data){
            console.log("AuthenticationService: Error in processing request");
        };

        /*
         *   Creates the login Resource Object.
         *
         *   @params {object} loginData - The login object, contains username and password.
         *
         *   @return {object} The login Resource object.
         */
        var createLoginResource = function(loginData){

            if(utilityService.isDefinedAndNotNull(loginData.userName) && utilityService.isDefinedAndNotNull(loginData.password) ){
                return $resource(loginUrl,{},
                    {   get: {
                        method: 'GET',
                        params: {},
                        headers: { Authorization: 'Basic ' + base64.encode(loginData.userName + ":" + loginData.password), 'Content-Type': 'application/json; charset=utf-8' }
                    }
                    }
                );
            }else{
                console.log("Error in creating login resource.");
                return;
            }
        };


        return {
            /*
             * Login the user in the application.
             *
             * @params {object} loginData - The login data, contains username and password.
             *
             */
            login :  function (loginData) {
                var deferred = $q.defer();

                var loginResource = createLoginResource(loginData);

                loginResource.get({},
                    function (response) {
                        var token = response.Json;
                        if(utilityService.isUnDefinedOrNull(token) || utilityService.isUnDefinedOrNull(token.access_token)){
                            console.log("Error in getting token");
                            //Clear local storage.
                            _logout();
                        }else if(utilityService.isDefinedAndNotNull(token) && utilityService.isDefinedAndNotNull(token.access_token)){
                            localStorageService.set('session', { token: token.access_token, refreshToken: token.refresh_token, userName: loginData.userName});
                            authentication.isAuth = true;
                            authentication.userName = loginData.userName;
                        }
                        deferred.resolve(response);
                    },
                    function (err, status) {
                        _logout();
                        deferred.reject(err);
                    }
                );
                return deferred.promise;
            },

            /*
             * Logs out the login user.
             */
            logOut: function(){
                this.revokeToken(
                    function(response){successCb(response);},
                    function(error){errorCb(error);}
                );
                this.clearCache(
                    function(response){successCb(response);},
                    function(error){errorCb(error);}
                );
                _logout();
            },
            /**
             *  Reset the user data from the local storage
             */
            fillAuthData: function () {
                var authData = localStorageService.get('session');
                if (authData) {
                    this.authentication.isAuth = true;
                    this.authentication.userName = authData.userName;
                }
            },

            authentication: authentication,

            /*
             * Clear the cache.
             */
            clearCache: function(sucessCB, errorCB){
                var authData = localStorageService.get('session');
                var data = {RefreshToken: authData.refreshToken, Emrn:'2323'};
                clearCacheResource.save(data, sucessCB,errorCB);

            },

            /*
             * Revoke the token.
             */
            revokeToken: function(successCB, errorCB){
                var authData = localStorageService.get('session');
                var data ={RefreshToken: authData.refreshToken};
                revokeTokenResource.save(data, successCB, errorCB);
            }
        };
    }

    angular.module('app.authenticationModule',
        [
          'ngResource',
          'ab-base64',
          'LocalStorageModule',
          'angular-jwt',
          'app.servicesModule',
          'app.config'
        ])
        .factory('AuthenticationService',AuthenticationService);

})();