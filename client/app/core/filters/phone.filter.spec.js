/**
 * Created by cindy.ren on 7/18/2016.
 */

'use strict';

describe('app.addressFilter', function(){

    var $filter;

    beforeEach(module('app.core'));
    beforeEach(module('app.account'));

    beforeEach(inject(function (_$filter_){
        $filter = _$filter_('phone');

    }));

    it('has an address filter', function() {
        expect($filter('phone')).not.toBeNull();
    });

    it('should compose address', function(){
        var number = "4108675309";
        expect($filter(number)).toEqual("410-867-5309");

    });


    it('should return empty', function(){
        var data;
        expect($filter(data)).toBeUndefined();
    });

});