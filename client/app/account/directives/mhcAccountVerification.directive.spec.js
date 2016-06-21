/**
 * Created by cindy.ren on 6/14/2016.
 */

'use strict';

xdescribe('app.mhcAccountVerification.directive', function(){

    var mhcAccountVerification, $resource, envService, controller, $scope, $httpBackend, utilityService,
        accountService, emailTokenService, accountConfig;

    var verifyInfo = {
        emailToken: 'emailToken',
        verificationCode: 11111,
        birthDate: '2015-5-20'
    };

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));
    beforeEach(module('ngResource'));

    beforeEach(inject(function(_$resource_, _envService_, $compile, $controller, $rootScope,
                               _$httpBackend_, _utilityService_, _accountService_, _emailTokenService_,
                               _accountConfig_){

        $httpBackend = _$httpBackend_;
        $resource = _$resource_;
        envService = _envService_;
        $scope = $rootScope.$new();
        utilityService = _utilityService_;
        accountService = _accountService_;
        emailTokenService = _emailTokenService_;
        accountConfig = _accountConfig_;

        var element = angular.element("<mhcAccountVerification></mhcAccountVerification>");
        element = $compile(element)($scope);
        $scope.$digest();

        controller = element.controller("VerificationController", {
            //$scope: $scope,
            utilityService: utilityService,
            accountService: accountService,
            emailTokenService: emailTokenService,
            accountConfig: accountConfig
        });
        //controller = element.controller("VerificationController");

    }));
    
});