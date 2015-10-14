/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.filtersModule ', function () {
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

        it("should have app.servicesModule", function () {
            expect(hasModule('app.servicesModule')).toBeTruthy();
        });

    });
});

describe('app.filtersModule', function () {
    var $filter;

    beforeEach(function () {
            module('app.filtersModule');
        }
    );

    it('should evaluate hasString as undefined when input is empty string', function () {
        // Arrange
        var input = '', returnValue, result;
        var mockUtilityService = {
            hasString: function (str) {
                if (input === str) {
                    return returnValue;
                }
            }
        };
        module(function ($provide) {
            $provide.value('utilityService', mockUtilityService);
        });
        inject(function (_$filter_) {
            $filter = _$filter_;
        });

        // Act
        result = $filter('hasString')(input);

        // Assert
        expect(result).toBeFalsy();
        expect(result).toBeUndefined();
    });

    it('should evaluate hasString as input string when input is not an empty string', function () {
        // Arrange
        var input = 'someString', returnValue = input, result;
        var mockUtilityService = {
            hasString: function (str) {
                if (input === str) {
                    return returnValue;
                }
            }
        };
        module(function ($provide) {
            $provide.value('utilityService', mockUtilityService);
        });
        inject(function (_$filter_) {
            $filter = _$filter_;
        });

        // Act
        result = $filter('hasString')(input);

        // Assert
        expect(result).toBeTruthy();
        expect(result).toEqual(input);
    });

    it('should evaluate hasString as input string when input is not an empty string', function () {
        // Arrange
        var input, returnValue, result;
        var mockUtilityService = {
            hasString: function (str) {
                if (input === str) {
                    return returnValue;
                }
            }
        };
        module(function ($provide) {
            $provide.value('utilityService', mockUtilityService);
        });
        inject(function (_$filter_) {
            $filter = _$filter_;
        });

        // Act
        result = $filter('hasString')(input);

        // Assert
        expect(result).toBeFalsy();
        expect(result).toBeUndefined();
    });

    it('should return zip as utilityService.formatZipCode returns', function () {
        // Arrange
        var input ='aaa12345bbb', returnValue='12345', result;
        var mockUtilityService = {
            formatZipCode: function (str) {
                if (input === str) {
                    return returnValue;
                }
            }
        };
        module(function ($provide) {
            $provide.value('utilityService', mockUtilityService);
        });
        inject(function (_$filter_) {
            $filter = _$filter_;
        });

        // Act
        result = $filter('zip')(input);

        // Assert
        expect(result).toEqual(returnValue);
    });

    it('should format phone number without extension', function () {
        // Arrange
        var input ='1234567890', returnValue='123-456-7890', result;
        inject(function (_$filter_) {
            $filter = _$filter_;
        });

        // Act
        result = $filter('phone')(input);

        // Assert
        expect(result).toEqual(returnValue);
    });

    it('should format phone number with extension', function () {
        // Arrange
        var input ='12345678901234', returnValue='123-456-7890-1234', result;
        inject(function (_$filter_) {
            $filter = _$filter_;
        });

        // Act
        result = $filter('phone')(input);

        // Assert
        expect(result).toEqual(returnValue);
    });

})
;
