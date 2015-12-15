/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

xdescribe('app.filtersModule ', function () {
    var module;

    beforeEach(function () {
        module = angular.module("app.filtersModule");
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
            dependencies = module.value('app.filtersModule').requires;
        });

        xit("should have app.servicesModule", function () {
            expect(hasModule('app.servicesModule')).toBeTruthy();
        });

    });
});

xdescribe('app.filtersModule', function () {
    var hasString;
    var zip;
    var phone;
    var utilityService;

    beforeEach(module('app.filtersModule'));

    beforeEach(inject(function (_hasStringFilter_,_zipFilter_, _phoneFilter_, _utilityService_) {
        hasString = _hasStringFilter_;
        zip = _zipFilter_;
        phone = _phoneFilter_;
        utilityService = _utilityService_;
    }));

    it('should evaluate hasString same as utilityService.hasString', function () {
        // Arrange
        var input ='inputValue';
        var returnedValue = 'returnedValue';
        spyOn(utilityService, 'hasString').andReturn(returnedValue);

        // Act & Assert
        expect(hasString(input)).toEqual(returnedValue);
        expect(utilityService.hasString).toHaveBeenCalledWith(input);
    });

    it('should return zip as utilityService.formatZipCode', function () {
        // Arrange
        var input ='inputValue';
        var returnedValue = 'returnedValue';
        spyOn(utilityService, 'formatZipCode').andReturn(returnedValue);

        // Act & Assert
        expect(zip(input)).toEqual(returnedValue);
        expect(utilityService.formatZipCode).toHaveBeenCalledWith(input);
    });

    it('should format phone number without extension', function () {
        // Arrange
        var input ='1234567890';
        var returnedValue = '123-456-7890';

        // Act & Assert
        expect(phone(input)).toEqual(returnedValue);
    });

    it('should format phone number with extension', function () {
        // Arrange
        var input ='12345678901234';
        var returnedValue = '123-456-7890-1234';

        // Act & Assert
        expect(phone(input)).toEqual(returnedValue);
    });

})
;
