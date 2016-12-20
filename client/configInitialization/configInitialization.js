(function () {
    'use strict';
    var configInitialization = angular.module('configInitialization', ['app']);

    // Define all expected configuration object properties
    var configPropertyList = [
        'branding.name',
        'branding.initials',
        'branding.smallLogo',
        'branding.mediumLogo',
        'branding.largeLogo',
        'oauth2.client.base64BasicKey',
        'securedApis.pcmApiBaseUrl',
        'securedApis.phrApiBaseUrl',
        'securedApis.tryPolicyApiBaseUrl',
        'securedApis.userInfo',
        'unsecuredApis.plsApiBaseUrl',
        'unsecuredApis.tokenUrl',
        'unsecuredApis.verificationUrl',
        'unsecuredApis.activationUrl',
        'unsecuredApis.forgotPasswordUrl'
    ];

    // Load the initial configuration
    angular.element(document).ready(function () {
        getAppConfig().then(function () {
            console.log('Initial configuration successful.');
        }, function () {
            console.log('Initial configuration failed.');
        });
    });

    function getAppConfig() {
        var initInjector = angular.injector(['ng']);
        var ngHttp = initInjector.get('$http');
        var ngWindow = initInjector.get('$window');

        return ngHttp.get('/pp-ui/config').then(function (response) {
            if (checkPropertyExistsInConfiguration(response.data)) {
                configInitialization.constant('configProvider', response.data);
                configInitialization.constant('configPropertyList', configPropertyList);
            } else {
                ngWindow.location.href = '/pp-ui/configError';
            }
        }, function (errorResponse) {
            ngWindow.location.href = '/pp-ui/configError';
        });
    }

    function checkPropertyExistsInConfiguration(configObj) {
        for (var i = 0; i < configPropertyList.length; i++) {
            if (!checkKeyExistsInObject(configObj, configPropertyList[i])) {
                return false;
            }
        }
        return true;
    }

    function checkKeyExistsInObject(obj, key) {
        var components = key.split(".");
        for (var i = 0; i < components.length; i++) {
            if ((typeof obj !== "object") || (!obj.hasOwnProperty(components[i]))) {
                return false;
            }
            obj = obj[components[i]];
        }
        return true;
    }
})();