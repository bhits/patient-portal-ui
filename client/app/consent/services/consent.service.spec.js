'use strict';

xdescribe('app.consentServices', function () {

    var consentService, $resource, envService, utilityService,
        notificationService, $httpBackend, $scope;

    beforeEach(module('app.config'));
    beforeEach(module('app.consent'));

    beforeEach(inject(function(_consentService_, _$resource_, _$rootScope_, _envService_,
                               _utilityService_, _notificationService_, _$httpBackend_){
        consentService = _consentService_;
        $resource = _$resource_;
        $scope = _$rootScope_.$new();
        envService = _envService_;
        utilityService = _utilityService_;
        notificationService = _notificationService_;
        $httpBackend = _$httpBackend_;


    }));


    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });

    describe("test getters", function(){

        var testURL;

        it ('should get consent resource', function(){
            testURL = $resource(envService.securedApis.pcmApiBaseUrl + "/consents/pageNumber/:pageNumber", {pageNumber: '@pageNumber'});
            expect(consentService.getConsentResource().toString()).toEqual(testURL.toString());
        });

        it ('should get purpose of use resource', function(){
            testURL = $resource(envService.securedApis.pcmApiBaseUrl + "/purposeOfUse");
            expect(consentService.getPurposeOfUseResource().toString()).toEqual(testURL.toString());
        });

        it ('should get sensitivity policy resource', function(){
            testURL = $resource(envService.securedApis.pcmApiBaseUrl + "/sensitivityPolicy");
            expect(consentService.getSensitivityPolicyResource().toString()).toEqual(testURL.toString());
        });

        it ('should get consent', function(){
            //$httpBackend.expect('GET', '/pcm/patients/consents/pageNumber/11111').respond({status: 201});
            var status = consentService.getConsent(
                {id: 1},
                function (success) {
                    console.log('success!');
                },
                function (error) {
                    console.log('error!');
                });
            expect(status).toEqual(201);
        });
        
        

    }); //end describe: test getters
});