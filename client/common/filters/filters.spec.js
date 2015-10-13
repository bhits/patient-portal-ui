/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

xdescribe('app.filtersModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.filtersModule");
    });

    it("should be registered", function() {
        expect(module).not.toEqual(null);
    });

    describe("Dependencies:", function() {

        var dependencies;

        var hasModule = function(m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function() {
            dependencies = module.value('app.filtersModule').requires;
        });

    });
});
