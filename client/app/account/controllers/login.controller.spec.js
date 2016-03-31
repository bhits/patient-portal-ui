/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

xdescribe('app.accessModule ', function(){
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

xdescribe("app.accessModule LoginController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('ngIdle'));
    beforeEach(module('app.security'));

    var state, envService, Idle, authenticationService, controller, utilityService;

    beforeEach(inject(function( $controller, $state, _Idle_, _authenticationService_, _envService_, _utilityService_) {
        state = $state;
        Idle = _Idle_;
        envService = _envService_;
        authenticationService = _authenticationService_;
        utilityService = _utilityService_;

        spyOn(utilityService,'scrollTo').andCallThrough();
        spyOn(authenticationService,'login').andCallThrough();
        spyOn(Idle,'watch').andCallThrough();
        spyOn(state,'go').andCallThrough();

        controller = $controller('LoginController', {
            $state: state,
            authenticationService: authenticationService,
            Idle: Idle,
            envService: envService,
            utilityService: utilityService
        });
    }));

    it('should have default values ', function(){
        expect(controller.loginData).toEqual({userName: "", password: ""});
        expect(controller.version).toEqual(envService.version);
    });

    it('should scroll to specify location', function(){
        controller.scrollTo("#test");
        expect(utilityService.scrollTo).toHaveBeenCalledWith('#test');
    });

    it('should login user', function(){
        controller.loginData = {userName: "test", password: "test"};
        controller.login();
        expect(authenticationService.login).toHaveBeenCalledWith({userName: "test", password: "test"});
    });

});
