'use strict';
/**
 * Created by tomson.ngassa on 7/20/2015.
 */

xdescribe('app.servicesModule  ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.servicesModule");
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
            dependencies = module.value('app.servicesModule').requires;
        });

        it("should be registered", function() {
            expect(module).not.toEqual(null);
        });
    });
});


xdescribe('app.servicesModule ', function() {
    var utilityService, location;

    beforeEach(module('app.servicesModule'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            utilityService = $injector.get('utilityService');
            location = $injector.get('$location');
        });
    });

    xit('should have getCurrentDate function', function () {
        expect(angular.isFunction(utilityService.getYear)).toBeTruthy();
    });

    xit('should return a today\'s date', function () {
        var year = new Date().getFullYear();
        expect(utilityService.getYear()).toEqual(year);
    });

    it('should have redirectTo function', function () {
        expect(angular.isFunction(utilityService.redirectTo)).toBeTruthy();
    });

    it('should have redirectTo ', function () {
        utilityService.redirectTo('/fe/login');
        expect(location.url()).toEqual("/fe/login");
    });

    it('should have isUnDefinedOrNull function', function () {
        expect(angular.isFunction(utilityService.isUnDefinedOrNull)).toBeTruthy();
    });

    it('should be UnDefined or Null variable', function () {
        var test = null;
        expect(utilityService.isUnDefinedOrNull(test)).toBeTruthy();
        var test1;
        expect(utilityService.isUnDefinedOrNull(test1)).toBeTruthy();
    });

    it('should have isDefinedAndNotNull function', function () {
        expect(angular.isFunction(utilityService.isDefinedAndNotNull)).toBeTruthy();
    });

    it('should be Defined And Not Null', function () {
        var test;
        expect(utilityService.isDefinedAndNotNull(test)).toBeFalsy();
        var test1 = null;
        expect(utilityService.isDefinedAndNotNull(test1)).toBeFalsy();

        var test2 = "hello";
        expect(utilityService.isDefinedAndNotNull(test2)).toBeTruthy();
    });

    it('should have setShowHealthInformationMenu function', function () {
        expect(angular.isFunction(utilityService.setShowHealthInformationMenu)).toBeTruthy();
    });

    it('should setShowHealthInformationMenu value', function () {
        utilityService.setShowHealthInformationMenu(true);
        expect(utilityService.getShowHealthInformationMenu()).toBeTruthy();
    });

    it('should have getShowHealthInformationMenu function', function () {
        expect(angular.isFunction(utilityService.getShowHealthInformationMenu)).toBeTruthy();
    });

    it('should scroll to a position in a page', function () {
        utilityService.scrollTo("#home");
        expect(location.hash()).toEqual("#home");
    });

});