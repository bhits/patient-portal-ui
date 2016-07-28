/**
 * Created by cindy.ren on 7/18/2016.
 */

'use strict';

describe('app.fileNameFilter', function(){

    var $filter;

    beforeEach(module('app.core'));
    beforeEach(module('app.account'));

    beforeEach(inject(function (_$filter_){
        $filter = _$filter_('fileName');

    }));

    it('has a file filter', function() {
        expect($filter('fileName')).not.toBeNull();
    });

    it('should remove doc extension from file name', function(){
        var fileName = "fileName.doc";
        expect($filter(fileName)).toEqual("fileName");

    });

    it('should return just name', function(){
        var fileName = "fileNamedoc";
        expect($filter(fileName)).toEqual("fileNamedoc");
    });

    it('should return empty', function(){
        var fileName = ".";
        expect($filter(fileName)).toEqual("");
        fileName = "";
        expect($filter(fileName)).toEqual("");
    });


});