/**
 * Created by tomson.ngassa on 10/14/2015.
 */
/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.providerModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.providerModule");
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
            dependencies = module.value('app.providerModule').requires;
        });

        it("should have app.providerService as a dependency", function() {
            expect(hasModule('app.providerService')).toEqual(true);
        });

        it("should have app.providerDirectives as a dependency", function() {
            expect(hasModule('app.providerDirectives')).toEqual(true);
        });

        it("should have app.notificationModule as a dependency", function() {
            expect(hasModule('app.notificationModule')).toEqual(true);
        });

        it("should have app.providerFiltersModule as a dependency", function() {
            expect(hasModule('app.providerFiltersModule')).toEqual(true);
        });
    });
});

xdescribe("app.providerModule ProviderListController ", function() {


    beforeEach(module('app.providerService'));
    beforeEach(module('app.notificationModule'));
    beforeEach(module('app.providerFiltersModule'));
    beforeEach(module('app.filtersModule'));
    beforeEach(module('app.providerDirectives'));
    beforeEach(module('app.providerModule'));

    var scope, state, rootScope, Idle, AuthenticationService, deferred, controller;

    beforeEach(inject(function($rootScope, $controller, $state, _Idle_, _$q_, _AuthenticationService_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        deferred = _$q_.defer();

        Idle = _Idle_;
        AuthenticationService = _AuthenticationService_;

        deferred.resolve({Error: { message:"Invalid username and/or password."}});
        spyOn(AuthenticationService, 'login').andReturn(deferred.promise);

        controller = $controller('ProviderListController', {
            $scope: scope,
            $state: state,
            Idle: Idle,
            AuthenticationService: AuthenticationService
        });
    }));

    it('should open delete provider modal ', function(){


    });

});

//xdescribe("app.healthInformationModule HealthInformationController ", function() {
//
//    beforeEach(module('ui.router'));
//    beforeEach(module('ui.bootstrap'));
//    beforeEach(module('app.servicesModule'));
//    beforeEach(module('app.notificationModule'));
//    beforeEach(module('app.providerService'));
//    beforeEach(module('app.healthInformationModule'));
//
//    beforeEach(function(){
//        this.addMatchers({
//            toEqualData: function(expected) {
//                return angular.equals(this.actual, expected);
//            }
//        });
//    });
//
//    var scope, ProviderService, utilityService, providers, state,modal, log, httpBackend, rootScope, notificationService;
//
//    beforeEach(inject(function($rootScope, $controller, $state, _$modal_, _utilityService_, _ProviderService_, _notificationService_, _providers_) {
//        rootScope = $rootScope;
//        scope = $rootScope.$new();
//        state = $state;
//        modal = _$modal_;
//        utilityService = _utilityService_;
//        ProviderService = _ProviderService_;
//        notificationService = _notificationService_;
//        providers = _providers_;
//
//        //deferred.resolve(data);
//        //spyOn(HealthInformationService, 'getCCDAHeader').andReturn(deferred.promise);
//        //
//        //spyOn(scope, 'setShowHealthInformationMenu').andCallThrough();
//        //
//        //spyOn(utilityService, 'scrollTo').andCallThrough();
//        //
//        //spyOn(scope, "$on");
//
//        $controller('ProviderListController', {
//            $scope: scope,
//            providers: providers,
//            $modal: modal,
//            ProviderService: ProviderService,
//            notificationService: notificationService,
//            $state: state
//        });
//
//    }));
//
//
//    it('should scroll to ', function(){
//        stateParams.scrollTo = 'allergies';
//        stateParams.expand = 'none';
//        expect(scope.$on).toHaveBeenCalled();
//    });
//
//
//});