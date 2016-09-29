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
        var brandInitials = "";

        var service = {};
        service.setBrandName = setBrandName;
        service.setBrandInitial= setBrandInitial;
        service.$get = getBrand;

        return service;

        function setBrandName(name){
            brandName = name;
        }

        function setBrandInitial(initials){
            brandInitials = initials;
        }

        function getBrand(){

            return {
                getBrandName: function(){
                   return  brandName;
                },
                getBrandInitials: function(){
                    return  brandInitials;
                }
            };
        }
    }
})();
