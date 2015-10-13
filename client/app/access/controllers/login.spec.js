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

    var state, ENVService, Idle, AuthenticationService, controller, utilityService;

    beforeEach(inject(function( $controller, $state, _Idle_, _AuthenticationService_, _ENVService_, _utilityService_) {
        state = $state;
        Idle = _Idle_;
        ENVService = _ENVService_;
        AuthenticationService = _AuthenticationService_;
        utilityService = _utilityService_;

        spyOn(utilityService,'scrollTo').andCallThrough();
        spyOn(AuthenticationService,'login').andCallThrough();
        spyOn(Idle,'watch').andCallThrough();
        spyOn(state,'go').andCallThrough();

        controller = $controller('LoginController', {
            $state: state,
            AuthenticationService: AuthenticationService,
            Idle: Idle,
            ENVService: ENVService,
            utilityService: utilityService
        });
    }));

    it('should have default values ', function(){
        expect(controller.loginData).toEqual({userName: "", password: ""});
        expect(controller.version).toEqual(ENVService.version);
    });

    it('should scroll to specify location', function(){
        controller.scrollTo("#test");
        expect(utilityService.scrollTo).toHaveBeenCalledWith('#test');
    });

    it('should login user', function(){
        controller.loginData = {userName: "test", password: "test"};
        controller.login();
        expect(AuthenticationService.login).toHaveBeenCalledWith({userName: "test", password: "test"});
    });

});
