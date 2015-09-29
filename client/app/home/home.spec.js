/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.homeModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app");
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

        it("should have ui.router as a dependency", function() {
            expect(hasModule('ui.router')).toEqual(true);
        });

        it("should have app.servicesModule as a dependency", function() {
            expect(hasModule('app.servicesModule')).toEqual(true);
        });
    });
});



describe("app.homeModule HomeController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('app.homeModule'));

    var scope, rootScope;

    beforeEach(inject(function($rootScope, $controller) {
        rootScope = $rootScope;
        scope = $rootScope.$new();

        $controller('HomeController', {
            $scope: scope
        });
    }));


    it('should create home controller ', function(){


    });

});