/**
 * Created by tomson.ngassa on 10/14/2015.
 */

'use strict';

xdescribe('app.notificationModule  ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.notificationModule");
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
            dependencies = module.value('app.notificationModule').requires;
        });

        it("should be registered", function() {
            expect(module).not.toEqual(null);
        });

        it("should have cgNotify as a dependency", function() {
            expect(hasModule('cgNotify')).toEqual(true);
        });
    });
});


xdescribe('app.notificationModule ', function() {
    var notificationService,mockNotify;

    beforeEach(module('cgNotify'));
    beforeEach(module('app.notificationModule'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            notificationService = $injector.get('notificationService');
            mockNotify = $injector.get('notify');
        });
        //

       spyOn(mockNotify, this).andCallThrough();
    });

    it('should show success notify', function () {

        console.log(mockNotify);
        var msg = "test";
        var notifyObj = { message: msg, duration: 2000, classes: 'alert-success', templateUrl: ""};
        notificationService.success(msg);

        expect(mockNotify).toHaveBeenCalled();
    });

    xit('should show error notify', function () {
        //expect(angular.isFunction(ProviderServices.getProviders())).toNotBe(null);
    });


});
