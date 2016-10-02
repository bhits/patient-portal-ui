/**
 * Created by tomson.ngassa on 10/14/2015.
 * Modified by cindy.ren on 6/13/2016
 */

'use strict';

describe('app.notificationService ', function () {
    var notificationService, notify;

    beforeEach(module('app.core'));

    beforeEach(inject(function (_notificationService_, _notify_) {
        notificationService = _notificationService_;
        notify = _notify_;

    }));

    it('should show success notify', function () {
        spyOn(notificationService, 'success').and.callThrough();
        var msg = "success";
        notificationService.success(msg);
        expect(notificationService.success).toHaveBeenCalledWith(msg);

    });

    it('should show info notify', function () {
        spyOn(notificationService, 'info').and.callThrough();
        var msg = "info";
        notificationService.info(msg);
        expect(notificationService.info).toHaveBeenCalledWith(msg);

    });

    it('should show warn notify', function () {
        spyOn(notificationService, 'warn').and.callThrough();
        var msg = "warn";
        notificationService.warn(msg);
        expect(notificationService.warn).toHaveBeenCalledWith(msg);

    });

    it('should show error notify', function () {
        spyOn(notificationService, 'error').and.callThrough();
        var msg = "error";
        notificationService.error(msg);
        expect(notificationService.error).toHaveBeenCalledWith(msg);

    });

});
