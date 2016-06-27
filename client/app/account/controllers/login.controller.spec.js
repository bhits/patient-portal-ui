/**
 * Created by tomson.ngassa on 7/20/2015.
 * Modified by cindy.ren on 6/13/2016
 */

'use strict';

describe("app.login.controller ", function() {

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));
    beforeEach(module('app.brand'));

    var envService, controller, $resource;

    beforeEach(inject(function( $controller, $state, _Idle_, _authenticationService_,
                                _envService_, _utilityService_, _$resource_, _brand_) {

        envService = _envService_;
        $resource = _$resource_;

        controller = $controller('LoginController', {
            envService: envService,
            brand: _brand_
        });
    }));

    it('should create controller and have correct version based on config.js', function(){
        expect(controller).toBeDefined();
        expect(controller.version).toBeDefined();
        expect(controller.version).toEqual('0.12.0');
    });

});
