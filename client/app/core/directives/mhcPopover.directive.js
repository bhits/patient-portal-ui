/**
 * Created by Jiahao.Li on 3/24/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.core')
        .directive('mhcPopover', mhcPopover);

    /* @ngInject */
    function mhcPopover() {

        var directive = {
            restrict: 'A',
            template: '<i class="fa fa-info-circle"></i>',
            scope: {
                popoverdata: "="
            },
            link: linkFunc
        };

        return directive;

        /* @ngInject */
        function linkFunc(scope, element, attrs) {
            element.popover({
                trigger: 'click',
                html: true,
                content: generateContent(),
                placement: attrs.popoverPlacement
            });

            function generateContent() {
                var content = "";
                if (angular.isDefined(scope.popoverdata)) {
                    if (angular.isDefined(scope.popoverdata.items)) {
                        var contentList = scope.popoverdata.items;
                        for (var i = 0; i < contentList.length; i++) {
                            content += "<li style='min-width: 235px;'>" + contentList[i] + "</li>";
                        }
                    } else if (angular.isDefined(scope.popoverdata.description)) {
                        content += "<div style='min-width: 200px;'>" + scope.popoverdata.description + "</div>";
                    }
                }
                return content;
            }
        }
    }
})();