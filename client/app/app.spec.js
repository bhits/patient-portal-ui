'use strict';

describe('app module', function(){
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

        it("should have templates-app as a dependency", function() {
            expect(hasModule('templates-app')).toEqual(true);
        });

        it("should have templates-common as a dependency", function() {
            expect(hasModule('templates-common')).toEqual(true);
        });

       it("should have ui.router as a dependency", function() {
            expect(hasModule('ui.router')).toEqual(true);
        });

        it("should have angular-loading-bar as a dependency", function() {
            expect(hasModule('angular-loading-bar')).toEqual(true);
        });

        it("should have ngIdle as a dependency", function() {
            expect(hasModule('ngIdle')).toEqual(true);
        });

        it("should have ngIdle as a dependency", function() {
            expect(hasModule('ngIdle')).toEqual(true);
        });

        it("should have ui.bootstrap as a dependency", function() {
            expect(hasModule('ui.bootstrap')).toEqual(true);
        });

        it("should have app.homeModule as a dependency", function() {
            expect(hasModule('app.homeModule')).toEqual(true);
        });

        it("should have app.healthInformationModule as a dependency", function() {
            expect(hasModule('app.healthInformationModule')).toEqual(true);
        });

        it("should have app.accessModule as a dependency", function() {
            expect(hasModule('app.accessModule')).toEqual(true);
        });

        it("should have app.directivesModule as a dependency", function() {
            expect(hasModule('app.directivesModule')).toEqual(true);
        });

        it("should have app.filtersModule as a dependency", function() {
            expect(hasModule('app.filtersModule')).toEqual(true);
        });

        it("should have app.servicesModule as a dependency", function() {
            expect(hasModule('app.servicesModule')).toEqual(true);
        });

        it("should have app.interceptorModule as a dependency", function() {
            expect(hasModule('app.authInterceptorModule')).toEqual(true);
        });

        it("should have app.authenticationModule as a dependency", function() {
            expect(hasModule('app.authenticationModule')).toEqual(true);
        });
    });
});

describe("app AppController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('ngIdle'));
    beforeEach(module('angular-loading-bar'));
    beforeEach(module('app.authenticationModule'));
    beforeEach(module('app.authenticationModule'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('templates-app'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('templates-common'));
    beforeEach(module('ngAria'));
    beforeEach(module('app.directivesModule'));
    beforeEach(module('app.servicesModule'));
    beforeEach(module('app.filtersModule'));
    beforeEach(module('app.homeModule'));
    beforeEach(module('app.healthInformationModule'));
    beforeEach(module('app.providerModule'));
    beforeEach(module('app'));


    var controller, scope, rootScope, state,anchorScroll,utilityService, AuthenticationService, Idle;

    beforeEach(inject(function($rootScope, $controller, $state, $anchorScroll, _utilityService_, _AuthenticationService_, _Idle_, _$modal_, _idleConfigParams_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        anchorScroll = $anchorScroll;
        utilityService = _utilityService_;
        AuthenticationService = _AuthenticationService_;
        Idle = _Idle_;

        spyOn(utilityService, 'setShowHealthInformationMenu').andCallThrough();

        spyOn(rootScope, "$broadcast");

        spyOn(AuthenticationService, 'logOut').andCallThrough();
        spyOn(Idle, 'unwatch').andCallThrough();

        controller = $controller('AppController', {
            $scope: scope,
            AuthenticationService: _AuthenticationService_,
            $state: $state,
            utilityService: _utilityService_,
            $modal:_$modal_,
            Idle: _Idle_,
            idleConfigParams: _idleConfigParams_,
            rootScope: $rootScope
        });
    }));


    it('should show Health Information Menu.', function(){
        expect(controller.healthInformationMenu).toBeFalsy();
        controller.showHealthInformationMenu();
        expect(controller.healthInformationMenu).toBeTruthy();
    });

    it('should scroll to and expand', function(){
        var arg1 = {to: "a"};
        var arg2 = {expand: false};
        controller.scrollToAndExpand("a", false);
        expect(scope.$broadcast).toHaveBeenCalledWith("ScrollTo", arg1);
        expect(scope.$broadcast).toHaveBeenCalledWith("ExpandAccordion", arg2);
    });

    xit('should route to Health Information .', function(){
        state.current.name = "home";
        spyOn(state, 'go').andCallThrough();
        controller.routeToHealthInformation();
        expect(state.current.name ).toEqual("patient.healthinformation");
    });

    xit('should log out user.', function(){
        controller.logOut();
        expect( controller.showHealthInformationMenu).toBeFalsy();
    });

    xit('should close modal', function(){
        //scope.warning = false;
        scope.closeModals();
        expect( scope.warning).toBeNull();
    });

    xit('should  handle ToggleMenuItemWithoutData event', function(){
        var menuItems = {
            demographics: true,
            medications: true,
            alerts:true

        };
        spyOn(scope, '$on').andCallThrough();
        rootScope.$broadcast('ToggleMenuItemWithoutData', menuItems);
        expect(scope.$on).toHaveBeenCalledWith(menuItems);
    });
});