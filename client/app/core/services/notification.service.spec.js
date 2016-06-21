/**
 * Created by tomson.ngassa on 10/14/2015.
 * Modified by cindy.ren on 6/13/2016
 */

'use strict';

xdescribe('app.notificationService ', function() {
    var notificationService, notify;

    var templateUrl = "app/core/services/notify.html";
    var duration = 2000;

    beforeEach(module('app.core'));

    beforeEach(inject(function(_notificationService_, _notify_){
        notificationService = _notificationService_;
        notify = _notify_;

    }));

    it('should show success notify', function () {
        spyOn(notificationService, 'success').and.callThrough();
        console.log(notify);
        var msg = "test";
        notificationService.success(msg);
        //expect(notificationService.success).toHaveBeenCalled();

    });

    xit('should show error notify', function () {
        //expect(angular.isFunction(ProviderServices.getProviders())).toNotBe(null);
    });

});
