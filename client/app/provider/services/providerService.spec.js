/**
 * Created by tomson.ngassa on 10/14/2015.
 * Modified by cindy.ren on 6/13/2016.
 */

'use strict';

describe('app.providerService ', function () {
    var providerService, $httpBackend, resource, envService, scope, status, passed;

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
        secondLinePracticeLocationAddress: "BLALOCK 412",
    }];
    var emptyProvider = [];

    var providerSuccess = function (response) {
        passed = true;
        return response;
    };

    var providerError = function (response) {
        passed = false;
        return response;
    };

    beforeEach(module('app.provider'));
    beforeEach(module('app.config'));
    beforeEach(module('app.core'));

    beforeEach(inject(function(_$resource_, _envService_,
                               _providerService_, _$rootScope_, $injector){
        resource = _$resource_;
        envService = _envService_;
        providerService = _providerService_;
        scope = _$rootScope_.$new();
        $httpBackend = $injector.get('$httpBackend');

        passed = null;
        status = null;
    }));

    it('should add providers (addProvider)', function () {
        $httpBackend.expect('POST',"/pcm/patients/providers").respond(200, providerData.npi);
        providerService.addProvider(providerData.npi, providerSuccess, providerError);

        $httpBackend.flush();
        expect(passed).toBeTruthy();
    });

    xit('should delete Providers ', function () {
        $httpBackend.expect('DELETE','/pcm/patients/providers/111').respond(200, 111);
        providerService.deleteProvider(111, providerSuccess, providerError);
        $httpBackend.flush();
        expect(passed).toBeFalsy();
    });

    it('should lookup providers with successful backend call', function () {
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
        $httpBackend.expectGET('/pls/providers/pageNumber/9/usstate/usstateValue/city/cityValue/zipcode/zipcodeValue/gender/genderValue/phone/phoneValue/firstname/firstnameValue/lastname/lastnameValue/facilityname/facilitynameValue').respond(statusCodeReturnedFromBackend, {status: statusCodeReturnedFromBackend});
        $httpBackend.flush();
        expect(statusWhenSuccess).toEqual(statusCodeSuccess);
        expect(statusWhenError).toEqual(statusCodeNotSet);
    });


    it('should get error status when lookup provider backend call fails', function () {
        // Arrange
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
        providerService.lookupProviders(plsQueryParameters, page, function (response) {
            statusWhenSuccess = response.status;
        }, function (response) {
            statusWhenError = response.status;
        });

        // Assert
        $httpBackend.expectGET('/pls/providers/pageNumber/9/usstate/usstateValue/city/cityValue/zipcode/zipcodeValue/gender/genderValue/phone/phoneValue/firstname/firstnameValue/lastname/lastnameValue/facilityname/facilitynameValue').respond(statusCodeReturnedFromBackend, {status: statusCodeReturnedFromBackend});
        $httpBackend.flush();
        expect(statusWhenSuccess).toEqual(statusCodeNotSet);
        expect(statusWhenError).toEqual(statusCodeError);
    });

    it('should return true if providerLookupResult is undefined', function () {

        var providerLookupResult;

        expect(providerService.isEmptyLookupResult(providerLookupResult)).toEqual(true);
    });

    it('should return true if providerLookupResult.providers is undefined', function () {

        var providerLookupResult = {someProperty: 'somePropertyValue'};

        expect(providerService.isEmptyLookupResult(providerLookupResult)).toEqual(true);
    });

    it('should return true if providerLookupResult.providers is defined but empty', function () {

        var providerLookupResult = {someProperty: 'somePropertyValue', providers: []};

        expect(providerService.isEmptyLookupResult(providerLookupResult)).toEqual(true);
    });

    it('should return false if providerLookupResult.providers has at least one element', function () {

        var providerLookupResult = {
            someProperty: 'somePropertyValue',
            providers: [{someObjectPropert: 'someObjectPropertyValue'}]
        };

        expect(providerService.isEmptyLookupResult(providerLookupResult)).toEqual(false);
    });

    it('should verify if ', function () {

        var providerLookupResult = {
            someProperty: 'somePropertyValue',
            providers: [{someObjectPropert: 'someObjectPropertyValue'}]
        };

        expect(providerService.isEmptyLookupResult(providerLookupResult)).toEqual(false);
    });

    it('should verify provider in list of providers ', function () {
        expect(providerService.hasNpi(providerData, '1083949036')).toBeTruthy();
    });

    it('should verify provider in list of empty providers ', function () {

        expect(providerService.hasNpi(emptyProvider, '1083949036')).toBeFalsy();

        var providerData2 = {};
        expect(providerService.hasNpi(providerData2, '1083949036')).toBeFalsy();
    });

});
