/**
 * Created by cindy.ren on 6/27/2016.
 */

'use strict';

describe('app.activityService', function(){

    var activityService, $resource, envService, scope, $httpBackend;

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.activity'));
    beforeEach(module('ngResource'));

    beforeEach(inject(function(_activityService_, _$resource_, _envService_,
                               $controller, $rootScope, _$httpBackend_){
        activityService = _activityService_;
        $resource = _$resource_;
        envService = _envService_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
    }));

    it('should get activity history list', function(){

    });



});
