/**
 * Created by cindy.ren on 7/13/2016.
 */

'use strict';

describe("app.activateController", function() {

    beforeEach(module('app.activity'));

    var controller, loadedData = {data: "something"};

    beforeEach(inject(function( $controller) {

        controller = $controller('ActivityHistoryController', {
            loadedData: loadedData
        });

    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should set correct data', function(){
        expect(controller.paginationData).toBeDefined();
        expect(controller.paginationData).toEqual(loadedData);
    });


});