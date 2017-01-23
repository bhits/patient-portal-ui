/* Created by cindy.ren on 6/9/2016.*/
'use strict';

describe('app.oauthTokenService ', function () {
    var oauthTokenService, sessionStorage, profileService, timeout;

    var token = {access_token: 'access_token', refresh_token: 'refresh_token', expires_in: 1};

    beforeEach(module('ngResource'));
    beforeEach(module('app.security'));
    beforeEach(
        // Clean up application timers.
        jasmine.clock().uninstall()
    );

    beforeEach(inject(function (_oauthTokenService_, _$sessionStorage_, _profileService_, _$timeout_) {
        oauthTokenService = _oauthTokenService_;
        profileService = _profileService_;
        sessionStorage = _$sessionStorage_;
        timeout = _$timeout_;
    }));

    it("should set token", function () {
        oauthTokenService.removeToken();
        oauthTokenService.setToken('setTokenTest');
        expect(sessionStorage.token).toBe('setTokenTest');
    });

    it("should remove token", function () {

        oauthTokenService.setToken(token);
        profileService.setProfile('profile');

        oauthTokenService.removeToken();
        expect(sessionStorage.token).toBeUndefined();
        expect(sessionStorage.profile).toBeUndefined();
    });

    it("should get token", function () {
        oauthTokenService.removeToken();
        oauthTokenService.setToken(token);
        expect(oauthTokenService.getToken()).toBe(token);
    });

    it("should get access token", function () {
        oauthTokenService.removeToken(); //needed, otherwise tests pass every other time

        spyOn(oauthTokenService, 'getToken').and.callThrough();
        expect(oauthTokenService.getAccessToken()).toBeNull();

        oauthTokenService.setToken(token);
        expect(oauthTokenService.getAccessToken()).toBe('access_token');
    });

    it("should get refresh token", function () {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService, 'getToken').and.callThrough();
        expect(oauthTokenService.getRefreshToken()).toBeNull();

        oauthTokenService.setToken(token);
        expect(oauthTokenService.getRefreshToken()).toBe('refresh_token');
    });

    it("should get expiration date (getTokenExpirationDate)", function () {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService, 'getTokenExpirationDate').and.callThrough();
        expect(oauthTokenService.getTokenExpirationDate()).toBeNull();

        oauthTokenService.setToken(token);
        var date = new Date(new Date().valueOf() + (1000));
        expect(oauthTokenService.getTokenExpirationDate()).toEqual(date);
    });


});