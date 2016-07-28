/**
 * Created by jiahao.li on 3/30/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.core')
        .directive('c2sOutsideClick', c2sOutsideClick);

    /* @ngInject */
    function c2sOutsideClick($document) {

        var directive = {
            link: linkFunc
        };
        return directive;

        /* @ngInject */
        function linkFunc(scope, element, attributes) {
            var scopeExpression = attributes.c2sOutsideClick,
                onDocumentClick = function (event) {
                    var parent = event.target;

                    while (parent && parent !== element[0]) {
                        parent = parent.parentNode;
                    }

                    if (!parent) {
                        scope.$apply(scopeExpression);
                    }
                };

            $document.on("click", onDocumentClick);

            element.on('$destroy', function () {
                $document.off("click", onDocumentClick);
            });
        }
    }
})();