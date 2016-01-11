(function () {
    'use strict';

    angular
        .module('app.core')
            .directive('ppContentWrapper', ppContentWrapper);

            function ppContentWrapper() {
                var directive  =  {
                    restrict: 'E',
                    transclude: true,
                    scope:{},
                    bindToController: {contenttitle: '@'},
                    templateUrl: 'app/core/directives/contentWrapper.html',
                    controller: ContentWrapperController,
                    controllerAs: 'contentWrapperVm'
                };
                return directive;

                function ContentWrapperController(){
                    var vm = this;
                }
            }

})();