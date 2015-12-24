(function () {
    'use strict';

    angular
        .module('app.layout')
            .directive('ppIboxTools', ppIboxTools);

            /* @ngInject */
            function ppIboxTools($timeout) {
                return {
                    restrict: 'A',
                    scope: {
                        total: '@',
                        ppCollapsed: '=?',
                        ppChevronPreventDefault: '=?'
                    },
                    templateUrl: 'app/layout/directives/iBoxTools.html',
                    controller: function ($scope, $element) {
                        $scope.ppChevronPreventDefault = !!$scope.ppChevronPreventDefault;
                        var ibox = $element.closest('div.ibox');
                        var icon = $element.find('i:first');
                        var content = ibox.find('div.ibox-content');

                        if ($scope.ppCollapsed) {
                            content.slideUp(0);
                        }

                        $scope.toggleCollapsed = function () {
                            if (!$scope.ppChevronPreventDefault) {
                                $scope.ppCollapsed = !$scope.ppCollapsed;
                            }
                        };

                        // Function for collapse ibox
                        $scope.showhide = function () {
                            content.slideToggle(200);
                            // Toggle icon from up to down
                            icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                            //ibox.toggleClass('').toggleClass('border-bottom');
                            $timeout(function () {
                                ibox.resize();
                                ibox.find('[id^=map-]').resize();
                            }, 50);
                        };
                        // Function for close ibox
                        $scope.closebox = function () {
                            var ibox = $element.closest('div.ibox');
                            ibox.remove();
                        };

                        //handle expand event
                        $scope.$on('ExpandAccordions', function (event, args) {

                            if (args.expand) {
                                //Accordion down
                                content.slideDown(200);

                                if (icon.hasClass('fa-chevron-down')) {
                                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                                }

                                ibox.toggleClass('');
                                $timeout(function () {
                                    ibox.resize();
                                    ibox.find('[id^=map-]').resize();
                                }, 50);
                            }
                        });

                        $scope.$on('CollapseAccordions', function (event, args) {

                            if (args.collapse) {
                                //Accordion down
                                content.slideUp(200);

                                if (icon.hasClass('fa-chevron-up')) {
                                    icon.toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
                                }

                                ibox.toggleClass('');
                                $timeout(function () {
                                    ibox.resize();
                                    ibox.find('[id^=map-]').resize();
                                }, 50);
                            }
                        });

                        $scope.$watch('ppCollapsed', function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                $scope.showhide();
                            }
                        });
                    }
                };
            }
})();