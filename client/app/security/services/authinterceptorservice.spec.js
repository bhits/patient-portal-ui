/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

xdescribe('app.security ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.security");
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
            dependencies = module.value('app.authInterceptorModule').requires;
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
    });
});

xdescribe('app.authInterceptorModule, authInterceptorService ', function(){
    var utilityService, localStorageService, q, jwtHelper, authInterceptorService, config, location, AuthenticationService, injector;

    beforeEach(module('LocalStorageModule'));
    beforeEach(module('angular-jwt'));
    beforeEach(module('app.servicesModule'));
    beforeEach(module('app.security'));

    beforeEach(inject(function($injector, _localStorageService_, _$q_, _jwtHelper_, _authInterceptorService_, _$location_){
        injector = $injector;
        utilityService = $injector.get('utilityService');

        localStorageService = _localStorageService_;
        q = _$q_;
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
        spyOn(localStorageService, 'get').andReturn({
            token: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"}
        });

        config = {header: "information"};
        config = authInterceptorService.request(config);
        expect(location.path()).toEqual("/fe/login");
    });

    it("should set token in header ", function() {
        spyOn(jwtHelper, 'isTokenExpired').andReturn(false);
        spyOn(localStorageService, 'get').andReturn({ token: "my token"});
        config = {header: "information"};
        config = authInterceptorService.request(config);
        expect(config.headers.Authorization).toEqual("Bearer  my token");
    });

    it("should route to login in case of 401 ", function() {
        spyOn(localStorageService, 'get').andReturn("");
        var rejection = {status: 401};
        config = authInterceptorService.responseError(rejection);
        expect(location.path()).toEqual("/fe/login");
    });

    it("should route to login in case of 401 and token has expired ", function() {
        spyOn(localStorageService, 'get').andReturn({
            token: { AccessToken: "", ExpiresIn: 3600, RefreshToken: "d387461fdbb0ee8d9a4dfbc39003ac85", TokenType: "Bearer"}
        });
        spyOn(jwtHelper, 'isTokenExpired').andReturn(true);
        var rejection = {status: 401};
        config = authInterceptorService.responseError(rejection);
        expect(location.path()).toEqual("/fe/login");
    });

});
