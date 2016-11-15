/**
 * Created by Feruz.Abdella on 3/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController(configService) {
        var vm = this;
        vm.brandName = configService.getBrandName();
    }
})();