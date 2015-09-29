/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.authenticationModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.authenticationModule");
    });

    it("should be registered", function() {
        expect(module).not.toEqual(null);
    });

    describe("Dependencies:", function() {

        var dependencies;

        var hasModule = function(m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function() {
            dependencies = module.value('app.authenticationModule').requires;
        });

        it("should have LocalStorageModule as a dependency", function() {
            expect(hasModule('LocalStorageModule')).toEqual(true);
        });

        it("should have angular-jwt as a dependency", function() {
            expect(hasModule('angular-jwt')).toEqual(true);
        });

        it("should have app.servicesModule as a dependency", function() {
            expect(hasModule('app.servicesModule')).toEqual(true);
        });

        it("should have ngResource as a dependency", function() {
            expect(hasModule('ngResource')).toEqual(true);
        });

    });
});


describe('app.authenticationModule, AuthenticationService ', function() {
    var utilityService, localStorageService, q, jwtHelper, AuthenticationService, location, base64, $httpBackend;

    beforeEach(module('LocalStorageModule'));
    beforeEach(module('angular-jwt'));
    beforeEach(module('app.servicesModule'));
    beforeEach(module('ab-base64'));
    beforeEach(module('ngResource'));
    beforeEach(module('app.authenticationModule'));

    beforeEach(inject(function ( _localStorageService_, _$q_, _jwtHelper_, _AuthenticationService_, _$location_, _base64_, _utilityService_, _$httpBackend_) {

        utilityService = utilityService;
        localStorageService = _localStorageService_;
        q = _$q_;
        jwtHelper = _jwtHelper_;
        AuthenticationService = _AuthenticationService_;
        location = _$location_;
        base64 = _base64_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should clear cache", function() {
        $httpBackend.expectPOST("https://testbed-api-dev.feisystems.com/user/clearcacheforuser").respond({status: 201});

        spyOn(localStorageService, 'get').andReturn({
            token: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"}
        });
        var status = AuthenticationService.clearCache(
            function(data ){ status = data.status;},
            function(error){}
        );
        $httpBackend.flush();
        expect(status).toEqual(201);

    });

    it("should revoke token", function() {
        $httpBackend.expectPOST("https://sts-dev.feisystems.com/identity/tokens/revoke").respond({status: 201});

        spyOn(localStorageService, 'get').andReturn({
            token: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"}
        });
        var status = AuthenticationService.revokeToken(
            function(data ){ status = data.status;},
            function(error){}
        );
        $httpBackend.flush();
        expect(status).toEqual(201);
    });

    it("should set authentication data", function() {

        spyOn(localStorageService, 'get').andReturn({
            session: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"},
            userName: "test"
        });

        expect(AuthenticationService.authentication.isAuth).toBeFalsy();
        expect(AuthenticationService.authentication.userName).toEqual("");
        AuthenticationService.fillAuthData();

        expect(AuthenticationService.authentication.isAuth).toBeTruthy();
        expect(AuthenticationService.authentication.userName).toEqual("test");
    });

    it("should logout", function() {
        $httpBackend.expectPOST("https://sts-dev.feisystems.com/identity/tokens/revoke").respond({status: 201});
        $httpBackend.expectPOST("https://testbed-api-dev.feisystems.com/user/clearcacheforuser").respond({status: 201});

        spyOn(AuthenticationService, 'revokeToken').andCallThrough();
        spyOn(AuthenticationService, 'clearCache').andCallThrough();

        spyOn(localStorageService, 'get').andReturn({
            session: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"},
            userName: "test"
        });

        AuthenticationService.logOut();
        $httpBackend.flush();

        expect(AuthenticationService.authentication.isAuth).toBeFalsy();
        expect(AuthenticationService.authentication.userName).toEqual("");
    });

    xit("should login", function() {
        //$httpBackend.expectGET("https://sts-dev.feisystems.com/identity/tokens/get").respond({status: 201});

        spyOn(utilityService, 'isUnDefinedOrNull').andReturn(true);

        //spyOn(utilityService, 'isUnDefinedOrNull').andReturn(true);

        spyOn(localStorageService, 'get').andReturn({
            session: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"},
            userName: "test"
        });

        AuthenticationService.login();
        $httpBackend.flush();

        expect(AuthenticationService.authentication.isAuth).toBeFalsy();
        expect(AuthenticationService.authentication.userName).toEqual("");
    });

});

