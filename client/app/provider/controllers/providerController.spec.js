/**
 * Created by tomson.ngassa on 10/14/2015.
 * Modified by cindy.ren on 7/14/2016
 */

'use strict';

describe("app.providerModule ProviderListController ", function() {


    beforeEach(module('app.provider'));
    beforeEach(module('app.config'));

    var $modal, providerService, $state, notificationService, controller;
    var providers = {providers: "provider"};

    beforeEach(inject(function(_$modal_, _providerService_, _$state_, _notificationService_, $controller) {

        $modal = _$modal_;
        providerService = _providerService_;
        $state = _$state_;
        notificationService = _notificationService_;

        controller = $controller('ProviderListController', {
            providers: providers,
            $modal: $modal,
            providerService: providerService,
            $state: $state,
            notificationService: notificationService

        });
    }));

    it('should open delete provider modal ', function(){
        expect(controller.providers).toEqual(providers);
    });

    it('should open delete provider', function(){
        spyOn($modal, 'open').and.callThrough();
        controller.openDeleteProviderModal(providers, 2);
        expect($modal.open).toHaveBeenCalled();
    });
});
