'use strict';

xdescribe('Consent module: ', function () {
    var module;

    beforeEach(function () {
        module = angular.module("app.consent");
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
            dependencies = module.value('app.consent').requires;
        });

        it("should have ngResource as a dependency", function () {
            expect(hasModule('ngResource')).toEqual(true);
        });

        it("should have app.config as a dependency", function () {
            expect(hasModule('app.config')).toEqual(true);
        });

        it("should have checklist-model as a dependency", function () {
            expect(hasModule('checklist-model')).toEqual(true);
        });

        it("should have app.providerFiltersModul as a dependency", function () {
            expect(hasModule('app.providerFiltersModule')).toEqual(true);
        });

        it("should have app.providerService as a dependency", function () {
            expect(hasModule('app.providerService')).toEqual(true);
        });

    });
});
