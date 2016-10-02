/**
 * Created by cindy.ren on 7/13/2016.
 */

'use strict';

describe("app.ConsentListController", function () {

    beforeEach(module('app.consent'));

    var controller, loadedData = {data: "something"};

    beforeEach(inject(function ($controller) {

        controller = $controller('ConsentListController', {
            loadedData: loadedData
        });

    }));

    it('should create controller ', function () {
        expect(controller).toBeDefined();
    });

    it('should set correct data', function () {
        expect(controller.consentList).toBeDefined();
        expect(controller.consentList).toEqual(loadedData);
    });


});