'use strict';

angular.module('app.healthInformationDirectivesModule', [])

/**
 * Creates the patient demographics accordion
 */
.directive('demographicsAccordion', [ function () {
    return {
        restrict: 'E',
            scope: {
                patientdemographics : "=",
                ccdheader: '='
            },
            templateUrl: 'app/healthinformation/demographics.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])

/**
 * Creates the patient allergy accordion
 */
.directive('alertsAccordion', [ function () {
    return {
        restrict: 'E',
            scope: {
                alerts : "="
            },
            templateUrl: 'app/healthinformation/alerts.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])

/**
 * Creates the patient medications accordion
 */
.directive('medicationsAccordion', [ function () {
    return {
            restrict: 'E',
            scope: {
                medications : "="
            },
            templateUrl: 'app/healthinformation/medications.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])


/**
 * Creates the Lab Result accordion
 */
.directive('encountersAccordion', [ function () {
        return {
            restrict: 'E',
            scope: {
                encounters : "="
            },
            templateUrl: 'app/healthinformation/encounters.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])

/**
 * Creates the patient problem list accordion
 */
.directive('problemsAccordion', [ function () {
    return {
            restrict: 'E',
            scope: {
                problems : "="
            },
            templateUrl: 'app/healthinformation/problems.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])


/**
 * Creates the patient procedures accordion
 */
.directive('proceduresAccordion', [ function () {
    return {
        restrict: 'E',
            scope: {
                procedures : "="
            },
            templateUrl: 'app/healthinformation/procedures.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])

/**
 * Creates the Care Plans accordion
 */
.directive('planofcaresAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                planofcares : "="
            },
            templateUrl: 'app/healthinformation/planofcares.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])

/**
 * Creates the Payer accordion
 */
.directive('payersAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                payers : "="
            },
            templateUrl: 'app/healthinformation/payers.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])


/**
 * Creates the Healthcare Provider accordion
 */
.directive('healthcareprovidersAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                healthcareproviders : "="
            },
            templateUrl: 'app/healthinformation/healthcareproviders.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])

/**
 * Creates the Functional Status accordion
 */
.directive('functionalstatusAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                functionalstatus : "="
            },
            templateUrl: 'app/healthinformation/functionalstatus.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])

/**
 * Creates the Care Plans accordion
 */
.directive('vitalsignsAccordion', [function () {
    return {
        restrict: 'E',
        scope: {
            vitalsigns : "="
        },
        templateUrl: 'app/healthinformation/vitalsigns.tpl.html',
        link: function ($scope, $element) {
        }
    };
}
])

/**
 * Creates the Care Plans accordion
 */
.directive('supportAccordion', [function () {
    return {
        restrict: 'E',
        scope: {
            supports : "="
        },
        templateUrl: 'app/healthinformation/support.tpl.html',
        link: function ($scope, $element) {
        }
    };
}
])

/**
 * Creates the Advanced Directives accordion
 */
.directive('advanceddirectivesAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                advanceddirectives : "="
            },
            templateUrl: 'app/healthinformation/advanceddirectives.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])


/**
 * Creates the Advanced Directives accordion
 */
.directive('socialhistoriesAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                socialhistories : "="
            },
            templateUrl: 'app/healthinformation/socialhistories.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])


/**
 * Creates the Advanced Directives accordion
 */
.directive('familyhistoriesAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                familyhistories : "="
            },
            templateUrl: 'app/healthinformation/familyhistories.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])


/**
 * Creates the Advanced Directives accordion
 */
.directive('medicalequipmentsAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                medicalequipments : "="
            },
            templateUrl: 'app/healthinformation/medicalequipments.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])


/**
 * Creates the Advanced Directives accordion
 */
.directive('immunizationsAccordion', [function () {
        return {
            restrict: 'E',
            scope: {
                immunizations : "="
            },
            templateUrl: 'app/healthinformation/immunizations.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])

/**
 * Creates the patient lab results accordion
 */
.directive('resultsAccordion', [ function () {
    return {
            restrict: 'E',
            scope: {
                results : "="
            },
            templateUrl: 'app/healthinformation/results.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
])


/**
 * Creates the patient lab results accordion
 */
.directive('noDataAlert', [ function () {
    return {
        restrict: 'E',
        scope: {
            data : "="
        },
        template: '<div class="alert alert-warning " role="alert" ng-show="data.length == 0">' +
                        'No data is available.'+
                     '</div>',
        link: function ($scope, $element) {
        }
    };
}
])


;

