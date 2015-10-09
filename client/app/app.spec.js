'use strict';

xdescribe('app module', function(){
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

        xit("should have app.healthInformationModule as a dependency", function() {
            expect(hasModule('app.healthInformationModule')).toEqual(true);
        });

        it("should have app.accessModule as a dependency", function() {
            expect(hasModule('app.accessModule')).toEqual(true);
        });

        xit("should have app.directivesModule as a dependency", function() {
            expect(hasModule('app.directivesModule')).toEqual(true);
        });

        xit("should have app.filtersModule as a dependency", function() {
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

xdescribe("app AppController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('app'));

    var scope, rootScope, state,stateParams,anchorScroll,location,utilityService, AuthenticationService, Idle;

    beforeEach(inject(function($rootScope, $controller, $state, $stateParams, $anchorScroll, $location, _utilityService_, _AuthenticationService_, _Idle_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        stateParams = $stateParams;
        anchorScroll = $anchorScroll;
        location = $location;
        utilityService = _utilityService_;
        AuthenticationService = _AuthenticationService_;
        Idle = _Idle_;

        spyOn(utilityService, 'setShowHealthInformationMenu').andCallThrough();

        spyOn(rootScope, "$broadcast");

        spyOn(AuthenticationService, 'logOut').andCallThrough();
        spyOn(Idle, 'unwatch').andCallThrough();

        $controller('AppController', {
            $scope: scope,
            $state: state,
            $stateParams: stateParams,
            $location: location,
            utilityService: utilityService,
            AuthenticationService: AuthenticationService

        });
    }));


    it('should set Health Information Menu.', function(){
        expect(scope.showHealthInformationMenu).toBeFalsy();
        scope.setShowHealthInformationMenu(true);
        expect(scope.showHealthInformationMenu).toBeTruthy();
    });

    it('should scroll to and expand', function(){
        var arg1 = {to: "a"};
        var arg2 = {expand: false};
        scope.scrollToAndExpand("a", false);
        expect(scope.$broadcast).toHaveBeenCalledWith("ScrollTo", arg1);
        expect(scope.$broadcast).toHaveBeenCalledWith("ExpandAccordion", arg2);
    });

    xit('should route to Health Information .', function(){
        state.current.name = "home";
        spyOn(state, 'go').andCallThrough();
        scope.routeToHealthInformation();
        expect(state.current.name ).toEqual("patient.healthinformation");
    });

    xit('should log out user.', function(){
        scope.logOut();
        expect( scope.showHealthInformationMenu).toBeFalsy();
    });

    xit('should close modal', function(){
        //scope.warning = false;
        scope.closeModals();
        expect( scope.warning).toBeNull();
    });
});