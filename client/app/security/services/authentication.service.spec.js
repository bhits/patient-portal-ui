/*
 * Created by cindy.ren on 6/9/2016.
 */

'use strict';

xdescribe('app.authenticationService ', function () {
    var utilityService, oauthTokenService, authenticationService,
        location, profileService, $httpBackend;
    var loginInfo = {username: "userName", password: "password", email: "email"};

    var success = function (response) {
        return response;
    };

    var error = function (data) {
        return data;
    };

    beforeEach(module('ngResource'));
    beforeEach(module('app.security'));

    beforeEach(inject(function (_oauthTokenService_, _authenticationService_, _$httpBackend_,
                                _$location_, _utilityService_, _profileService_) {

        $httpBackend = _$httpBackend_;
        utilityService = _utilityService_;
        authenticationService = _authenticationService_;
        oauthTokenService = _oauthTokenService_;
        profileService = _profileService_;
        location = _$location_;
    }));

    it("should login", function () {
        $httpBackend.expect('POST', '/uaa/oauth/token').respond(200);
        spyOn(authenticationService, 'login').and.callThrough();

        var loginResource = authenticationService.login(loginInfo, success, error);
        $httpBackend.flush();
        expect(loginResource.username).toEqual("userName");
        expect(authenticationService.login).toHaveBeenCalledWith(loginInfo, success, error);
    });

    it("should forget password", function () {
        $httpBackend.expect('POST', '/uaa/forgot_password.do').respond(200);
        spyOn(authenticationService, 'forgotPassword').and.callThrough();

        var forgotPasswordResource = authenticationService.forgotPassword(loginInfo, success, error);
        $httpBackend.flush();
        expect(forgotPasswordResource.username).toEqual("userName");
        expect(authenticationService.forgotPassword).toHaveBeenCalledWith(loginInfo, success, error);
    });

    it("should logout", function () {
        spyOn(oauthTokenService, 'removeToken').and.callThrough();
        spyOn(utilityService, 'redirectTo').and.callThrough();

        /*make sure the tokens are set in the services so that we're not removing nothing*/
        oauthTokenService.setToken('token');
        profileService.setProfile('profile');

        authenticationService.logout();

        //for line: oauthTokenService.removeToken();
        expect(oauthTokenService.token).toBeUndefined();
        expect(oauthTokenService.profile).toBeUndefined();

        //for line: utilityService.redirectTo(securityConstants.loginPath);
        //path taken from: securityConstants.loginPath
        expect(location.path()).toBe('/fe/login');
        expect(utilityService.redirectTo).toHaveBeenCalledWith('/fe/login');

    });


});

