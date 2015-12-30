(function () {
    'use strict';

    angular
        .module('app.layout')
            .directive('ppIboxTools', ppIboxTools);

            /* @ngInject */
            function ppIboxTools($timeout) {
                var directive = {
                    restrict: 'A',
                    bindToController: {
                        total: '@',
                        ppCollapsed: '=?',
                        ppChevronPreventDefault: '=?'
                    },
                    templateUrl: 'app/layout/directives/iBoxTools.html',
                    controller: IboxToolController,
                    controllerAs: 'iboxToolVm'

                };

                return directive;

                function IboxToolController($scope, $element) {
                    var iboxToolVm = this;

                    iboxToolVm.ppChevronPreventDefault = !!iboxToolVm.ppChevronPreventDefault;
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.find('div.ibox-content');

                    if (iboxToolVm.ppCollapsed) {
                        content.slideUp(0);
                    }

                    iboxToolVm.toggleCollapsed = function () {
                        if (!iboxToolVm.ppChevronPreventDefault) {
                            iboxToolVm.ppCollapsed = !iboxToolVm.ppCollapsed;
                        }
                    };

                    // Function for collapse ibox
                    iboxToolVm.showhide = function () {
                        content.slideToggle(200);
                        // Toggle icon from up to down
                        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                        $timeout(function () {
                            ibox.resize();
                            ibox.find('[id^=map-]').resize();
                        }, 50);
                    };
                    // Function for close ibox
                    iboxToolVm.closebox = function () {
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

                    $scope.$watch('iboxToolVm.ppCollapsed', function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            iboxToolVm.showhide();
                        }
                    });
                }
            }
})();