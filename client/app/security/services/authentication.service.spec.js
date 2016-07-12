/*
 * Created by cindy.ren on 6/9/2016.
 */

'use strict';

describe('app.authenticationService ', function() {
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

    it("should login", function() {

        spyOn(authenticationService,'login').and.callThrough();

        var loginResource = authenticationService.login(loginInfo, success, error);
        expect(loginResource.username).toEqual("userName");

        expect(authenticationService.login).toHaveBeenCalledWith(loginInfo, success, error);

    });

    xit("should forget password", function() {

        spyOn(authenticationService,'forgotPassword').and.callThrough();

        var forgotPasswordResource = authenticationService.forgotPassword(loginInfo, success, error);
        expect(forgotPasswordResource.username).toEqual("username");

        expect(authenticationService.forgotPassword).toHaveBeenCalledWith(loginInfo, success, error);

    });
    
    it("should logout", function() {
        spyOn(oauthTokenService, 'removeToken').and.callThrough();
        spyOn(utilityService, 'redirectTo').and.callThrough();

        /*make sure the tokens are set in the services so that we're not removing nothing*/
        oauthTokenService.setToken('token');
        profileService.setProfile('profile');

        authenticationService.logout();

        //for line: oauthTokenService.removeToken();
        expect(oauthTokenService.token).toBeUndefined();
        expect(oauthTokenService.profile).toBeUndefined();

        //for line: utilityService.redirectTo(oauthConfig.loginPath);
        //path taken from: oauthConfig.loginPath
        expect(location.path()).toBe('/fe/login');
        expect(utilityService.redirectTo).toHaveBeenCalledWith('/fe/login');
        
    });


    
});

