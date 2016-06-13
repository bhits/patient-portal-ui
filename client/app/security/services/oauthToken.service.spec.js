/**
 * Created by cindy.ren on 6/9/2016.
 */

describe('app.oauthModule, oauthTokenService ', function() {
    var utilityService, oauthTokenService, authenticationService,
        location, profileService;

    beforeEach(module('ngResource'));
    beforeEach(module('app.security'));

    beforeEach(inject(function (_oauthTokenService_, _authenticationService_,
                                _$location_, _utilityService_, _profileService_) {
        utilityService = _utilityService_;
        authenticationService = _authenticationService_;
        oauthTokenService = _oauthTokenService_;
        profileService = _profileService_;
        location = _$location_;
    }));

    it("should remove token", function() {

        oauthTokenService.setToken('token');
        profileService.setProfile('profile');

        oauthTokenService.removeToken();
        expect(oauthTokenService.token).toBeUndefined();
        expect(oauthTokenService.profile).toBeUndefined();
    });

    it("should set token", function() {
        oauthTokenService.removeToken();
        oauthTokenService.setToken('setTokenTest');
        expect(oauthTokenService.getToken()).toBe('setTokenTest');
    });

    it("should get token", function() {
        oauthTokenService.removeToken();
        oauthTokenService.setToken('token');
        expect(oauthTokenService.getToken()).toBe('token');
    });

    it("should get access token", function() {
        oauthTokenService.removeToken(); //needed, otherwise tests pass every other time

        spyOn(oauthTokenService,'getToken').and.callThrough();
        expect(oauthTokenService.getAccessToken()).toBeNull();

        oauthTokenService.setToken('token');
        expect(oauthTokenService.getAccessToken()).toBeUndefined();
        //access_token is unresolved
    });

    it("should get refresh token", function() {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService,'getToken').and.callThrough();
        expect(oauthTokenService.getRefreshToken()).toBeNull();

        oauthTokenService.setToken('token');
        expect(oauthTokenService.getRefreshToken()).toBeUndefined();
        //access_token is unresolved
    });

    it("should get expiration time", function() {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService,'getToken').and.callThrough();
        expect(oauthTokenService.getExpiresIn()).toBeNull();

    });

    it("should return if valid token", function() {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService,'getAccessToken').and.callThrough();
        spyOn(oauthTokenService,'getExpiresIn').and.callThrough();
        expect(oauthTokenService.isValidToken()).toBeFalsy();

    });

    xit("should return if token has expired", function() {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService,'getExpiresIn').and.callThrough();
        expect(oauthTokenService.isExpiredToken()).toBeFalsy();

    }); //cannot test, getExpiresIn returns null

    xit("should return if token has expired", function() {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService,'getExpiresIn').and.callThrough();
        spyOn(oauthTokenService,'getAccessToken').and.callThrough();
        expect(oauthTokenService.isValidAndExpiredToken()).toBeFalsy();

    }); //cannot test, getExpiresIn returns null


});