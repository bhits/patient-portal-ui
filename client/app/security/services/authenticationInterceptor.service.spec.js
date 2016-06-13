/**
 * Created by tomson.ngassa on 7/20/2015.
 *
 * Modified by cindy.ren on 6/13/2016.
 */

'use strict';

xdescribe('app.authInterceptorModule, authInterceptorService ', function(){
    var jwtHelper,utilityService, authInterceptorService, config, location, AuthenticationService, injector;

    beforeEach(module('app.security'));

    beforeEach(inject(function(_jwtHelper_,$injector, _authInterceptorService_, _$location_){
        injector = $injector;
        utilityService = $injector.get('utilityService');

        jwtHelper = _jwtHelper_;
        authInterceptorService = _authInterceptorService_;
        location = _$location_;
        spyOn(utilityService, 'redirectTo').andCallThrough();
    }));

    xit("should redirect to login", function() {
        spyOn(jwtHelper, 'isTokenExpired').andCallThrough();
        config = {};
        config = authInterceptorService.request(config);
        expect(location.path()).toEqual("/fe/login");
    });

    xit("should redirect to index ", function() {
        spyOn(jwtHelper, 'isTokenExpired').andCallThrough();
        config = {};
        location.path("/");
        config = authInterceptorService.request(config);
        expect(location.path()).toEqual("/fe/login");
    });

    xit("should redirect to login page if token has expired ", function() {
        AuthenticationService = injector.get('AuthenticationService');
        spyOn(AuthenticationService, 'logOut').andCallThrough();
        spyOn(jwtHelper, 'isTokenExpired').andReturn(true);
        spyOn(localStorage, 'getItem').andReturn({
            token: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"}
        });

        config = {header: "information"};
        config = authInterceptorService.request(config);
        expect(location.path()).toEqual("/fe/login");
    });

    it("should set token in header ", function() {
        spyOn(jwtHelper, 'isTokenExpired').andReturn(false);
        spyOn(localStorage, 'getItem').andReturn({ token: "my token"});
        config = {header: "information"};
        config = authInterceptorService.request(config);
        expect(config.headers.Authorization).toEqual("Bearer  my token");
    });

    it("should route to login in case of 401 ", function() {
        spyOn(localStorage, 'getItem').andReturn("");
        var rejection = {status: 401};
        config = authInterceptorService.responseError(rejection);
        expect(location.path()).toEqual("/fe/login");
    });

    it("should route to login in case of 401 and token has expired ", function() {
        spyOn(localStorage, 'getItem').andReturn({
            token: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"}
        });
        spyOn(jwtHelper, 'isTokenExpired').andReturn(true);
        var rejection = {status: 401};
        config = authInterceptorService.responseError(rejection);
        expect(location.path()).toEqual("/fe/login");
    });

});
