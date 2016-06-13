/* Created by cindy.ren on 6/9/2016.*/

describe('app.oauthTokenService ', function() {
    var oauthTokenService, sessionStorage, profileService, timeout;

    var token = {access_token: 'access_token', refresh_token: 'refresh_token', expires_in: 1};

    beforeEach(module('ngResource'));
    beforeEach(module('app.security'));
    beforeEach(jasmine.clock().install());

    beforeEach(inject(function (_oauthTokenService_, _$sessionStorage_,
                                _profileService_, _$timeout_) {
        oauthTokenService = _oauthTokenService_;
        profileService = _profileService_;
        sessionStorage = _$sessionStorage_;
        timeout = _$timeout_
    }));

    afterEach(jasmine.clock().uninstall());

    it("should set token", function() {
        oauthTokenService.removeToken();
        oauthTokenService.setToken('setTokenTest');
        expect(sessionStorage.token).toBe('setTokenTest');
    });

    it("should remove token", function() {

        oauthTokenService.setToken(token);
        profileService.setProfile('profile');

        oauthTokenService.removeToken();
        expect(sessionStorage.token).toBeUndefined();
        expect(sessionStorage.profile).toBeUndefined();
    });

    it("should get token", function() {
        oauthTokenService.removeToken();
        oauthTokenService.setToken(token);
        expect(oauthTokenService.getToken()).toBe(token);
    });

    it("should get access token", function() {
        oauthTokenService.removeToken(); //needed, otherwise tests pass every other time

        spyOn(oauthTokenService,'getToken').and.callThrough();
        expect(oauthTokenService.getAccessToken()).toBeNull();

        oauthTokenService.setToken(token);
        expect(oauthTokenService.getAccessToken()).toBe('access_token');
    });

    it("should get refresh token", function() {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService,'getToken').and.callThrough();
        expect(oauthTokenService.getRefreshToken()).toBeNull();

        oauthTokenService.setToken(token);
        expect(oauthTokenService.getRefreshToken()).toBe('refresh_token');
    });

    it("should get expiration time", function() {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService,'getToken').and.callThrough();
        expect(oauthTokenService.getExpiresIn()).toBeNull();

        oauthTokenService.setToken(token);
        var date = new Date(new Date().valueOf() + (1000));
        expect(oauthTokenService.getExpiresIn()).toEqual(date);

    });

    it("should return if valid token", function() {
        oauthTokenService.removeToken();

        spyOn(oauthTokenService,'getAccessToken').and.callThrough();
        spyOn(oauthTokenService,'getExpiresIn').and.callThrough();
        expect(oauthTokenService.isValidToken()).toBeFalsy();

        oauthTokenService.setToken(token);
        expect(oauthTokenService.isValidToken()).toBeTruthy();
    });

    it("should return if token has expired", function() {
        oauthTokenService.removeToken();
        spyOn(oauthTokenService,'getExpiresIn').and.callThrough();

        oauthTokenService.setToken(token);
        expect(oauthTokenService.isExpiredToken()).toBeFalsy();

        waits(2000);
        console.log(getExpiresIn().valueOf() < new Date().valueOf());
        expect(oauthTokenService.isExpiredToken()).toBeTruthy();

        expect(oauthTokenService, getExpiresIn).toHaveBeenCalled();
    });

    it("should return if a valid token has expired", function() {
        oauthTokenService.removeToken();
        spyOn(oauthTokenService,'getExpiresIn').and.callThrough();
        spyOn(oauthTokenService,'getAccessToken').and.callThrough();

        expect(oauthTokenService.isValidAndExpiredToken()).toBeFalsy();

        oauthTokenService.setToken(token);
        expect(oauthTokenService.isValidAndExpiredToken()).toBeFalsy();
        waits(2000);
        expect(oauthTokenService.isValidAndExpiredToken()).toBeTruthy();

        expect(oauthTokenService, getAccessToken).toHaveBeenCalled();
        expect(oauthTokenService, getRefreshToken).toHaveBeenCalled();
        expect(oauthTokenService, getExpiresIn).toHaveBeenCalled();
    });


});