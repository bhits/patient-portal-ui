/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

xdescribe('app.directivesModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.directivesModule");
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
            dependencies = module.value('app.directivesModule').requires;
        });

    });
});


xdescribe('app.directivesModule ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.directivesModule");
    });

    it("should be registered", function() {
        expect(module).not.toEqual(null);
    });

    var element, scope,template, compile, ctrl;

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope;
        var element = angular.element("<span minimaliza-sidebar></span>");
        $compile(element)(scope);
        scope.$digest();
        ctrl = element.controller("minimalizaSidebar");
        console.log(ctrl);
    }));

    xit("should minimalise side navbar", function(){
        ctrl.minimalize = jasmine.createSpy();

        var button = element.find("button");
        button.trigger('click');

        expect(ctrl.minimalize).toHaveBeenCalled();
    });

    xit("should have default toggle classes ", function(){
        scope.minimalize();
        expect(element.hasClass('mini-navbar')).toBeTruthy();
    });
});

