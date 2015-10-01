/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.healthInformationModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.healthInformationModule");
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
            dependencies = module.value('app.healthInformationModule').requires;
        });

        it("should have app.servicesModule as a dependency", function() {
            expect(hasModule('app.servicesModule')).toEqual(true);
        });

        it("should have app.healthInformationService as a dependency", function() {
            expect(hasModule('app.healthInformationService')).toEqual(true);
        });
    });
});

describe("app.accessModule LoginController ", function() {

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

    xit('should login user ', function(){
        //state.go('login');

        scope.loginData = {userName: "bob", passowrd: 'bob'};
        scope.login();
        rootScope.$apply();
        expect(scope.message).toBe('Invalid username and/or password.');
    });

});

xdescribe("app.healthInformationModule HealthInformationController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('app.servicesModule'));
    beforeEach(module('app.healthInformationModule'));

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    var scope, HealthInformationService, utilityService, patientData, anchorScroll, spyObject, state,stateParams, location, httpBackend, rootScope;

    beforeEach(inject(function($rootScope, $controller, $state,$stateParams,  $anchorScroll, $location, $httpBackend,_$q_, _utilityService_, _HealthInformationService_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        stateParams = $stateParams;
        anchorScroll = $anchorScroll;
        location = $location;
        httpBackend = $httpBackend;
        utilityService = _utilityService_;
        var deferred = _$q_.defer();
        HealthInformationService = _HealthInformationService_;

        patientData = {};

        scope.setShowHealthInformationMenu = function(b){};

        var data = {
            "CCDAHeader": {
                Assignment: "Allopathic and Osteopathic Physicians",
                AuthorOfRecord: "Henry Seven",
                DateRecordDeveloped: "0001-01-01T00:00:00",
                InformationRecipient: "Henry Seven, Good Health Clinic",
                LegalAuthenticator: "Henry Seven"
            }
        };
        deferred.resolve(data);
        spyOn(HealthInformationService, 'getCCDAHeader').andReturn(deferred.promise);

        spyOn(scope, 'setShowHealthInformationMenu').andCallThrough();

        spyOn(utilityService, 'scrollTo').andCallThrough();

        spyOn(scope, "$on");

        $controller('HealthInformationController', {
            $scope: scope,
            $state: state,
            $stateParams: stateParams,
            utilityService: utilityService,
            patientData: patientData,
            HealthInformationService: HealthInformationService
        });

        scope.$apply();
    }));


    it('should scroll to ', function(){
        stateParams.scrollTo = 'allergies';
        stateParams.expand = 'none';
        expect(scope.$on).toHaveBeenCalled();
    });

    it("should load resolve data", function(){
        stateParams.scrollTo = 'allergies';
        stateParams.expand = 'none';
        state.go("patient.healthinformation");
        httpBackend.expectGET('app/common/content.tpl.html').respond(200);
        httpBackend.expectGET('https://testbed-api-dev.feisystems.com/ccda/getccdajson?emrn=2323').respond(200);
        httpBackend.expectGET('app/healthinformation/healthinformation.tpl.html').respond(200);

        rootScope.$digest();
        expect(HealthInformationService.getCCDAHeader ).toHaveBeenCalled();
    });

});