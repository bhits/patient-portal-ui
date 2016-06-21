/**
 * Created by cindy.ren on 6/15/2016.
 */

'use strict';

xdescribe("app.activateController", function() {

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));

    var $location, controller, $q, emailTokenService, utilityService, accountConfig;

    beforeEach(inject(function( $controller, _$q_, _emailTokenService_, _utilityService_,
                                _$location_, _accountConfig_) {

        $location = _$location_;
        $q = _$q_;
        emailTokenService = _emailTokenService_;
        utilityService = _utilityService_;
        accountConfig = _accountConfig_;

        controller = $controller('CreatePasswordController', {
        });


    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should have correct patient name', function(){
        expect(controller.patientName).toBeDefined();
        expect(controller.patientName).toEqual('firstName lastName');
    });

});
