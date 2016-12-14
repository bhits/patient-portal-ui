(function () {
    'use strict';
    var bootstrapApp = angular.module('bootstrapApp', ['app']);

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
    getAppConfig();

    function getAppConfig() {
        var initInjector = angular.injector(['ng']);
        var _http = initInjector.get('$http');
        var _window = initInjector.get('$window');

        return _http.get('/pp-ui/config').then(function (response) {
            if (checkPropertyExistsInConfiguration(response.data)) {
                bootstrapApp.constant('configConstants', response.data);
                bootstrapApp.constant('configPropertyList', configPropertyList);
            } else {
                _window.location.href = '/pp-ui/configError';
            }
        }, function (errorResponse) {
            bootstrapApp.constant('configConstants', null);
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