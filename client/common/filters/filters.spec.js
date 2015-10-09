/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

xdescribe('app.filtersModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.filtersModule");
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
            dependencies = module.value('app.filtersModule').requires;
        });

    });
});

describe('app.filter ', function () {

    var address, nameorfacility;

    beforeEach(module('app.filtersModule'));

    beforeEach(inject(function (_addressFilter_, _nameorfacilityFilter_) {
        address = _addressFilter_;
        nameorfacility = _nameorfacilityFilter_;
    }));

    it('should filter address ', function () {

        var provider = {firstLinePracticeLocationAddress: "7175 Columbia Gateway", practiceLocationAddressCityName: "Columbia", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21044"};
        expect(address(provider)).toEqual("7175 Columbia Gateway, Columbia, MD, 21044");

        var provider1 = {firstLinePracticeLocationAddress: "7175 Columbia Gateway", practiceLocationAddressCityName: "", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21044"};
        expect(address(provider1)).toEqual("7175 Columbia Gateway, , MD, 21044");

        var provider2 = {firstLinePracticeLocationAddress: "", practiceLocationAddressCityName: "", practiceLocationAddressStateName: "", practiceLocationAddressPostalCode: ""};
        expect(address(provider2)).toEqual(", , , ");
    });

    it('should return first name and last name for Individual provider or facility name for orgnization provider', function () {

        var provider = {firstName: "firstName", lastName: "lastName", entityType: "Individual"};
        expect(nameorfacility(provider)).toEqual("lastName,firstName");

        var provider1 = {orgName: "orgName", entityType: "Organization"};
        expect(nameorfacility(provider1)).toEqual("orgName");
    });

});