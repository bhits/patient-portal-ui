/**
 * Created by tomson.ngassa on 7/20/2015.
 *
 * Modified by cindy.ren on 6/13/2016.
 */

'use strict';

describe('app.authInterceptorService', function () {
    var $q, $location, utilityService, oauthTokenService,
        urlAuthorizationConfigurerService, securityConstants, authInterceptorService;

    var config;

    beforeEach(function () {
        module(function ($provide) {
            $provide.constant('configConstants');
        });
    });

    beforeEach(module('app.security'));
    beforeEach(module('app.account'));

    beforeEach(inject(function (_$q_, _$location_, _utilityService_, _oauthTokenService_,
                                _urlAuthorizationConfigurerService_, _securityConstants_, _authInterceptorService_) {

        $q = _$q_;
        $location = _$location_;
        utilityService = _utilityService_;
        oauthTokenService = _oauthTokenService_;
        urlAuthorizationConfigurerService = _urlAuthorizationConfigurerService_;
        securityConstants = _securityConstants_;
        authInterceptorService = _authInterceptorService_;
    }));

    it("should redirect to login", function () {
        config = {};
        config = authInterceptorService.request(config);
        expect($location.path()).toEqual("/fe/login");
    });

    it("should redirect to index ", function () {
        config = {};
        $location.path("/");
        config = authInterceptorService.request(config);
        expect($location.path()).toEqual("/fe/login");
    });

    it("should set token in header ", function () {
        spyOn(oauthTokenService, 'getAccessToken').and.returnValue("token");
        spyOn(oauthTokenService, 'isExpiredToken').and.returnValue(false);
        spyOn(utilityService, 'isSecuredApi').and.returnValue(true);
        config = {header: "information"};
        config = authInterceptorService.request(config);
        expect(config.headers.Authorization).toEqual("Bearer  token");
    });

    it("should fail set token in header (expired token) and redirect", function () {
        spyOn(oauthTokenService, 'getAccessToken').and.returnValue("token");
        spyOn(oauthTokenService, 'isExpiredToken').and.returnValue(true);
        spyOn(utilityService, 'redirectTo');
        config = {header: "information"};
        config = authInterceptorService.request(config);
        expect(utilityService.redirectTo).toHaveBeenCalled();
    });

    it("should fail set token in header (isAllowAccess=true) and redirect", function () {
        spyOn($location, 'path').and.returnValue("path");
        spyOn(urlAuthorizationConfigurerService, 'isAllowAccess').and.returnValue(true);
        spyOn(utilityService, 'redirectTo');
        config = {header: "information"};
        config = authInterceptorService.request(config);
        expect(utilityService.redirectTo).toHaveBeenCalledWith("path");
    });

    it("should fail set token in header (isAllowAccess=false) and redirect", function () {
        spyOn(urlAuthorizationConfigurerService, 'isAllowAccess').and.returnValue(false);
        spyOn(utilityService, 'redirectTo');
        config = {header: "information"};
        config = authInterceptorService.request(config);
        expect(utilityService.redirectTo).toHaveBeenCalledWith("/fe/login");
    });

    //TODO: responseError is not finished?
    xit("should route to login in case of 401 ", function () {
        spyOn(oauthTokenService, 'getToken').and.returnValue("token");
        spyOn(oauthTokenService, 'isExpiredToken').and.returnValue(false);
        spyOn(utilityService, 'isSecuredApi').and.returnValue(true);
        spyOn(localStorage, 'getItem').and.returnValue("");
        var rejection = {status: 401};
        config = authInterceptorService.responseError(rejection);
        expect($location.path()).toEqual("/fe/login");
    });

    xit("should route to login in case of 401 and token has expired ", function () {
        spyOn(localStorage, 'getItem').andReturn({
            token: {
                AccessToken: "",
                ExpiresIn: 3600,
                RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85",
                TokenType: "Bearer"
            }
        });
        var rejection = {status: 401};
        config = authInterceptorService.responseError(rejection);
        expect($location.path()).toEqual("/fe/login");
    });
});