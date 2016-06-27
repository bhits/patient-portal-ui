/**
 * Created by cindy.ren on 6/15/2016.
 */

'use strict';

xdescribe("app.activateController", function() {

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));
    beforeEach(module('ui.router'));

    var controller, $state;
    var $location, $q, emailTokenService, accountService, utilityService, accountConfig;

    beforeEach(inject(function( $controller, _$state_,
                                _$location_, _$q_, _emailTokenService_, _accountService_, _utilityService_, _accountConfig_) {

        $location = _$location_;
        $q = _$q_;
        emailTokenService = _emailTokenService_;
        accountService = _accountService_;
        utilityService = _utilityService_;
        accountConfig = _accountConfig_;
        
        $state = _$state_;
        spyOn($state, 'go');

        controller = $controller('CreatePasswordController', {
            //allowVerification: allowVerification 
        });

    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should have correct patient name', function(){

        expect(controller.allowActivation).toBeDefined();
    });

});
