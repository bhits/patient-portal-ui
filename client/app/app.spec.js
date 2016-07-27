/*
 * Created by cindy.ren on 6/9/2016.
 */

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

        /* Shared modules*/
        it("should have app.core as a dependency", function() {
            expect(hasModule('app.core')).toEqual(true);
        });

        it("should have templates-app as a dependency", function() {
            expect(hasModule('templates-app')).toEqual(true);
        });

        it("should have app.security as a dependency", function() {
            expect(hasModule('app.security')).toEqual(true);
        });

        it("should have app.config as a dependency", function() {
            expect(hasModule('app.config')).toEqual(true);
        });

        /*Feature areas*/
        it("should have app.home as a dependency", function() {
            expect(hasModule('app.home')).toEqual(true);
        });

        it("should have app.home as a dependency", function() {
            expect(hasModule('app.consent')).toEqual(true);
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

        it("should have app.home as a dependency", function() {
            expect(hasModule('app.account')).toEqual(true);
        });

    });
});

describe("app AppController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('ngIdle'));
    beforeEach(module('angular-loading-bar'));
    beforeEach(module('app.security'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('templates-app'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ngAria'));
    beforeEach(module('app'));

    var controller, scope, $location, $templateCache, $rootScope, $state, anchorScroll, utilityService, authenticationService, Idle;

    function mockTemplate(templateRoute, tmpl) {
        $templateCache.put(templateRoute, tmpl || templateRoute);
    }

    function goTo(url) {
        $location.url(url);
        $rootScope.$digest();
    }

    beforeEach(inject(function(_$rootScope_, _$templateCache_, _$location_, $controller, _$state_, $anchorScroll, _utilityService_, _authenticationService_, _Idle_, _$modal_, _idleConfigParams_) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $state = _$state_;
        $location = _$location_;
        $templateCache = _$templateCache_;
        anchorScroll = $anchorScroll;
        utilityService = _utilityService_;
        authenticationService = _authenticationService_;
        Idle = _Idle_;


        spyOn($rootScope, "$broadcast").and.callThrough();

        //spyOn(authenticationService, 'logOut').and.callThrough();
        spyOn(Idle, 'unwatch').and.callThrough();

        mockTemplate.bind(null, 'app/home/home.html');
        mockTemplate.bind(null, 'app/healthInformation/controllers/healthInformation.html');

        controller = $controller('AppController', {
            $scope: scope,
            authenticationService: _authenticationService_,
            state: $state,
            utilityService: _utilityService_,
            $modal:_$modal_,
            Idle: _Idle_,
            idleConfigParams: _idleConfigParams_,
            rootScope: $rootScope
        });
    }));


    it('should show Health Information Menu.', function(){
        expect(controller.healthInformationMenu).toBeFalsy();
    });

    it('should scroll to and expand', function(){
        var arg1 = {to: "a"};
        var arg2 = {expand: false};
        controller.scrollToAndExpand("a", false);
        expect(scope.$broadcast).toHaveBeenCalledWith("ScrollTo", arg1);
        expect(scope.$broadcast).toHaveBeenCalledWith("ExpandAccordion", arg2);
    });

    it('should route to Health Information.', function(){
        $state.current.name = "home";
        spyOn($state, 'go').and.callThrough();
        controller.routeToHealthInformation();
        expect($state.go).toHaveBeenCalledWith('fe.patient.healthinformation', {scrollTo: 'none', expand: 'none'});
    });

    it('should expect undefined if warning is never opened', function(){
        controller.closeModals();
        expect(controller.warning).toBe(undefined);
    });

    it ('should state change (stateChangeSuccess)', function(){
        
    });
    
});