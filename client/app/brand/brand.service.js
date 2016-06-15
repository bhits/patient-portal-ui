/**
 * Created by tomson.ngassa on 10/8/2015.
 */

(function () {

    'use strict';

    angular
        .module('app.brand')
            .provider('brand',brandService);

            /* @ngInject */
            function brandService(){

                var brandName = "";
                var appName = "";
                var version = "";


                var service = {};
                service.setBrandName = setBrandName;
                service.setAppName= setAppName;
                service.setVersion = setVersion;
                service.$get = getBrand;

                return service;

                function setBrandName(name){
                    brandName = name;
                }

                function setAppName(name){
                    appName = name;
                }
                
                function setVersion(currentVersion){
                    version = currentVersion;
                }

                function getBrand(){

                    return {
                        getBrandName: function(){
                           return  brandName;
                        },
                        getAppName: function(){
                            return  appName;
                        },
                        getVersion: function(){
                            return  version;
                        }
                    };
                }
            }
})();
