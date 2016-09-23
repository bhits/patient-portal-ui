/**
 * Created by tomson.ngassa on 10/14/2015.
 * Modified by cindy.ren on 7/14/2016
 */

'use strict';

xdescribe("app.providerModule ProviderListController ", function () {


    beforeEach(module('app.provider'));
    beforeEach(module('app.config'));

    var $modal, providerService, $state,
        notificationService, $controller, $secondController, $scope;

    var providers = {providers: "provider"};

    beforeEach(inject(function (_$rootScope_, _$modal_, _providerService_, _$state_,
                                _notificationService_, _$controller_) {

        $modal = _$modal_;
        providerService = _providerService_;
        $state = _$state_;
        notificationService = _notificationService_;
        $scope = _$rootScope_;

        $controller = _$controller_('ProviderListController', {
            providers: providers,
            $modal: $modal,
            providerService: providerService,
            $state: $state,
            notificationService: notificationService,
            $scope: $scope

        });

        $scope = _$rootScope_.$new();
        $scope.$index = 1;
        $scope.$digest();

        $secondController = _$controller_('deleteProviderModalVm', {
            $scope: $scope,
            provider: providers,
            notificationService: notificationService,
            $modalInstance: $modal,
            $state: $state

        });
    }));

    xit('should open delete provider modal ', function () {
        expect($controller.providers).toEqual(providers);
    });

    xit('should open delete provider', function () {
        spyOn($modal, 'open').and.callThrough();
        $controller.openDeleteProviderModal(providers, 2);
        expect($modal.open).toHaveBeenCalled();
    });

    it('should open delete provider', function () {

    });
});
