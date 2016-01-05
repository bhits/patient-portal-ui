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


       it("should have app.core as a dependency", function() {
            expect(hasModule('app.core')).toEqual(true);
        });

        it("should have app.security as a dependency", function() {
            expect(hasModule('app.security')).toEqual(true);
        });

        it("should have app.config as a dependency", function() {
            expect(hasModule('app.config')).toEqual(true);
        });

        it("should have app.home as a dependency", function() {
            expect(hasModule('app.home')).toEqual(true);
        });

        it("should have app.healthInformation as a dependency", function() {
            expect(hasModule('app.healthInformation')).toEqual(true);
        });

        it("should have app.provider as a dependency", function() {
            expect(hasModule('app.provider')).toEqual(true);
        });

        it("should have app.layout as a dependency", function() {
            expect(hasModule('app.layout')).toEqual(true);
        });

        it("should have app.medicalDocument as a dependency", function() {
            expect(hasModule('app.medicalDocument')).toEqual(true);
        });
    });
});

xdescribe("app AppController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('ngIdle'));
    beforeEach(module('angular-loading-bar'));
    beforeEach(module('app.security'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('templates-app'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ngAria'));
    beforeEach(module('app.directivesModule'));
    beforeEach(module('app.servicesModule'));
    beforeEach(module('app.filtersModule'));
    beforeEach(module('app.homeModule'));
    beforeEach(module('app.healthInformationModule'));
    beforeEach(module('app.providerModule'));
    beforeEach(module('app'));


    var controller, scope, rootScope, state,anchorScroll,utilityService, authenticationService, Idle;

    beforeEach(inject(function($rootScope, $controller, $state, $anchorScroll, _utilityService_, _authenticationService_, _Idle_, _$modal_, _idleConfigParams_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        anchorScroll = $anchorScroll;
        utilityService = _utilityService_;
        authenticationService = _authenticationService_;
        Idle = _Idle_;

        spyOn(utilityService, 'setShowHealthInformationMenu').andCallThrough();

        spyOn(rootScope, "$broadcast");

        //spyOn(authenticationService, 'logOut').andCallThrough();
        spyOn(Idle, 'unwatch').andCallThrough();

        controller = $controller('AppController', {
            $scope: scope,
            authenticationService: _authenticationService_,
            $state: $state,
            utilityService: _utilityService_,
            $modal:_$modal_,
            Idle: _Idle_,
            idleConfigParams: _idleConfigParams_,
            rootScope: $rootScope
        });
    }));


    xit('should show Health Information Menu.', function(){
        expect(controller.healthInformationMenu).toBeFalsy();
        controller.showHealthInformationMenu();
        expect(controller.healthInformationMenu).toBeTruthy();
    });

    xit('should scroll to and expand', function(){
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