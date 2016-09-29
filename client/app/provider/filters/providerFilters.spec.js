/**
 * Created by tomson.ngassa on 7/20/2015.
 * Modified by cindy.ren on 6/13/2016
 */

'use strict';

describe('app.providerFiltersModule ', function () {

    var pcmProviderAddress, pcmNameorfacility, utilityService, plsName, plsAddress;

    beforeEach(module('app.provider'));
    beforeEach(module('app.config'));

    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });

    beforeEach(inject(function (_pcmProviderAddressFilter_, _pcmProviderNameOrFacilityFilter_, _utilityService_, _plsNameFilter_, _plsAddressFilter_) {
        pcmProviderAddress = _pcmProviderAddressFilter_;
        pcmNameorfacility = _pcmProviderNameOrFacilityFilter_;
        utilityService = _utilityService_;
        plsName = _plsNameFilter_;
        plsAddress = _plsAddressFilter_;
    }));

    it('should filter address with', function () {
        spyOn(utilityService, 'formatZipCode').and.returnValue("21044");
        var provider = {
            firstLinePracticeLocationAddress: "7175 Columbia Gateway",
            practiceLocationAddressCityName: "Columbia",
            practiceLocationAddressStateName: "MD",
            practiceLocationAddressPostalCode: "21044"
        };
        expect(pcmProviderAddress(provider)).toEqual("7175 Columbia Gateway, Columbia, MD, 21044");
        expect(utilityService.formatZipCode).toHaveBeenCalledWith('21044');
    });

    it('should filter address without no address fields', function () {
        spyOn(utilityService, 'formatZipCode').and.returnValue("");
        var provider1 = {
            firstLinePracticeLocationAddress: "",
            practiceLocationAddressCityName: "",
            practiceLocationAddressStateName: "",
            practiceLocationAddressPostalCode: ""
        };
        expect(pcmProviderAddress(provider1)).toEqual(", , , ");
        expect(utilityService.formatZipCode).toHaveBeenCalledWith('');
    });

    it('should filter individual provider name ', function () {
        var provider = {
            firstName: "firstName",
            lastName: "lastName",
            entityType: "Individual",
            orgName: "Organization"
        };
        expect(pcmNameorfacility(provider)).toEqual("lastName,firstName");
    });

    it('should filter provider facility name ', function () {
        var provider = {
            firstName: "firstName",
            lastName: "lastName",
            entityType: "Organization",
            orgName: "Organization"
        };
        expect(pcmNameorfacility(provider)).toEqual("Organization");
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
        var expectedResult = 'firstName lastName';

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
        var expectedResult = 'firstName lastName';

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
        spyOn(utilityService, 'hasString').and.returnValue(true);
        spyOn(utilityService, 'formatZipCode').and.returnValue(formattedZipCode);
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
        spyOn(utilityService, 'hasString').and.returnValue(false);
        spyOn(utilityService, 'formatZipCode').and.returnValue(formattedZipCode);
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