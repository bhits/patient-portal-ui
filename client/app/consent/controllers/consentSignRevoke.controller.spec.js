/**
 * Created by cindy.ren on 7/13/2016.
 */

'use strict';

describe("app.ConsentSignRevokeController", function () {

    beforeEach(module('app.consent'));

    var controller, $state, loadedData = {data: "something"};

    beforeEach(inject(function ($controller, _$state_) {
        $state = _$state_;

        controller = $controller('ConsentSignRevokeController', {
            loadedData: loadedData,
            $state: $state
        });

    }));

    it('should create controller ', function () {
        expect(controller).toBeDefined();
    });

    it('should set correct data', function () {
        expect(controller.javascriptCode).toBeDefined();
        expect(controller.javascriptCode).toEqual(loadedData);
    });

    it('should call on activated()', function () {
        spyOn($state, 'go');
        spyOn(controller, 'close').and.callThrough();

        controller.close();
        expect(controller.close).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('fe.consent.list');
    });


});