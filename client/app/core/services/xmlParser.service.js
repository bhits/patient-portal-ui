(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('xmlParser', xmlParser);


    /* @ngInject */
    function xmlParser(){

        var x2js = new X2JS();

        var service = {};
        service.xml2json = xml2json;
        service.xml_str2json = xml_str2json;
        service.json2xml_str = json2xml_str;

        return service;

        function xml2json (xmlResponse) {
            return angular.bind(x2js, x2js.xml2json, xmlResponse)();
        }

        function xml_str2json (xmlResponse) {
            return angular.bind(x2js, x2js.xml_str2json, xmlResponse)();
        }

        function json2xml_str (xmlResponse) {
            return angular.bind(x2js, x2js.json2xml_str, xmlResponse)();
        }
    }
})();