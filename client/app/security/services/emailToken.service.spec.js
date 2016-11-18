/**
 * Created by cindy.ren on 6/13/2016.
 */
'use strict';

describe('app.emailTokenService ', function () {
    var emailTokenService;

    beforeEach(function () {
        module(function ($provide) {
            $provide.constant('configPropertyList', [
                '0', '1', '2', '3',
                '4', '5', '6', '7',
                '8', '9', '10', '11', '12'
            ]);
        });
    });

    beforeEach(function () {
        module(function ($provide) {
            $provide.constant('configConstants', {unsecuredApis: {verificationUrl: 'dummyValue'}});
        });
    });

    beforeEach(module('app.security'));

    beforeEach(inject(function (_emailTokenService_) {
        emailTokenService = _emailTokenService_;
    }));

    it("should set email token", function () {
        expect(emailTokenService.token).toBeUndefined();
        emailTokenService.setEmailToken('testEmailToken@gmail.com');
        expect(emailTokenService.getEmailToken()).toBe('testEmailToken@gmail.com');
    });

    it("should remove email token", function () {
        emailTokenService.setEmailToken('emailToken=testEmailToken@gmail.com');
        emailTokenService.removeEmailToken();
        expect(emailTokenService.token).toBeUndefined();
    });

    it("should remove email token", function () {
        emailTokenService.setEmailToken('emailToken=testEmailToken@gmail.com');
        emailTokenService.removeEmailToken();
        expect(emailTokenService.token).toBeUndefined();
    });

    it("should load email token", function () {
        expect(emailTokenService.loadEmailToken('emailToken=testEmailToken@gmail.com')).toBe('testEmailToken@gmail.com');
    });

    xit("should test if email token is valid", function () {

        var valid = emailTokenService.isValidEmailToken('testEmailToken@gmail.com', true, false);
        console.log(valid);

        emailTokenService.setEmailToken('testEmailToken@gmail.com');

        expect(emailTokenService.token).toBeUndefined();
    });
});