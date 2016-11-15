/**
 * Created by cindy.ren on 7/12/2016.
 */

'use strict';

xdescribe("app.resetPassword.controller", function () {

    beforeEach(module('app.account'));

    var controller;

    beforeEach(inject(function ($controller) {

        controller = $controller('ResetPasswordController', {
        });

    }));

    it('should create controller ', function () {
        expect(controller).toBeDefined();
    });

    xit('should have correct title', function () {
        expect(controller.title).toBeDefined();
        expect(controller.title).toEqual('Brand Name Reset Password Complete');
    });


});