(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('utilityService', utilityService);

    /* @ngInject */
    function utilityService($location, $anchorScroll, $window, configProvider, browser, coreConstants) {
        var service = {};

        service.getYear = getYear;
        service.redirectTo = redirectTo;
        service.isUnDefinedOrNull = isUnDefinedOrNull;
        service.isDefinedAndLengthNotZero = isDefinedAndLengthNotZero;
        service.isDefinedAndNotNull = isDefinedAndNotNull;
        service.scrollTo = goTo;
        service.hasString = hasString;
        service.startsWith = startsWith;
        service.endsWith = endsWith;
        service.randomAlphanumeric = randomAlphanumeric;
        service.isNotEmpty = isNotEmpty;
        service.formatZipCode = formatZipCode;
        service.formatDate = formatDate;
        service.isIndividualProvider = isIndividualProvider;
        service.isOrganizationProvider = isOrganizationProvider;
        service.getProviderByNPI = getProviderByNPI;
        service.getProviderByNpis = getProviderByNpis;
        service.getIndividualProvidersNpi = getIndividualProvidersNpi;
        service.getOrganizationalProvidersNpi = getOrganizationalProvidersNpi;
        service.downloadFile = downloadFile;
        service.isSecuredApi = isSecuredApi;
        service.digitFormat = digitFormat;
        service.isValidDate = isValidDate;
        service.addQueryParameterPrefixAndSuffix = addQueryParameterPrefixAndSuffix;

        return service;

        function getYear() {
            return (new Date()).getFullYear();
        }

        function redirectTo(path) {
            $location.path(path);
        }

        function isUnDefinedOrNull(value) {
            return (angular.isUndefined(value) || value === null );
        }

        function isDefinedAndNotNull(value) {
            return (angular.isDefined(value) && value !== null );
        }

        function isDefinedAndLengthNotZero(value) {
            return (angular.isDefined(value) && (value.length > 0) );
        }

        function goTo(position) {
            $location.hash(position);
            $anchorScroll();
        }

        function hasString(str) {
            return angular.isDefined(str) && angular.isString(str) && str.length > 0 ? str : undefined;
        }

        function startsWith(str, prefix) {
            return angular.isString(str) && angular.isString(prefix) &&
                str.substring(0, prefix.length) === prefix;
        }

        function endsWith(str, suffix) {
            return angular.isString(str) && angular.isString(suffix) &&
                str.substring(str.length - suffix.length, str.length) === suffix;
        }

        function randomAlphanumeric(len, charSet) {
            charSet = charSet || coreConstants.alphanumericConstant;
            var randomString = '';
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }
            return randomString;
        }

        function isNotEmpty(arr) {
            return angular.isDefined(arr) && angular.isArray(arr) && arr.length > 0;
        }

        function formatZipCode(zipCode) {
            var formattedZipCode = parseInt(zipCode).toString();
            if (formattedZipCode.toString().length > 5) {
                formattedZipCode = formattedZipCode.slice(0, 5) + "-" + formattedZipCode.slice(5);
            }
            return formattedZipCode;
        }

        function formatDate(dateObj) {
            var today = new Date(dateObj);
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            if (day < 10) {
                day = "0" + day;
            }
            if (month < 10) {
                month = "0" + month;
            }
            var formatedDate = month + "/" + day + "/" + year;

            return formatedDate;
        }

        function isIndividualProvider(provider) {
            return angular.isDefined(provider) && angular.equals(provider.entityType, 'Individual');
        }

        function isOrganizationProvider(provider) {
            return angular.isDefined(provider) && angular.equals(provider.entityType, 'Organization');
        }

        function getProviderByNPI(providerList, npi) {
            if (angular.isDefined(providerList)) {
                for (var i = 0; i < providerList.length; i++) {
                    if (providerList[i].npi === npi) {
                        return providerList[i];
                    }
                }
            }
            return {};
        }

        function getProviderByNpis(providers, listOfNpi1, listOfNpi2) {
            var result = [];
            var listOfNpi = listOfNpi1.concat(listOfNpi2);

            if (angular.isDefined(providers)) {
                for (var i = 0; i < listOfNpi.length; i++) {
                    var provider = getProviderByNPI(providers, listOfNpi[i]);
                    if (provider.npi) {
                        result.push(provider);
                    }
                }
            }
            return result;
        }

        function getIndividualProvidersNpi(providers) {
            var result = [];
            if (angular.isDefined(providers)) {
                for (var i = 0; i < providers.length; i++) {
                    if (isIndividualProvider(providers[i])) {
                        result.push(providers[i].npi);
                    }
                }
            }
            return result;
        }

        function getOrganizationalProvidersNpi(providers) {
            var result = [];
            if (angular.isDefined(providers)) {
                for (var i = 0; i < providers.length; i++) {
                    if (isOrganizationProvider(providers[i])) {
                        result.push(providers[i].npi);
                    }
                }
            }
            return result;
        }

        function downloadFile(content, filename, fileFormat) {
            var file = new Blob([content], {type: fileFormat});
            if (browser.isIE()) {
                if (isFileFormatPDF(fileFormat)) {
                    filename = filename + '.pdf';
                }
                window.navigator.msSaveBlob(file, filename);
            } else if (browser.isFireFox()) {
                if (isFileFormatPDF(fileFormat)) {
                    filename = filename + '.pdf';
                }
                saveFileToDiskInChromeAndFF(file, filename);
            } else if (browser.isChrome() || browser.isSafari()) {
                saveFileToDiskInChromeAndFF(file, filename);
            }
        }

        function isFileFormatPDF(fileFormat) {
            if (fileFormat === 'application/pdf') {
                return true;
            } else {
                return false;
            }
        }

        function saveFileToDiskInChromeAndFF(blobFile, filename) {
            var blobURL = ($window.URL || $window.webkitURL).createObjectURL(blobFile);
            var anchor = document.createElement("a");
            anchor.style = "display: none";
            anchor.download = filename;
            anchor.href = blobURL;
            document.body.appendChild(anchor);
            anchor.click();
            setTimeout(function () {
                document.body.removeChild(anchor);
                window.URL.revokeObjectURL(blobURL);
            }, 100);
        }

        function isSecuredApi(url) {
            var isSecured = false;
            if (angular.isDefined(url)) {
                angular.forEach(configProvider.securedApis, function (value) {
                    if (startsWith(url.toLowerCase(), value.toLowerCase())) {
                        isSecured = true;
                    }
                });
            }
            return isSecured;
        }

        function digitFormat(number, digitLength) {
            if (angular.isDefined(number) && angular.isDefined(digitLength)) {
                var output = number + '';
                while (output.length < digitLength) {
                    output = '0' + output;
                }
                return output;
            }
            return '';
        }

        // Expect input as m/d/y
        function isValidDate(dateStr) {
            // Checks for the following valid date formats:
            // MM/DD/YYYY
            // Also separates date into month, day, and year variables
            var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;

            var matchArray = dateStr.match(datePat); // is the format ok?
            if (matchArray === null) {
                return false;
            }

            var month = parseInt(matchArray[1], 10); // parse date into variables
            var day = parseInt(matchArray[3], 10);
            var year = matchArray[4];
            if (month < 1 || month > 12) { // check month range
                return false;
            }
            if (day < 1 || day > 31) {
                return false;
            }
            if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
                return false;
            }
            if (month === 2) { // check for february 29th
                var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
                if (day > 29 || (day === 29 && !isleap)) {
                    return false;
                }
            }
            return true;  // date is valid
        }

        function addQueryParameterPrefixAndSuffix(param){
            return angular.isDefined(param) && (param.length > 0) ? ("%" + param + "%"): param;
        }
    }
})();