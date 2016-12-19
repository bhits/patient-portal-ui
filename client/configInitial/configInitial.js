(function () {
    'use strict';
    var configInitial = angular.module('configInitial', ['app']);

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
        getAppConfig();
    });

    function getAppConfig() {
        var initInjector = angular.injector(['ng']);
        var _http = initInjector.get('$http');
        var _window = initInjector.get('$window');

        return _http.get('/pp-ui/config').then(function (response) {
            if (checkPropertyExistsInConfiguration(response.data)) {
                configInitial.constant('configProvider', response.data);
                configInitial.constant('configPropertyList', configPropertyList);
            } else {
                _window.location.href = '/pp-ui/configError';
            }
        }, function (errorResponse) {
            _window.location.href = '/pp-ui/configError';
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