/*
 * Created by cindy.ren on 6/9/2016.
 */

'use strict';

describe('app.authenticationService ', function() {
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

    it("should login", function() {

        var username='test', password='password';
        spyOn(authenticationService,'login').and.callThrough();


        var loginResource = authenticationService.login(username, password);

        //for line: var getLoginResource = loginResource(userName, password);

        expect(authenticationService.login).toHaveBeenCalledWith(username, password);
        //TODO: test if the promised save saved the correct parameters

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

