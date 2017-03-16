'use strict';

(function () {

    angular
        .module("app.account")
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(envService,
                             utilityService,
                             accountConfig,
                             configService,
                             $scope,
                             $translate,
                             tmhDynamicLocale,
                             paginationConfig) {
        var vm = this;
        vm.version = envService.version;
        vm.forgotPassword = forgotPassword;
        vm.brandName = configService.getBrandName();
        vm.brandLargeLogo = specifyImageType(configService.getBrandLargeLogo());
        vm.altLogoText = configService.getBrandInitials() + " Logo";

        function forgotPassword() {
            utilityService.redirectTo(accountConfig.forgotPasswordPath);
        }

        function specifyImageType(base64Image) {
            return "data:image/png;base64," + base64Image;
        }

        // Change language dynamically
        var lang = window.localStorage.lang || 'en';

        setDynamicLanguage(lang);
        $scope.changeLanguage = function (language) {
            $translate.use(language);
            window.localStorage.lang = language;
            setDynamicLanguage(language);
            //window.location.reload();
        };

        function setDynamicLanguage (language) {
            if (language === null || language.length < 2) {
                tmhDynamicLocale.set("en");
            } else {
                tmhDynamicLocale.set (language.substring(0,2));
                setTextofPagination (language.substring(0,2));
            }
        }

        //translate the text of pagination of bootstrap
        function setTextofPagination(language) {
            if (language === "es"){
                paginationConfig.firstText = "Inicio";
                paginationConfig.previousText = "Anterior";
                paginationConfig.lastText = "Fin";
                paginationConfig.nextText = "Próximo";
            } else if (language === "en"){
                // note the different effects between REFRESH and choosing LANGUAGE
                paginationConfig.firstText = "First";
                paginationConfig.previousText = "Previous";
                paginationConfig.lastText = "Last";
                paginationConfig.nextText = "Next";
            }
        }
    }
})();