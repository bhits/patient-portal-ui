/**
 * Created by cindy.ren on 6/14/2016.
 */

'use strict';

xdescribe('app.c2sAccountVerification.directive', function () {

    var $resource, controller, $scope, $httpBackend, utilityService,
        accountService, emailTokenService, accountConfig, form;

    var verifyInfo = {
        emailToken: 'emailToken',
        verificationCode: 11111,
        birthDate: '2015-5-20'
    };

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));
    beforeEach(module('ngResource'));

    beforeEach(inject(function (_$resource_, $compile, $controller, $rootScope,
                                _$httpBackend_, _utilityService_, _accountService_, _emailTokenService_,
                                _accountConfig_) {

        $httpBackend = _$httpBackend_;
        $resource = _$resource_;
        $scope = $rootScope.$new();
        utilityService = _utilityService_;
        accountService = _accountService_;
        emailTokenService = _emailTokenService_;
        accountConfig = _accountConfig_;

        $httpBackend.whenGET('app/account/directives/verification.html').passThrough();

        var element = angular.element(
            '<form name="form">' +
            '<input ng-model="model.num" name="num" integer />' +
            '</form>'
        );
        $scope.model = {num: null};
        $compile(element)($scope);
        $scope.$digest();
        form = $scope.form;

        // controller = element.controller("VerificationController", {
        //     //$scope: $scope,
        //     utilityService: utilityService,
        //     accountService: accountService,
        //     emailTokenService: emailTokenService,
        //     accountConfig: accountConfig
        // });
        //controller = element.controller("VerificationController");
        var local = {
            utilityService: utilityService,
            accountService: accountService,
            emailTokenService: emailTokenService,
            accountConfig: accountConfig
        };
        controller = $controller('VerificationController', local, verifyInfo);
        controller.verifyInfo = verifyInfo;

    }));

    it('should clearField', function () {
        controller.clearField();
    });

});