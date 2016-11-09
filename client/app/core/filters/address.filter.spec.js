/**
 * Created by cindy.ren on 7/18/2016.
 */

'use strict';

xdescribe('app.addressFilter', function () {

    var utilityService, $filter;

    beforeEach(module('app.core'));
    beforeEach(module('app.account'));

    beforeEach(inject(function (_utilityService_, _$filter_) {
        utilityService = _utilityService_;
        $filter = _$filter_('address');

    }));

    it('has an address filter', function () {
        expect($filter('address')).not.toBeNull();
    });

    it('should compose address', function () {
        var data = {
            firstLinePracticeLocationAddress: "firstLinePracticeLocationAddress",
            practiceLocationAddressCityName: "practiceLocationAddressCityName",
            practiceLocationAddressStateName: "practiceLocationAddressStateName",
            practiceLocationAddressPostalCode: "practiceLocationAddressPostalCode"
        };
        expect($filter(data)).toEqual("firstLinePracticeLocationAddress, practiceLocationAddressCityName, practiceLocationAddressStateName, practiceLocationAddressPostalCode");

    });


    it('should return empty', function () {
        var data;
        expect($filter(data)).toEqual("");

    });

});