/**
 * Created by tomson.ngassa on 7/20/2015.
 * Modified by cindy.ren on 6/21/2016
 */

'use strict';

xdescribe("app.healthInformationModule HealthInformationController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('app.core'));
    beforeEach(module('app.config'));
    beforeEach(module('app.healthInformation'));

    var scope, healthInformationService, utilityService, patientData, anchorScroll, spyObject, state,stateParams, location, httpBackend, rootScope;

    beforeEach(inject(function($rootScope, $controller, $state,$stateParams,  $anchorScroll, $location, $httpBackend,_$q_, _utilityService_, _healthInformationService_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        stateParams = $stateParams;
        anchorScroll = $anchorScroll;
        location = $location;
        httpBackend = $httpBackend;
        utilityService = _utilityService_;
        var deferred = _$q_.defer();
        healthInformationService = _healthInformationService_;

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
        // spyOn(healthInformationService, 'getCCDAHeader').andReturn(deferred.promise);
        //
        // spyOn(scope, 'setShowHealthInformationMenu').andCallThrough();
        //
        // spyOn(utilityService, 'scrollTo').andCallThrough();
        //
        // spyOn(scope, "$on");

        $controller('HealthInformationController', {
            $scope: scope,
            $state: state,
            $stateParams: stateParams,
            utilityService: utilityService,
            patientData: patientData,
            healthInformationService: healthInformationService
        });

        scope.$apply();
    }));


    xit('should scroll to ', function(){
        stateParams.scrollTo = 'allergies';
        stateParams.expand = 'none';
        expect(scope.$on).toHaveBeenCalled();
    });

    xit("should load resolve data", function(){
        stateParams.scrollTo = 'allergies';
        stateParams.expand = 'none';
        state.go("patient.healthinformation");
        //httpBackend.expectGET('app/common/content.html').respond(200);
        httpBackend.expectGET('https://testbed-api-dev.feisystems.com/ccda/getccdajson?emrn=2323').respond(200);
        httpBackend.expectGET('app/healthinformation/healthInformation.html').respond(200);

        rootScope.$digest();
        expect(healthInformationService.getCCDAHeader ).toHaveBeenCalled();
    });

});
