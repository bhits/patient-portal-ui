/**
 * Created by cindy.ren on 7/18/2016.
 */

'use strict';

describe('app.fullNameFilter', function(){

    var $filter;

    beforeEach(module('app.core'));
    beforeEach(module('app.account'));

    beforeEach(inject(function (_$filter_){
        $filter = _$filter_('fullName');

    }));

    it('has an address filter', function() {
        expect($filter('fullName')).not.toBeNull();
    });

    it('should return name of organization', function(){
        var data = {
            orgName: 'organization name'
        };
        expect($filter(data)).toEqual("organization name");
    });

    it('should return name of patient', function(){
        var data = {
            firstName: 'firstName',
            lastName: 'lastName'
        };
        expect($filter(data)).toEqual("firstName lastName");
    });

    it('should fail because of missing subject', function(){
        var data = {
            lastName: 'lastName'
        };
        expect($filter(data)).toEqual({});
    });

    it('should return empty', function(){
        var data;
        expect($filter(data)).toEqual({});
    });

});