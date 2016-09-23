/**
 * Created by cindy.ren on 7/13/2016.
 */

'use strict';

describe("app.ConsentCreateEditController", function () {

    beforeEach(module('app.consent'));

    var controller;
    var loadedData = ["providers", "purposeOfUse", "sensitivityPolicies", "consent"];

    beforeEach(inject(function ($controller) {

        controller = $controller('ConsentCreateEditController', {
            loadedData: loadedData
        });

    }));

    it('should create controller ', function () {
        expect(controller).toBeDefined();
    });

    it('should set correct data', function () {
        expect(controller.providers).toBe("providers");
        expect(controller.purposeOfUse).toBe("purposeOfUse");
        expect(controller.sensitivityPolicies).toBe("sensitivityPolicies");
        expect(controller.consent).toBeTruthy();
    });


});