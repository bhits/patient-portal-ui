/**
 * Created by cindy.ren on 7/12/2016.
 */
'use strict';

describe("app.CreatePasswordController", function() {

    beforeEach(module('app.account'));

    var controller, $state, allowActivation, brand;

    beforeEach(function () {
        var fakeModule = angular.module('test.app.brand', function () {});
        fakeModule.config( function (brandProvider) {
            brand = brandProvider;
        });
        module('app.brand', 'test.app.brand');
        inject(function () {});
        brand.setBrandName("Brand Name");
        brand.setBrandInitial("BI");
    });

    beforeEach(inject(function($controller, _$state_) {

        $state = _$state_;

        controller = $controller('CreatePasswordController', {
            allowActivation: true,
            brand: brand
        });

    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should have correct title', function(){
        expect(controller.title).toBeDefined();
        expect(controller.title).toEqual('Brand Name Create Password');
    });

    it('should allowActivation', function(){
        expect(controller.allowActivation).toBeDefined();
        expect(controller.allowActivation).toBeTruthy();
    });

    it('should not allowActivation', function(){
        inject(function($controller, _$state_) {

            $state = _$state_;

            controller = $controller('CreatePasswordController', {
                allowActivation: false,
                brand: brand
            });

        });
        expect(controller.allowActivation).toBeDefined();
        expect(controller.allowActivation).toBeFalsy();
    });


});