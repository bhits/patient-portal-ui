/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.accessModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app");
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
            dependencies = module.value('app').requires;
        });
    });
});

describe("app.accessModule LoginController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('app.authenticationModule'));
    beforeEach(module('ngIdle'));
    beforeEach(module('app.accessModule'));

    var scope, state, rootScope, Idle, AuthenticationService, deferred;

    beforeEach(inject(function($rootScope, $controller, $state, _Idle_, _$q_, _AuthenticationService_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        deferred = _$q_.defer();

        Idle = _Idle_;
        AuthenticationService = _AuthenticationService_;

        deferred.resolve({Error: { message:"Invalid username and/or password."}});
        spyOn(AuthenticationService, 'login').andReturn(deferred.promise);

        $controller('LoginController', {
            $scope: scope,
            $state: state,
            Idle: Idle,
            AuthenticationService: AuthenticationService
        });
    }));

    it('should login user ', function(){
        //state.go('login');

        scope.loginData = {userName: "bob", passowrd: 'bob'};
        scope.login();
        rootScope.$apply();
        expect(scope.message).toBe('Invalid username and/or password.');
    });

});
