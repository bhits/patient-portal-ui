/**
 * Created by Jiahao.Li on 3/20/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.consent')
        .directive('mhcCategoryListAndShowInfo', mhcCategoryListAndShowInfo);

    function mhcCategoryListAndShowInfo() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/consent/directives/categoryListAndShowInfo.html',
            scope: {
                bindModel: '=categoryModel',
                bindObj: '=categoryObj'
            },
            controller: CategoryListAndShowInfoController
        };
        return directive;
    }

    /* @ngInject */
    function CategoryListAndShowInfoController() {
    }
})();