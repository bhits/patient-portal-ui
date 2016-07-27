/**
 * Created by cindy.ren on 7/18/2016.
 */

'use strict';

describe('app.zipFilter', function(){

    var $filter;

    beforeEach(module('app.core'));
    beforeEach(module('app.account'));

    beforeEach(inject(function (_$filter_){
        $filter = _$filter_('zip');

    }));

    it('has an address filter', function() {
        expect($filter('zip')).not.toBeNull();
    });

    it('should compose address', function(){
        var zip = "21045";
        expect($filter(zip)).toEqual("21045");

    });


    it('should return empty', function(){
        var data;
        expect($filter(data)).toBe('NaN');
    });

});