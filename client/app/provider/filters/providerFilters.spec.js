/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.providerFiltersModule ', function () {
    var module;

    beforeEach(function () {
        module = angular.module("app.providerFiltersModule");
    });

    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });

    describe("Dependencies:", function () {

        var dependencies;

        var hasModule = function (m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function () {
            dependencies = module.value('app.providerFiltersModule').requires;
        });

        it("should have app.servicesModule as a dependency", function () {
            expect(hasModule('app.servicesModule')).toEqual(true);
        });
    });
});

describe('app.providerFiltersModule ', function () {

    var pcmProviderAddress, pcmNameorfacility, utilityService, plsName, plsAddress;

    beforeEach(module('app.servicesModule'));
    beforeEach(module('app.providerFiltersModule'));

    beforeEach(inject(function (_pcmProviderAddressFilter_, _pcmProviderNameOrFacilityFilter_, _utilityService_, _plsNameFilter_, _plsAddressFilter_) {
        pcmProviderAddress = _pcmProviderAddressFilter_;
        pcmNameorfacility = _pcmProviderNameOrFacilityFilter_;
        utilityService = _utilityService_;
        plsName = _plsNameFilter_;
        plsAddress = _plsAddressFilter_;
    }));

    //it('should filter address ', function () {
    //
    //    //var provider = {firstLinePracticeLocationAddress: "7175 Columbia Gateway", practiceLocationAddressCityName: "Columbia", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21044"};
    //    //expect(pcmProviderAddress(provider)).toEqual("7175 Columbia Gateway, Columbia, MD, 21044");
    //    //
    //    //var provider1 = {firstLinePracticeLocationAddress: "7175 Columbia Gateway", practiceLocationAddressCityName: "", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21044"};
    //    //expect(pcmProviderAddress(provider1)).toEqual("7175 Columbia Gateway, , MD, 21044");
    //    //
    //    //var provider2 = {firstLinePracticeLocationAddress: "", practiceLocationAddressCityName: "", practiceLocationAddressStateName: "", practiceLocationAddressPostalCode: ""};
    //    //expect(pcmProviderAddress(provider2)).toEqual(", , , ");
    //});

    //xit('should return first name and last name for Individual provider or facility name for orgnization provider', function () {
    //    //var provider = {firstName: "firstName", lastName: "lastName", entityType: "Individual"};
    //    //expect(pcmNameorfacility(provider)).toEqual("lastName,firstName");
    //    //var provider1 = {orgName: "orgName", entityType: "Organization"};
    //    //expect(pcmNameorfacility(provider1)).toEqual("orgName");
    //
    //});

    it('should return empty string while filtering PLS name with invalid structure', function () {
        // Arrange
        var provider = 'someInvalidStructure';
        var expectedResult = '';

        // Act & Assert
        expect(plsName(provider)).toEqual(expectedResult);
    });

    it('should return empty string while filtering PLS name with missing entityType property', function () {
        // Arrange
        var provider = {
            providerLastName: 'lastName',
            providerFirstName: 'firstName',
            providerMiddleName: 'middleName',
            providerOrganizationName: 'organizationName'
        };
        var expectedResult = '';

        // Act & Assert
        expect(plsName(provider)).toEqual(expectedResult);
    });

    it('should return empty string while filtering PLS name with entityType property value is invalid', function () {
        // Arrange
        var provider = {
            entityType: 'InvalidEntityTypeValue',
            providerLastName: 'lastName',
            providerFirstName: 'firstName',
            providerMiddleName: 'middleName',
            providerOrganizationName: 'organizationName'
        };
        var expectedResult = '';

        // Act & Assert
        expect(plsName(provider)).toEqual(expectedResult);
    });

    it('should filter PLS name from individual PLS provider object with middle name', function () {
        // Arrange
        var provider = {
            entityType: 'Individual',
            providerLastName: 'lastName',
            providerFirstName: 'firstName',
            providerMiddleName: 'middleName'
        };
        var expectedResult = 'lastName, firstName middleName';

        // Act & Assert
        expect(plsName(provider)).toEqual(expectedResult);
    });

    it('should filter PLS name from individual PLS provider object without middle name', function () {
        // Arrange
        var provider = {
            entityType: 'Individual',
            providerLastName: 'lastName',
            providerFirstName: 'firstName'
        };
        var expectedResult = 'lastName, firstName';

        // Act & Assert
        expect(plsName(provider)).toEqual(expectedResult);
    });

    it('should filter PLS name from organizational PLS provider object', function () {
        // Arrange
        var provider = {
            entityType: 'Organization',
            providerOrganizationName: 'organizationName'
        };
        var expectedResult = 'organizationName';

        // Act & Assert
        expect(plsName(provider)).toEqual(expectedResult);
    });

    it('should filter PLS address', function () {
        // Arrange
        var formattedZipCode = '20770-2033';
        var provider = {
            providerFirstLineBusinessPracticeLocationAddress: "FirstLine",
            providerSecondLineBusinessPracticeLocationAddress: "SecondLine",
            providerBusinessPracticeLocationAddressCityName: "City",
            providerBusinessPracticeLocationAddressStateName: "State",
            providerBusinessPracticeLocationAddressPostalCode: "207702033"
        };
        spyOn(utilityService, 'hasString').andReturn(true);
        spyOn(utilityService, 'formatZipCode').andReturn(formattedZipCode);
        var expectedResult = 'FirstLine, SecondLine, City, State, 20770-2033';

        // Act & Assert
        expect(plsAddress(provider)).toEqual(expectedResult);
        expect(utilityService.hasString).toHaveBeenCalledWith(provider.providerFirstLineBusinessPracticeLocationAddress);
        expect(utilityService.hasString).toHaveBeenCalledWith(provider.providerSecondLineBusinessPracticeLocationAddress);
        expect(utilityService.hasString).toHaveBeenCalledWith(provider.providerBusinessPracticeLocationAddressCityName);
        expect(utilityService.hasString).toHaveBeenCalledWith(provider.providerBusinessPracticeLocationAddressStateName);
        expect(utilityService.hasString).toHaveBeenCalledWith(formattedZipCode);
        expect(utilityService.formatZipCode).toHaveBeenCalledWith(provider.providerBusinessPracticeLocationAddressPostalCode);
    });

    it('should filter PLS address leaving empty string if hasString returns false', function () {
        // Arrange
        var formattedZipCode = '20770-2033';
        var provider = {
            providerFirstLineBusinessPracticeLocationAddress: "FirstLine",
            providerSecondLineBusinessPracticeLocationAddress: "SecondLine",
            providerBusinessPracticeLocationAddressCityName: "City",
            providerBusinessPracticeLocationAddressStateName: "State",
            providerBusinessPracticeLocationAddressPostalCode: "207702033"
        };
        spyOn(utilityService, 'hasString').andReturn(false);
        spyOn(utilityService, 'formatZipCode').andReturn(formattedZipCode);
        var expectedResult = '';

        // Act & Assert
        expect(plsAddress(provider)).toEqual(expectedResult);
        expect(utilityService.hasString).toHaveBeenCalledWith(provider.providerFirstLineBusinessPracticeLocationAddress);
        expect(utilityService.hasString).toHaveBeenCalledWith(provider.providerSecondLineBusinessPracticeLocationAddress);
        expect(utilityService.hasString).toHaveBeenCalledWith(provider.providerBusinessPracticeLocationAddressCityName);
        expect(utilityService.hasString).toHaveBeenCalledWith(provider.providerBusinessPracticeLocationAddressStateName);
        expect(utilityService.hasString).toHaveBeenCalledWith(formattedZipCode);
        expect(utilityService.formatZipCode).toHaveBeenCalledWith(provider.providerBusinessPracticeLocationAddressPostalCode);
    });
});