'use strict';

xdescribe('app.consentServices', function () {
    var module;

    beforeEach(function () {
        module = angular.module("app.consentServices");
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
            dependencies = module.value('app.consentServices').requires;
        });

        it("should have ngResource as a dependency", function () {
            expect(hasModule('ngResource')).toEqual(true);
        });

        it("should have app.config as a dependency", function () {
            expect(hasModule('app.config')).toEqual(true);
        });
    });
});