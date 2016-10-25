(function () {
    'use strict';

    angular
        .module('app.core')
        .directive("c2sFileModel", c2sFileModel);

    /* @ngInject */
    function c2sFileModel($parse) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        /* @ngInject */
        function linkFunc(scope, element, attrs) {
            var model = $parse(attrs.c2sFileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
})();