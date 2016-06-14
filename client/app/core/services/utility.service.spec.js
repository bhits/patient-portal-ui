/**
 * Created by tomson.ngassa on 7/20/2015.
 * Modified by cindy.ren on 6/14/2016
 */

'use strict';

describe('app.utilityService ', function () {
    var utilityService, $location, $anchorScroll, $window, envService;

    var npi1 = [111, 333], npi2 = [222, 444];
    var dummyEmptyValue;
    var dummyValue = {entityType: 'Individual', npi: 111};
    var dummyValue2 = {entityType: 'Organization', npi: 222};
    var dummyProviderList = [dummyValue, dummyValue2];

    beforeEach(module('app.core'));
    beforeEach(module('app.config'));

    beforeEach(inject(function (_utilityService_, _$location_, _$anchorScroll_,
                                _$window_, _envService_) {
        utilityService = _utilityService_;
        $location = _$location_;
        $anchorScroll = _$anchorScroll_;
        $window = _$window_;
        envService = _envService_;
    }));

    beforeEach(function () {
        dummyEmptyValue = undefined;
        dummyProviderList = [dummyValue, dummyValue2];
    });

    it('should return current year', function () {
        expect(utilityService.getYear()).toBeTruthy(new Date().getFullYear());
    });

    it('should test redirectTo function', function () {
        utilityService.redirectTo('path');
        expect($location.path()).toBe('/path');
    });

    it('should test isUnDefinedOrNull function', function () {
        expect(utilityService.isUnDefinedOrNull(dummyEmptyValue)).toBeTruthy();
        dummyEmptyValue = null;
        expect(utilityService.isUnDefinedOrNull(dummyEmptyValue)).toBeTruthy();
        expect(utilityService.isUnDefinedOrNull(dummyValue)).toBeFalsy();
    });

    it('should test isDefinedAndNotNull function', function () {
        expect(utilityService.isDefinedAndNotNull(dummyEmptyValue)).toBeFalsy();
        dummyEmptyValue = null;
        expect(utilityService.isDefinedAndNotNull(dummyEmptyValue)).toBeFalsy();
        expect(utilityService.isDefinedAndNotNull(dummyValue)).toBeTruthy();
    });

    it('should have setShowHealthInformationMenu function', function () {
        expect(angular.isFunction(utilityService.setShowHealthInformationMenu)).toBeTruthy();
    });

    it('should setShowHealthInformationMenu value', function () {
        utilityService.setShowHealthInformationMenu(true);
        expect(utilityService.getShowHealthInformationMenu()).toBeTruthy();
    });

    it('should scroll to a position in a page', function () {
        spyOn($location, 'hash').and.callThrough();
        utilityService.scrollTo("#home");
        expect($location.hash()).toEqual("#home");
        expect($location.hash).toHaveBeenCalledWith("#home");
    }); //scrollTo = goTo

    it('should return true if string is defined/is a string/length>0 and false if not', function () {
        expect(utilityService.hasString("string")).toBeTruthy();
        expect(utilityService.hasString("")).toBeFalsy();
        expect(utilityService.hasString(dummyEmptyValue)).toBeFalsy();
        expect(utilityService.hasString(null)).toBeFalsy();
    });

    it('should return first letter in string', function () {
        expect(utilityService.startsWith("an example of a string", "a")).toBeTruthy();
        expect(utilityService.startsWith("an example of a string", "s")).toBeFalsy();
        expect(utilityService.startsWith("", "s")).toBeFalsy();
        expect(utilityService.startsWith(null, "s")).toBeFalsy();
        expect(utilityService.startsWith(undefined, "s")).toBeFalsy();
    });

    it('should return last letter in string', function () {
        expect(utilityService.endsWith("an example of a string", "g")).toBeTruthy();
        expect(utilityService.endsWith("an example of a string", "s")).toBeFalsy();
        expect(utilityService.endsWith("", "s")).toBeFalsy();
        expect(utilityService.endsWith(null, "s")).toBeFalsy();
        expect(utilityService.endsWith(undefined, "s")).toBeFalsy();
    });

    it('should generate a random string', function () {
        var random = utilityService.randomAlphanumeric(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
        expect(random.length).toBe(10);
        random = utilityService.randomAlphanumeric(0, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
        expect(random).toBe('');
    });

    it('should test that passed in array is not empty', function () {
        expect(utilityService.isNotEmpty([0, 1, 2, 3])).toBeTruthy();
        expect(utilityService.isNotEmpty(dummyEmptyValue)).toBeFalsy();
        expect(utilityService.isNotEmpty(null)).toBeFalsy();
        expect(utilityService.isNotEmpty([])).toBeFalsy();
    });

    it('should format passed zipcode', function () {
        expect(utilityService.formatZipCode(21043)).toBe("21043");
        expect(utilityService.formatZipCode(21043654)).toBe("21043-654");
        expect(utilityService.formatZipCode(210)).toBe("210");
    });

    it('should format passed date object', function () {
        expect(utilityService.formatDate("2015-03-25 GMT-0400 (Eastern Daylight Time)")).toBe("03/25/2015");
        expect(utilityService.formatDate("Mar 5 2015")).toBe("03/05/2015");
    });

    it('should test if provider is an Individual', function () {
        expect(utilityService.isIndividualProvider(dummyEmptyValue)).toBeFalsy();
        expect(utilityService.isIndividualProvider(dummyValue)).toBeTruthy();
        expect(utilityService.isIndividualProvider(dummyValue2)).toBeFalsy();
    });

    it('should test if provider is an Organization', function () {
        expect(utilityService.isOrganizationProvider(dummyEmptyValue)).toBeFalsy();
        expect(utilityService.isOrganizationProvider(dummyValue2)).toBeTruthy();
        expect(utilityService.isOrganizationProvider(dummyValue)).toBeFalsy();
    });

    it('should find the correct provider by the npi from the list passed', function () {
        expect(utilityService.getProviderByNPI(dummyEmptyValue, 111)).toEqual({});
        expect(utilityService.getProviderByNPI(undefined, 111)).toEqual({});
        expect(utilityService.getProviderByNPI(dummyProviderList, 111)).toBe(dummyValue);
        expect(utilityService.getProviderByNPI(dummyProviderList, 333)).toEqual({});
    });

    it('should find multiple providers based on list of NPI values', function () {
        expect(utilityService.getProviderByNpis(dummyEmptyValue, npi1, npi2)).toEqual([]);
        expect(utilityService.getProviderByNpis(undefined, npi1, npi2)).toEqual([]);
        expect(utilityService.getProviderByNpis(dummyProviderList, npi1, npi2)).toEqual([dummyValue, dummyValue2]);
        expect(utilityService.getProviderByNpis(dummyProviderList, [555, 666], [777, 888])).toEqual([]);
    });

    it('should get NPI values from only Individual providers', function () {
        expect(utilityService.getIndividualProvidersNpi(dummyEmptyValue)).toEqual([]);
        expect(utilityService.getIndividualProvidersNpi(undefined)).toEqual([]);
        expect(utilityService.getIndividualProvidersNpi(dummyProviderList)).toEqual([111]);
        dummyProviderList = [dummyValue2, dummyValue2];
        expect(utilityService.getIndividualProvidersNpi(dummyProviderList)).toEqual([]);
    });

    it('should get NPI values from only Organization providers', function () {
        expect(utilityService.getOrganizationalProvidersNpi(dummyEmptyValue)).toEqual([]);
        expect(utilityService.getOrganizationalProvidersNpi(undefined)).toEqual([]);
        expect(utilityService.getOrganizationalProvidersNpi(dummyProviderList)).toEqual([222]);
        dummyProviderList = [dummyValue, dummyValue];
        expect(utilityService.getOrganizationalProvidersNpi(dummyProviderList)).toEqual([]);
    });

    it('should test if API is secure', function(){
        var url = '/pcm/patients';
        expect(utilityService.isSecuredApi(url)).toBeTruthy();
        url = '/phr';
        expect(utilityService.isSecuredApi(url)).toBeTruthy();
        url = '/trypolicy';
        expect(utilityService.isSecuredApi(url)).toBeTruthy();
        url = '/uaa/userinfo';
        expect(utilityService.isSecuredApi(url)).toBeTruthy();
        url = '/pls/providers';
        expect(utilityService.isSecuredApi(url)).toBeFalsy();
        expect(utilityService.isSecuredApi(dummyEmptyValue)).toBeFalsy();
    });

    it('should format passed number', function () {
        expect(utilityService.digitFormat(21043, 5)).toBe("21043");
        expect(utilityService.digitFormat(21043654, 5)).toBe("21043654");
        expect(utilityService.digitFormat(210, 5)).toBe("00210");
        expect(utilityService.digitFormat(dummyEmptyValue, dummyEmptyValue)).toBe("");
    });

    it('should test if input date is valid', function(){
        // expect(utilityService.isValidDate("03/25/2015")).toBeTruthy();
        // expect(utilityService.isValidDate("03/05/2015")).toBeTruthy();
        // //format is MM/DD/YYYY
        // expect(utilityService.isValidDate("03/5/2015")).toBeFalsy();
        // //(month < 1 || month > 12)
        expect(utilityService.isValidDate("00/05/2015")).toBeFalsy();
        // expect(utilityService.isValidDate("13/05/2015")).toBeFalsy();
        // //(day < 1 || day > 31)
        // expect(utilityService.isValidDate("02/00/2015")).toBeFalsy();
        // expect(utilityService.isValidDate("02/32/2015")).toBeFalsy();
        // //((month===4 || month===6 || month===9 || month===11) && day===31)
        expect(utilityService.isValidDate("04/31/2015")).toBeFalsy();
        // expect(utilityService.isValidDate("06/31/2015")).toBeFalsy();
        // expect(utilityService.isValidDate("09/31/2015")).toBeFalsy();
        // expect(utilityService.isValidDate("11/31/2015")).toBeFalsy();
        // //check for february 29th
        // expect(utilityService.isValidDate("02/29/2015")).toBeFalsy();
        // expect(utilityService.isValidDate("02/29/2016")).toBeTruthy();
        //
        //
        // expect(utilityService.isValidDate("Mar 5 2015")).toBeFalsy();
    });

});