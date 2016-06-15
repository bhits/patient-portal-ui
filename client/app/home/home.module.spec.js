/**
 * Created by tomson.ngassa on 12/7/2015.
 * Modified by cindy.ren on 6/15/2016
 */

'use strict';
describe('app.home ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.home");
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
            dependencies = module.value('app').requires;
        });

        it("should have app.servicesModule as a dependency", function() {
            expect(hasModule('app.core')).toEqual(true);
        });

    });
});

