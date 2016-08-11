/**
 * Created by cindy.ren on 7/11/2016.
 */

'use strict';

describe('app.brand', function () {

    var brand;

    beforeEach(function () {
        var fakeModule = angular.module('test.app.brand', function () {});
        fakeModule.config( function (brandProvider) {
            brand = brandProvider;
        });
        module('app.brand', 'test.app.brand');

        inject(function () {});
    });

        it('should set brand name (setBrandName)', function () {
            expect(brand).not.toBeUndefined();
            brand.setBrandName("CINDY");
            expect(brand.$get().getBrandName()).toBe("CINDY");
        });

        it('set brand initials (setBrandInitial)', function () {
            expect(brand).not.toBeUndefined();
            brand.setBrandInitial("CR");
            expect(brand.$get().getBrandInitials()).toBe("CR");
        });


});