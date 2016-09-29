/**
 * Created by cindy.ren on 7/18/2016.
 */

'use strict';

describe('app.pcmProviderNameOrFacilityFilter', function () {

    var $filter;

    beforeEach(module('app.core'));
    beforeEach(module('app.account'));

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_('pcmProviderNameOrFacility');
    }));

    it('should get individual name', function () {
        var provider = {
            entityType: 'Individual',
            firstName: 'firstName',
            lastName: 'lastName'
        };
        expect($filter(provider)).toEqual('lastName,firstName');
    });

    it('should get organization name', function () {
        var provider = {
            entityType: 'Organization',
            orgName: 'orgName'
        };
        expect($filter(provider)).toEqual('orgName');
    });

});