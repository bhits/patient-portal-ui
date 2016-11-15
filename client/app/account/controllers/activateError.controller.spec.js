/**
 * Created by cindy.ren on 6/15/2016.
 */

'use strict';

xdescribe("app.activateErrorController", function () {

    beforeEach(module('app.account'));

    var controller, $state;

    beforeEach(inject(function ($controller, _$state_) {
        $state = _$state_;

        controller = $controller('ActivateErrorController', {
        });
    }));

    it('should create controller ', function () {
        expect(controller).toBeDefined();
    });

    it('should have correct title', function () {
        expect(controller.title).toBeDefined();
        expect(controller.title).toEqual('Brand Name Account Activation - Invalid');
    });

    it('should have correct brand name', function () {
        expect(controller.brandName).toBeDefined();
        expect(controller.brandName).toEqual('Brand Name');
    });

    it('should have correct brand initial', function () {
        expect(controller.brandInitial).toBeDefined();
        expect(controller.brandInitial).toEqual('BI');
    });
});