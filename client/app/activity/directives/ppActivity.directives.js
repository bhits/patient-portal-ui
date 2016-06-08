
(function () {

    'use strict';

    angular
        .module('app.activity')
            .directive('ppActivity', ppActivity);

            function ppActivity() {

                var directive = {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/activity/directives/activity.html',
                    scope: {},
                    bindToController: {
                        activities: '='
                    },
                    controllerAs: 'activityVm',
                    controller: ActivityController
                };

                return directive;

                function ActivityController(){
                    var vm = this;
                }
            }
})();