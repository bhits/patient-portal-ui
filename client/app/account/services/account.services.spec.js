/**
 * Created by cindy.ren on 6/14/2016.
 */

describe('app.accountService', function(){

    var accountService, $resource, envService, sessionStorage, scope, $httpBackend;

    var verifyInfo = {name: 'name'};
    var userName = 'username';
    var patientInfo = {firstName: 'firstName', lastName: 'lastName'};

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));

    beforeEach(inject(function(_accountService_, _$resource_, _envService_, _$sessionStorage_,
                               $controller, $rootScope, _$httpBackend_){
        accountService = _accountService_;
        $resource = _$resource_;
        envService = _envService_;
        sessionStorage = _$sessionStorage_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

        // ctrl = $controller('accountService', {
        //     $scope: scope
        // });

        accountService.removeVerifyInfo();
        delete sessionStorage.userName;
    }));

    xit('should verify patient', function () {
        $httpBackend.expectGET('/patientUser/verifications');
        var status = accountService.verifyPatient(
            '/patientUser/verifications',
            function (data) {
                status = data.status;
            },
            function (error) {
            });
        $httpBackend.flush();
        expect(status).toEqual(201);
    });

    it('should remove the verify info', function(){
        expect(sessionStorage.verifyInfo).toBeUndefined();
    });

    it('should set the verify info', function(){
        expect(sessionStorage.verifyInfo).toBeUndefined();
        accountService.setVerifyInfo(verifyInfo);
        expect(sessionStorage.verifyInfo).toEqual(verifyInfo);
    });

    it('should get the verify info', function(){
        accountService.setVerifyInfo(verifyInfo);
        expect(accountService.getVerifyInfo()).toEqual(verifyInfo);
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
    });//TODO: what is this resetting?

});