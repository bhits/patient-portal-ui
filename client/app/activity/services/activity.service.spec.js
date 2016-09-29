/**
 * Created by cindy.ren on 6/27/2016.
 */

'use strict';

xdescribe('app.activityService', function () {

    var activityService, notificationService, $resource, envService, scope, $httpBackend;

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.activity'));
    beforeEach(module('ngResource'));

    beforeEach(inject(function (_activityService_, _$resource_, _envService_, _notificationService_,
                                $controller, $rootScope, _$httpBackend_) {
        activityService = _activityService_;
        notificationService = _notificationService_;
        $resource = _$resource_;
        envService = _envService_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
    }));

    it('should get activity history list', function () {

        var page = {
            currentPage: 1
        };

        $httpBackend.expect('GET', '/pcm/patients/activities/pageNumber?pageNumber=1').respond(200, page);

        var success = function (response) {
            return response;
        };

        var error = function (data) {
            notificationService.error('Failed to get the activity history list, please try again later...');
            return data;
        };

        var called = activityService.getActivityHistoryList(2, success, error);
        $httpBackend.flush();
        expect(called.currentPage).toBe(2);
    });

    it('should error on get activity history list', function () {

        var page = {
            currentPage: "error"
        };

        $httpBackend.expect('GET', '/pcm/patients/activities/pageNumber?pageNumber=NaN').respond(200, page);

        var success = function (response) {
            return response;
        };

        var error = function (data) {
            notificationService.error('Failed to get the activity history list, please try again later...');
            return data;
        };

        var called = activityService.getActivityHistoryList("string", success, error);
        $httpBackend.flush();
        expect(called.currentPage).toBe("error");
    });


});
