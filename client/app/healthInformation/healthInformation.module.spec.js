/**
 * Created by tomson.ngassa on 7/20/2015.
 * Modified by cindy.ren on 6/21/2016
 */

'use strict';

describe('app.healthInformation', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.healthInformation");
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
            dependencies = module.value('app.healthInformation').requires;
        });

        it("should have app.servicesModule as a dependency", function() {
            expect(hasModule('app.core')).toEqual(true);
        });

        it("should have app.healthInformationService as a dependency", function() {
            expect(hasModule('app.config')).toEqual(true);
        });
    });
});