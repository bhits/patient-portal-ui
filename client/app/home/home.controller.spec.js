/**
 * Created by cindy.ren on 7/13/2016.
 */
'use strict';

xdescribe("app.HomeController", function () {

    beforeEach(module('app.home'));

    var controller, brand;

    beforeEach(function () {
        var fakeModule = angular.module('test.app.brand', function () {
        });
        fakeModule.config(function (brandProvider) {
            brand = brandProvider;
        });
        module('app.brand', 'test.app.brand');
        inject(function () {
        });
        brand.setBrandName("Brand Name");
    });

    beforeEach(inject(function ($controller) {

        controller = $controller('HomeController', {
            brand: brand
        });

    }));
    it('should create controller ', function () {
        expect(controller).toBeDefined();
    });

    it('should set correct data', function () {
        expect(controller.brandName).toBeDefined();
        expect(controller.brandName).toEqual("Brand Name");
    });


});