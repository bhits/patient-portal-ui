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

xdescribe('app.providerFiltersModule ', function () {

    var pcmProviderAddress, pcmNameorfacility, utilityService;

    beforeEach(module('app.servicesModule'));
    beforeEach(module('app.providerFiltersModule'));

    beforeEach(inject(function (_pcmProviderAddress_, _pcmProviderNameOrFacility_, _utilityService_) {
        pcmProviderAddress = _pcmProviderAddress_;
        pcmNameorfacility = _pcmProviderNameOrFacility_;
        utilityService = _utilityService_;

    }));

    it('should filter address ', function () {

        //var provider = {firstLinePracticeLocationAddress: "7175 Columbia Gateway", practiceLocationAddressCityName: "Columbia", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21044"};
        //expect(pcmProviderAddress(provider)).toEqual("7175 Columbia Gateway, Columbia, MD, 21044");
        //
        //var provider1 = {firstLinePracticeLocationAddress: "7175 Columbia Gateway", practiceLocationAddressCityName: "", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21044"};
        //expect(pcmProviderAddress(provider1)).toEqual("7175 Columbia Gateway, , MD, 21044");
        //
        //var provider2 = {firstLinePracticeLocationAddress: "", practiceLocationAddressCityName: "", practiceLocationAddressStateName: "", practiceLocationAddressPostalCode: ""};
        //expect(pcmProviderAddress(provider2)).toEqual(", , , ");
    });

    xit('should return first name and last name for Individual provider or facility name for orgnization provider', function () {
        //var provider = {firstName: "firstName", lastName: "lastName", entityType: "Individual"};
        //expect(pcmNameorfacility(provider)).toEqual("lastName,firstName");
        //var provider1 = {orgName: "orgName", entityType: "Organization"};
        //expect(pcmNameorfacility(provider1)).toEqual("orgName");

    });

});