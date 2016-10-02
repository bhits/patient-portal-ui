/**
 * Created by Feruz.Abdella on 3/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController(brand) {
        var vm = this;
        vm.brandName = brand.getBrandName();
    }
})();