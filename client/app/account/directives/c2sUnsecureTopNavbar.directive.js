(function () {
    'use strict';

    angular
        .module('app.account')
        .directive('c2sUnsecureTopNavbar', topNavbar);

    function topNavbar() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/account/directives/topNavbar.html',
            scope: {},
            bindToController: {
                title: "="
            },
            controller: TopNavbarController,
            controllerAs: 'topNavbarVm'
        };

        return directive;
    }

    /* @ngInject */
    function TopNavbarController($translate) {
        var vm = this;
        vm.changeLanguage = changeLanguage;

        if (window.localStorage.lang === null) {
            window.localStorage.lang = navigator.language;
        }
        $translate.use(window.localStorage.lang);
        function changeLanguage(language) {
            if (language === null) {
                language = navigator.language;
            }
            window.localStorage.lang = language;
            $translate.use(language);
            //window.localStorage.lang = language;
        }
    }
})();