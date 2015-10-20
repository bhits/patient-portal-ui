/**
 * Created by tomson.ngassa on 10/14/2015.
 */
'use strict';

describe('app.providerService  ', function () {
    var module;

    beforeEach(function () {
        module = angular.module("app.providerService");
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
            dependencies = module.value('app.providerService').requires;
        });

        it("should have ngResource as a dependency", function () {
            expect(hasModule('ngResource')).toEqual(true);
        });

        it("should have app.config as a dependency", function () {
            expect(hasModule('app.config')).toEqual(true);
        });
    });
});

describe('app.providerService ', function () {
    var ProviderServices, $httpBackend;

    beforeEach(module('app.providerService'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            ProviderServices = $injector.get('ProviderService');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should providers resource function', function () {
        expect(angular.isFunction(ProviderServices.getProviders())).toNotBe(null);
    });

    it('should add Providers', function () {
        $httpBackend.expectPOST('https://localhost:8443/pcm/patients/providers/11111').respond({status: 201});
        var status = ProviderServices.addProvider(
            11111,
            function (data) {
                status = data.status;
            },
            function (error) {
            });
        $httpBackend.flush();
        expect(status).toEqual(201);
    });

    it('should delete Providers ', function () {
        $httpBackend.expectDELETE('https://localhost:8443/pcm/patients/providers/11111').respond({status: 201});
        var status = ProviderServices.deleteProvider(
            11111,
            function (data) {
                status = data.status;
            },
            function (error) {
            });
        $httpBackend.flush();
        expect(status).toEqual(201);
    });

    it('should lookup providers with successful backend call', function () {
        // Arrange
        var statusCodeSuccess = 200;
        var statusCodeError = 500;
        var statusCodeNotSet = "STATUS_NOT_SET";
        var statusCodeReturnedFromBackend = statusCodeSuccess;
        var page = 10;
        var plsQueryParameters = {
            usstate: "usstateValue",
            city: "cityValue",
            zipcode: "zipcodeValue",
            lastname: "lastnameValue",
            firstname: "firstnameValue",
            gender: "genderValue",
            phone: "phoneValue",
            facilityname: "facilitynameValue"
        };

        // Act
        var statusWhenSuccess = statusCodeNotSet;
        var statusWhenError = statusCodeNotSet;
        ProviderServices.lookupProviders(plsQueryParameters, page, function (response) {
            statusWhenSuccess = response.status;
        }, function (response) {
            statusWhenError = response.status;
        });

        // Assert
        $httpBackend.expectGET('http://localhost:8080/pls/providers/pageNumber/' + page + "/usstate/usstateValue/city/cityValue/zipcode/zipcodeValue/gender/genderValue/phone/phoneValue/firstname/firstnameValue/lastname/lastnameValue/facilityname/facilitynameValue").respond(statusCodeReturnedFromBackend, {status: statusCodeReturnedFromBackend});
        $httpBackend.flush();
        expect(statusWhenSuccess).toEqual(statusCodeSuccess);
        expect(statusWhenError).toEqual(statusCodeNotSet);
    });


    it('should get error status when lookup provider backend call fails', function () {
        // Arrange
        var statusCodeSuccess = 200;
        var statusCodeError = 500;
        var statusCodeNotSet = "STATUS_NOT_SET";
        var statusCodeReturnedFromBackend = statusCodeError;
        var page = 10;
        var plsQueryParameters = {
            usstate: "usstateValue",
            city: "cityValue",
            zipcode: "zipcodeValue",
            lastname: "lastnameValue",
            firstname: "firstnameValue",
            gender: "genderValue",
            phone: "phoneValue",
            facilityname: "facilitynameValue"
        };

        // Act
        var statusWhenSuccess = statusCodeNotSet;
        var statusWhenError = statusCodeNotSet;
        ProviderServices.lookupProviders(plsQueryParameters, page, function (response) {
            statusWhenSuccess = response.status;
        }, function (response) {
            statusWhenError = response.status;
        });

        // Assert
        $httpBackend.expectGET('http://localhost:8080/pls/providers/pageNumber/' + page + "/usstate/usstateValue/city/cityValue/zipcode/zipcodeValue/gender/genderValue/phone/phoneValue/firstname/firstnameValue/lastname/lastnameValue/facilityname/facilitynameValue").respond(statusCodeReturnedFromBackend, {status: statusCodeReturnedFromBackend});
        $httpBackend.flush();
        expect(statusWhenSuccess).toEqual(statusCodeNotSet);
        expect(statusWhenError).toEqual(statusCodeError);
    });

    it('should return true if providerLookupResult is undefined', function () {
        // Arrange
        var providerLookupResult;
        var expectedResult = true;

        // Act
        var result = ProviderServices.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it('should return true if providerLookupResult.providers is undefined', function () {
        // Arrange
        var providerLookupResult = {someProperty: 'somePropertyValue'};
        var expectedResult = true;

        // Act
        var result = ProviderServices.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it('should return true if providerLookupResult.providers is defined but empty', function () {
        // Arrange
        var providerLookupResult = {someProperty: 'somePropertyValue', providers: []};
        var expectedResult = true;

        // Act
        var result = ProviderServices.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it('should return false if providerLookupResult.providers has at least one element', function () {
        // Arrange
        var providerLookupResult = {
            someProperty: 'somePropertyValue',
            providers: [{someObjectPropert: 'someObjectPropertyValue'}]
        };
        var expectedResult = false;

        // Act
        var result = ProviderServices.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it('should verify if ', function () {
        // Arrange
        var providerLookupResult = {
            someProperty: 'somePropertyValue',
            providers: [{someObjectPropert: 'someObjectPropertyValue'}]
        };
        var expectedResult = false;

        // Act
        var result = ProviderServices.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it('should verify provider in list of providers ', function () {
        var providerData = [{deletable: false, entityType: "Individual", firstLinePracticeLocationAddress: "600 N WOLFE ST", firstName: "MONICA", lastName: "VAN DONGEN", npi: "1083949036", orgName: null, practiceLocationAddressCityName: "BALTIMORE", practiceLocationAddressCountryCode: "US", practiceLocationAddressPostalCode: "212870005", practiceLocationAddressStateName: "MD", practiceLocationAddressTelephoneNumber: "4106141937", providerTaxonomyDescription: "Family", secondLinePracticeLocationAddress: "BLALOCK 412"}];
        expect(ProviderServices.hasNpi(providerData, '1083949036')).toBeTruthy();

        var providerData1 = [];
        expect(ProviderServices.hasNpi(providerData1, '1083949036')).toBeFalsy();

        var providerData2 = {};
        expect(ProviderServices.hasNpi(providerData2, '1083949036')).toBeFalsy();
    });



});
