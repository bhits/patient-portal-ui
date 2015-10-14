/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.providerFiltersModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.providerFiltersModule");
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
            dependencies = module.value('app.providerFiltersModule').requires;
        });

        it("should have app.servicesModule as a dependency", function() {
            expect(hasModule('app.servicesModule')).toEqual(true);
        });
    });
});

describe('app.providerFiltersModule ', function () {

    var pcmProviderAddress, pcmNameorfacility, mockUtilityService;

    beforeEach(module('app.servicesModule'));
    beforeEach(module('app.providerFiltersModule'));

    beforeEach(inject(function (_pcmProviderAddressFilter_, _pcmProviderNameOrFacilityFilter_, _utilityService_) {
        pcmProviderAddress = _pcmProviderAddressFilter_;
        pcmNameorfacility = _pcmProviderNameOrFacilityFilter_;
        mockUtilityService = _utilityService_;

    }));

    it('should filter address with', function () {
        spyOn(mockUtilityService, 'formatZipCode').andReturn("21044");
        var provider = {firstLinePracticeLocationAddress: "7175 Columbia Gateway", practiceLocationAddressCityName: "Columbia", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21044"};
        expect(pcmProviderAddress(provider)).toEqual("7175 Columbia Gateway, Columbia, MD, 21044");
        expect(mockUtilityService.formatZipCode).toHaveBeenCalledWith('21044');
    });

    it('should filter address without no address fields', function () {
        spyOn(mockUtilityService, 'formatZipCode').andReturn("");
        var provider1 = {firstLinePracticeLocationAddress: "", practiceLocationAddressCityName: "", practiceLocationAddressStateName: "", practiceLocationAddressPostalCode: ""};
        expect(pcmProviderAddress(provider1)).toEqual(", , , ");
        expect(mockUtilityService.formatZipCode).toHaveBeenCalledWith('');
    });

    it('should filter individual provider name ', function () {
        var provider = {firstName: "firstName", lastName: "lastName", entityType: "Individual", orgName: "Organization"};
        expect(pcmNameorfacility(provider)).toEqual("lastName,firstName");
    });

    it('should filter provider facility name ', function () {
        var provider = {firstName: "firstName", lastName: "lastName", entityType: "Organization", orgName: "Organization"};
        expect(pcmNameorfacility(provider)).toEqual("Organization");
    });

});