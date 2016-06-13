/**
 * Created by tomson.ngassa on 10/14/2015.
 * Modified by cindy.ren on 6/13/2016.
 */
'use strict';


xdescribe('app.providerService ', function () {
    var providerService, $httpBackend, resource, envService, scope, controller;

    beforeEach(module('app.provider'));
    beforeEach(module('app.config'));

    // beforeEach(function () {
    //     angular.mock.inject(function ($injector) {
    //         $httpBackend = $injector.get('$httpBackend');
    //         $resource = $injector.get('$resource');
    //         envService = $injector.get('envService');
    //         providerService = $injector.get('providerService');
    //     });
    // });

    beforeEach(inject(function(_$httpBackend_, _$resource_, _envService_,
                               _providerService_, _$rootScope_, _$controller_){
        $httpBackend = _$httpBackend_;
        resource = _$resource_;
        envService = _envService_;
        providerService = _providerService_;
        scope = _$rootScope_.$new();


    }));

    // afterEach(function () {
    //     $httpBackend.verifyNoOutstandingExpectation();
    //     $httpBackend.verifyNoOutstandingRequest();
    // });

    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });

    it('should providers resource function', function () {
        expect(angular.isFunction(providerService.getProvidersResource())).not.toBe(null);
    });

    xit('should add Providers', function () {
        $httpBackend.when('POST', 'https://localhost:8443/pcm/patients/providers/11111').respond({status: 201});
        var status = providerService.addProvider(
            11111,
            function (data) {
                status = data.status;
            },
            function (error) {
            });
        $httpBackend.flush();
        expect(status).toEqual(201);
    });

    xit('should delete Providers ', function () {
        $httpBackend.expectDELETE('https://localhost:8443/pcm/patients/providers/11111').respond({status: 201});
        var status = providerService.deleteProvider(
            11111,
            function (data) {
                status = data.status;
            },
            function (error) {
            });
        $httpBackend.flush();
        expect(status).toEqual(201);
    });

    xit('should lookup providers with successful backend call', function () {
        // Arrange
        var statusCodeSuccess = 200;
        var statusCodeError = 500;
        var statusCodeNotSet = "STATUS_NOT_SET";
        var statusCodeReturnedFromBackend = statusCodeSuccess;
        var page = 10;
        var pageForBackendCall = page - 1;
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
        providerService.lookupProviders(plsQueryParameters, page, function (response) {
            statusWhenSuccess = response.status;
        }, function (response) {
            statusWhenError = response.status;
        });

        // Assert
        $httpBackend.expectGET('http://localhost:8080/pls/providers/pageNumber/' + pageForBackendCall + "/usstate/usstateValue/city/cityValue/zipcode/zipcodeValue/gender/genderValue/phone/phoneValue/firstname/firstnameValue/lastname/lastnameValue/facilityname/facilitynameValue").respond(statusCodeReturnedFromBackend, {status: statusCodeReturnedFromBackend});
        $httpBackend.flush();
        expect(statusWhenSuccess).toEqual(statusCodeSuccess);
        expect(statusWhenError).toEqual(statusCodeNotSet);
    });


    xit('should get error status when lookup provider backend call fails', function () {
        // Arrange
        var statusCodeSuccess = 200;
        var statusCodeError = 500;
        var statusCodeNotSet = "STATUS_NOT_SET";
        var statusCodeReturnedFromBackend = statusCodeError;
        var page = 10;
        var pageForBackendCall = page - 1;
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
        providerService.lookupProviders(plsQueryParameters, page, function (response) {
            statusWhenSuccess = response.status;
        }, function (response) {
            statusWhenError = response.status;
        });

        // Assert
        $httpBackend.expectGET('http://localhost:8080/pls/providers/pageNumber/' + pageForBackendCall + "/usstate/usstateValue/city/cityValue/zipcode/zipcodeValue/gender/genderValue/phone/phoneValue/firstname/firstnameValue/lastname/lastnameValue/facilityname/facilitynameValue").respond(statusCodeReturnedFromBackend, {status: statusCodeReturnedFromBackend});
        $httpBackend.flush();
        expect(statusWhenSuccess).toEqual(statusCodeNotSet);
        expect(statusWhenError).toEqual(statusCodeError);
    });

    xit('should return true if providerLookupResult is undefined', function () {
        // Arrange
        var providerLookupResult;
        var expectedResult = true;

        // Act
        var result = providerService.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    xit('should return true if providerLookupResult.providers is undefined', function () {
        // Arrange
        var providerLookupResult = {someProperty: 'somePropertyValue'};
        var expectedResult = true;

        // Act
        var result = providerService.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    xit('should return true if providerLookupResult.providers is defined but empty', function () {
        // Arrange
        var providerLookupResult = {someProperty: 'somePropertyValue', providers: []};
        var expectedResult = true;

        // Act
        var result = providerService.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    xit('should return false if providerLookupResult.providers has at least one element', function () {
        // Arrange
        var providerLookupResult = {
            someProperty: 'somePropertyValue',
            providers: [{someObjectPropert: 'someObjectPropertyValue'}]
        };
        var expectedResult = false;

        // Act
        var result = providerService.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    xit('should verify if ', function () {
        // Arrange
        var providerLookupResult = {
            someProperty: 'somePropertyValue',
            providers: [{someObjectPropert: 'someObjectPropertyValue'}]
        };
        var expectedResult = false;

        // Act
        var result = providerService.isEmptyLookupResult(providerLookupResult);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    xit('should verify provider in list of providers ', function () {
        var providerData = [{
            deletable: false,
            entityType: "Individual",
            firstLinePracticeLocationAddress: "600 N WOLFE ST",
            firstName: "MONICA",
            lastName: "VAN DONGEN",
            npi: "1083949036",
            orgName: null,
            practiceLocationAddressCityName: "BALTIMORE",
            practiceLocationAddressCountryCode: "US",
            practiceLocationAddressPostalCode: "212870005",
            practiceLocationAddressStateName: "MD",
            practiceLocationAddressTelephoneNumber: "4106141937",
            providerTaxonomyDescription: "Family",
            secondLinePracticeLocationAddress: "BLALOCK 412"
        }];
        expect(providerService.hasNpi(providerData, '1083949036')).toBeTruthy();
    });

    xit('should verify provider in list of empty providers ', function () {
        var providerData1 = [];
        expect(providerService.hasNpi(providerData1, '1083949036')).toBeFalsy();

        var providerData2 = {};
        expect(providerService.hasNpi(providerData2, '1083949036')).toBeFalsy();
    });

});
