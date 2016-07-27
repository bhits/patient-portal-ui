/*Created by cindy.ren on 06/27/2016.*/

'use strict';

describe('app.xmlParserService ', function() {
    var xmlParser, x2js;

    beforeEach(module('app.core'));

    beforeEach(inject(function(_xmlParser_){
        xmlParser = _xmlParser_;

    }));

    beforeEach(function(){
        x2js = new X2JS();
    });

    xit('should show success notify', function () {
        console.log(x2js);
        var returned = xmlParser.xml2json("something");
        console.log(returned);
    });


});
