/**
 * Created by tomson.ngassa on 10/14/2015.
 */
'use strict';

describe('app.providerService  ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.providerService");
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
            dependencies = module.value('app.providerService').requires;
        });

        it("should have ngResource as a dependency", function() {
            expect(hasModule('ngResource')).toEqual(true);
        });

        it("should have app.config as a dependency", function() {
            expect(hasModule('app.config')).toEqual(true);
        });
    });
});

describe('app.providerService ', function() {
    var ProviderServices, $httpBackend;

    beforeEach(module('app.providerService'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            ProviderServices = $injector.get('ProviderService');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should providers resource function', function () {
        expect(angular.isFunction(ProviderServices.getProviders())).toNotBe(null);
    });

    it('should add Providers', function () {
        $httpBackend.expectPOST('https://localhost:8443/pcm/patients/providers/11111').respond({status: 201});
        var status = ProviderServices.addProvider(
            11111,
            function(data ){
                status = data.status;
            },
            function(error){});
        $httpBackend.flush();
        expect(status).toEqual(201);
    });

    it('should delete Providers ', function () {
        $httpBackend.expectDELETE('https://localhost:8443/pcm/patients/providers/11111').respond({status: 201});
        var status = ProviderServices.deleteProvider(
            11111,
            function(data ){
                status = data.status;
            },
            function(error){});
        $httpBackend.flush();
        expect(status).toEqual(201);
    });

});
