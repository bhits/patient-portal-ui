/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    function ConsentConfig($stateProvider) {
        $stateProvider
            .state('consent', {
                abstract: true,
                url: '/consent',
                data: {pageTitle: 'Consent'},
                templateUrl: 'common/tmpl/content.tpl.html'
            })
            .state('consent.list', {
                url: '/list',
                data: {pageTitle: 'List Consents'},
                templateUrl: 'app/consent/tmpl/consent-list.tpl.html'
            })

            .state('consent.create', {
                url: '/create',
                data: {pageTitle: 'Create Consent'},
                templateUrl: 'app/consent/tmpl/consent-create.tpl.html',
                params: {
                    consentId: ''
                }
            })
            .state('consent.revoke', {
                url: '/revoke',
                data: {pageTitle: 'Revoke Consent'},
                templateUrl: 'app/consent/tmpl/consent-revoke.tpl.html',
                params: {
                    consent: {}
                }
            });
    }

    /**
     *  The provider controller module.
     *
     */
    angular.module("app.consentModule",
        [
            'app.consentServices',
            'app.consentDirectives'
        ])
        .config(ConsentConfig);

})();