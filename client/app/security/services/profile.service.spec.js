/**Created by cindy.ren on 6/13/2016.*/

'use strict';

describe('app.profileService ', function () {
    var profileService, sessionStorage, resource, envService, notificationService, httpBackend;

    var emptyProfile;
    var profile = {name: 'testProfile', user_name: 'username', user_id: 101};

    beforeEach(module('app.security'));

    beforeEach(inject(function (_profileService_, _$sessionStorage_, _$resource_,
                                _envService_, _notificationService_, _$httpBackend_) {
        profileService = _profileService_;
        sessionStorage = _$sessionStorage_;
        resource = _$resource_;
        envService = _envService_;
        notificationService = _notificationService_;
        httpBackend = _$httpBackend_;
    }));

    it("should set profile", function () {
        expect(profileService.profile).toBeUndefined();
        profileService.setProfile(profile);
        expect(sessionStorage.profile).toBe(profile);
    });

    it("should get profile", function () {
        profileService.setProfile(profile);
    });


    it("should load profile", function () {
        //httpBackend.expect('GET', "/uaa/userinfo").respond(200,profile);
        profileService.setProfile(profile);
        var called = profileService.loadProfile();
        expect(called).toBeDefined();
    });

    it("should get profile username", function () {
        spyOn(notificationService, 'error').and.callThrough();

        profileService.setProfile(emptyProfile);
        profileService.getUserName();
        expect(notificationService.error).toHaveBeenCalledWith("No userName found");

        profileService.setProfile(profile);
        expect(profileService.getUserName()).toBe('username');
    });

    it("should get profile user id", function () {
        spyOn(notificationService, 'error').and.callThrough();

        profileService.setProfile(emptyProfile);
        profileService.getUserId();
        expect(notificationService.error).toHaveBeenCalledWith("No userId found");

        profileService.setProfile(profile);
        profileService.getUserId();
        expect(profileService.getUserId()).toBe(101);
    });

    it("should get profile name", function () {
        spyOn(notificationService, 'error').and.callThrough();

        profileService.setProfile(emptyProfile);
        profileService.getName();
        expect(notificationService.error).toHaveBeenCalledWith("No user fullName found");

        profileService.setProfile(profile);
        profileService.getName();
        expect(profileService.getName()).toBe('testProfile');
    });

});