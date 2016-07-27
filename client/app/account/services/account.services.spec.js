/**
 * Created by cindy.ren on 6/14/2016.
 */

'use strict';

describe('app.accountService', function(){

    var accountService, $resource, envService, sessionStorage, scope, $httpBackend, utilityService;

    var verifyInfo = {
        emailToken: 'emailToken',
        verificationCode: 11111,
        birthDate: '2015-5-20'
    };
    var basicVerifyInfo = {name: 'name'};
    var userName = 'username';
    var patientInfo = {
        emailToken: 'emailToken',
        verificationCode: 11111,
        birthDate: '2015-5-20',
        password: "password",
        confirmPassword: "password",
        username: "username",
        firstName: 'firstName',
        lastName: 'lastName'
    };

    beforeEach(module('app.account'));

    beforeEach(inject(function(_accountService_, _$sessionStorage_,
                               $controller, $rootScope, _$httpBackend_, _utilityService_){
        accountService = _accountService_;
        sessionStorage = _$sessionStorage_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        utilityService = _utilityService_;
        accountService.removeVerifyInfo();
        delete sessionStorage.userName;
    }));

    it('should verify patient', function () {

        $httpBackend.expect('GET','/patientUser/verifications?birthDate=2015-5-20&emailToken=emailToken&verificationCode=11111').respond(200, verifyInfo);

        function verifySuccess(response) {
            accountService.setVerifyInfo(verifyInfo);
            accountService.setUserName(response.username);
            utilityService.redirectTo('fe/account/createPassword');
        }

        function verifyError(response) {
            var emailTokenException = response.data.exception;
            if (emailTokenException.indexOf('EmailTokenExpiredException') !== -1) {
                utilityService.redirectTo('/fe/account/activationError');
            }
        }

        accountService.verifyPatient(verifyInfo, verifySuccess, verifyError);
        $httpBackend.flush();
        expect(accountService.getVerifyInfo().emailToken).toBe("emailToken");
    });

    it('should activate patient', function () {

        $httpBackend.expect('POST','/patientUser/activations').respond(200, patientInfo);

        function activateSuccess(response) {
            utilityService.redirectTo('/fe/account/activationSuccess');
            accountService.setPatientName(response);
        }

        function activateError(response) {
            var emailTokenException = response.data.exception;
            if (emailTokenException.indexOf('EmailTokenExpiredException') !== -1) {
                utilityService.redirectTo('/fe/account/activationError');
            }
        }

        accountService.activatePatient(patientInfo, activateSuccess, activateError);
        $httpBackend.flush();
        expect(accountService.getPatientName()).toBe("firstName lastName");
    });

    it('should remove the verify info', function(){
        expect(sessionStorage.verifyInfo).toBeUndefined();
    });

    it('should set the verify info', function(){
        expect(sessionStorage.verifyInfo).toBeUndefined();
        accountService.setVerifyInfo(basicVerifyInfo);
        expect(sessionStorage.verifyInfo).toEqual(basicVerifyInfo);
    });

    it('should get the verify info', function(){
        accountService.setVerifyInfo(basicVerifyInfo);
        expect(accountService.getVerifyInfo()).toEqual(basicVerifyInfo);
    });

    it('should set the username', function(){
        expect(sessionStorage.userName).toBeUndefined();
        accountService.setUserName(userName);
        expect(sessionStorage.userName).toEqual(userName);
    });

    it('should set the username', function(){
        accountService.setUserName(userName);
        expect(accountService.getUserName(userName)).toEqual(userName);
    });

    it('should set patient name', function(){
        accountService.setPatientName(patientInfo);
        expect(accountService.getPatientName()).toBe('firstName lastName');
    });

    it('should reset session storage', function(){
        accountService.removeActivateInfo();
        //expect(sessionStorage).toBe(undefined);
    });

});