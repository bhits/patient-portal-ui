/**
 * Created by cindy.ren on 7/13/2016.
 */

'use strict';

xdescribe("app.c2sCategoryList", function() {

    beforeEach(module('app.consent'));

    var controller, $state, accountService, brand;

    var patientInfo = {firstName: 'firstName', lastName: 'lastName'};

    beforeEach(function () {
        var fakeModule = angular.module('test.app.brand', function () {});
        fakeModule.config( function (brandProvider) {
            brand = brandProvider;
        });
        module('app.brand', 'test.app.brand');
        inject(function () {});
        brand.setBrandName("Brand Name");
        brand.setBrandInitial("BI");
    });

    beforeEach(inject(function( $controller, _$state_, _accountService_) {

        $state = _$state_;
        accountService = _accountService_;
        accountService.setPatientName(patientInfo);

        controller = $controller('ActivateController', {
            accountService: accountService,
            brand: brand
        });

    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });


});
