/**
 * Created by Jiahao.Li on 3/24/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('mhcPopoverClose', mhcPopoverClose);

    /* @ngInject */
    function mhcPopoverClose($timeout) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };
        return directive;

        /* @ngInject */
        function linkFunc(scope, element) {
            var popoverSelectorName = "mhc-popover-selector";
            var trigger = document.getElementsByClassName(popoverSelectorName);

            element.on('click', function (event) {
                var eTarget = angular.element(event.target);

                if (notExcluded(eTarget)) {
                    for (var i = 0; i < trigger.length; i++) {
                        closeTrigger();
                    }
                }
            });

            function closeTrigger() {
                $timeout(function () {
                    if (angular.isDefined(trigger) && trigger.length > 0) {
                        angular.element(trigger[0]).remove();
                    }
                });
            }

            function notExcluded(eventTarget) {
                var parentElement = eventTarget.parent();
                var excludePopoverElement = !eventTarget.hasClass(popoverSelectorName);
                var excludeTitle = !parentElement.hasClass("popover-title");
                var excludeContent = !eventTarget.hasClass("popover-content");

                return excludePopoverElement && excludeTitle && excludeContent;
            }
        }
    }
})();