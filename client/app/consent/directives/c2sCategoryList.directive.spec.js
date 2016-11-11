/**
 * Created by cindy.ren on 7/13/2016.
 */

'use strict';

xdescribe("app.c2sCategoryList", function () {

    beforeEach(module('app.consent'));

    var controller, $state, accountService;

    var patientInfo = {firstName: 'firstName', lastName: 'lastName'};

    beforeEach(inject(function ($controller, _$state_, _accountService_) {

        $state = _$state_;
        accountService = _accountService_;
        accountService.setPatientName(patientInfo);

        controller = $controller('ActivateController', {
            accountService: accountService
        });

    }));

    it('should create controller ', function () {
        expect(controller).toBeDefined();
    });
});
