/**
 * Created by cindy.ren on 6/9/2016.
 */
'use strict';

describe('app.security ', function () {
    var module;

    beforeEach(function () {
        module = angular.module("app.security");
    });

    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });

    describe("Dependencies:", function () {

        var dependencies;

        var hasModule = function (m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function () {
            dependencies = module.value('app.authenticationModule').requires;
        });

        it("should have app.config as a dependency", function () {
            expect(hasModule('app.config')).toEqual(true);
        });

        it("should have app.core as a dependency", function () {
            expect(hasModule('app.core')).toEqual(true);
        });

    });
});
