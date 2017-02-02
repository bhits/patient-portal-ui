/**
 * Created by cindy.ren on 7/13/2016.
 */
'use strict';

xdescribe("app.HomeController", function () {

    beforeEach(module('app.home'));

    var controller;

    beforeEach(inject(function ($controller) {

        controller = $controller('HomeController', {
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