
(function () {

'use strict';

    /**
     * Creates the patient document accordion
     */
    function DocumentAccordion (){
        return {
            restrict: 'E',
            scope: {
                document : "="
            },
            templateUrl: 'app/healthinformation/tmpl/document.tpl.html'
        };
    }



    /**
     * Creates the patient Demographics accordion
     */
    function DemographicsAccordion (){
        return {
            restrict: 'E',
            scope: {
                patientdemographics : "=",
                ccdheader: '='
            },
            templateUrl: 'app/healthinformation/tmpl/demographics.tpl.html'
        };
    }

    /**
     * Creates the patient allergy accordion
     */
    function AlertsAccordion(){
        return {
            restrict: 'E',
            scope: {
                alerts : "="
            },
            templateUrl: 'app/healthinformation/tmpl/alerts.tpl.html'
        };
    }
    /**
     * Creates the patient medications accordion
     */
    function MedicationsAccordion(){
        return {
            restrict: 'E',
            scope: {
                medications : "="
            },
            templateUrl: 'app/healthinformation/tmpl/medications.tpl.html'
        };
    }
    /**
     * Creates the Lab Result accordion
     */
    function EncountersAccordion(){
        return {
            restrict: 'E',
            scope: {
                encounters : "="
            },
            templateUrl: 'app/healthinformation/tmpl/encounters.tpl.html'
        };
    }
    /**
     * Creates the patient problem list accordion
     */
    function ProblemsAccordion(){
        return {
            restrict: 'E',
            scope: {
                problems : "="
            },
            templateUrl: 'app/healthinformation/tmpl/problems.tpl.html',
            link: function ($scope, $element) {
            }
        };
    }
    /**
     * Creates the patient procedures accordion
     */
    function ProceduresAccordion(){
        return {
            restrict: 'E',
            scope: {
                procedures : "="
            },
            templateUrl: 'app/healthinformation/tmpl/procedures.tpl.html'
        };
    }

    /**
     * Creates the Care Plans accordion
     */
    function PlanofcaresAccordion(){
        return {
            restrict: 'E',
            scope: {
                planofcares : "="
            },
            templateUrl: 'app/healthinformation/tmpl/planofcares.tpl.html'
        };
    }

    /**
     * Creates the Payer accordion
     */
    function PayersAccordion(){
        return {
            restrict: 'E',
            scope: {
                payers : "="
            },
            templateUrl: 'app/healthinformation/tmpl/payers.tpl.html'
        };
    }
    /**
     * Creates the Healthcare Provider accordion
     */
    function HealthcareProvidersAccordion(){
        return {
            restrict: 'E',
            scope: {
                healthcareproviders : "="
            },
            templateUrl: 'app/healthinformation/tmpl/healthcareproviders.tpl.html'
        };
    }

    /**
     * Creates the Functional Status accordion
     */
    function FunctionalstatusAccordion(){
        return {
            restrict: 'E',
            scope: {
                functionalstatus : "="
            },
            templateUrl: 'app/healthinformation/tmpl/functionalstatus.tpl.html'
        };
    }

    /**
     * Creates the Care Plans accordion
     */
    function VitalsignsAccordion(){
        return {
            restrict: 'E',
            scope: {
                vitalsigns : "="
            },
            templateUrl: 'app/healthinformation/tmpl/vitalsigns.tpl.html'
        };
    }

    /**
     * Creates the Care Plans accordion
     */
    function SupportAccordion(){
        return {
            restrict: 'E',
            scope: {
                supports : "="
            },
            templateUrl: 'app/healthinformation/tmpl/support.tpl.html'
        };
    }

    /**
     * Creates the Advanced Directives accordion
     */
    function AdvanceddirectivesAccordion(){
        return {
            restrict: 'E',
            scope: {
                advanceddirectives : "="
            },
            templateUrl: 'app/healthinformation/tmpl/advanceddirectives.tpl.html'
        };
    }

    /**
     * Creates the Advanced Directives accordion
     */
    function SocialhistoriesAccordion(){
        return {
            restrict: 'E',
            scope: {
                socialhistories : "="
            },
            templateUrl: 'app/healthinformation/tmpl/socialhistories.tpl.html'
        };
    }

    /**
     * Creates the Advanced Directives accordion
     */
    function FamilyhistoriesAccordion(){
        return {
            restrict: 'E',
            scope: {
                familyhistories : "="
            },
            templateUrl: 'app/healthinformation/tmpl/familyhistories.tpl.html'
        };
    }

    /**
     * Creates the Medical Equipement Directives accordion
     */
    function MedicalequipmentsAccordion(){
        return {
            restrict: 'E',
            scope: {
                medicalequipments : "="
            },
            templateUrl: 'app/healthinformation/tmpl/medicalequipments.tpl.html'
        };
    }

    /**
     * Creates the Advanced Directives accordion
     */
    function ImmunizationsAccordion(){
        return {
            restrict: 'E',
            scope: {
                immunizations : "="
            },
            templateUrl: 'app/healthinformation/tmpl/immunizations.tpl.html'
        };
    }

    /**
     * Creates the patient lab results accordion
     */
    function ResultsAccordion(){
        return {
            restrict: 'E',
            scope: {
                results : "="
            },
            templateUrl: 'app/healthinformation/tmpl/results.tpl.html'
        };
    }

    function NoDataAlert() {
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            template: '<div class="alert alert-warning " role="alert" ng-show="data.length == 0">' +
            'No data is available.' +
            '</div>',
            link: function ($scope, $element) {
            }
        };
    }

    /**
     *  The patient health information directives
     *
     */
    angular.module('app.healthInformationDirectivesModule', [])
        .directive('documentAccordion', DocumentAccordion)
        .directive('demographicsAccordion', DemographicsAccordion)
        .directive('alertsAccordion', AlertsAccordion)
        .directive('encountersAccordion', EncountersAccordion)
        .directive('problemsAccordion',ProblemsAccordion)
        .directive('proceduresAccordion',ProceduresAccordion)
        .directive('planofcaresAccordion',PlanofcaresAccordion)
        .directive('payersAccordion',PayersAccordion)
        .directive('healthcareprovidersAccordion',HealthcareProvidersAccordion)
        .directive('functionalstatusAccordion',FunctionalstatusAccordion)
        .directive('vitalsignsAccordion',VitalsignsAccordion)
        .directive('supportAccordion',SupportAccordion)
        .directive('advanceddirectivesAccordion',AdvanceddirectivesAccordion)
        .directive('socialhistoriesAccordion',SocialhistoriesAccordion)
        .directive('familyhistoriesAccordion',FamilyhistoriesAccordion)
        .directive('medicalequipmentsAccordion',MedicalequipmentsAccordion)
        .directive('immunizationsAccordion',ImmunizationsAccordion)
        .directive('resultsAccordion',ResultsAccordion)
        .directive('noDataAlert',NoDataAlert);

})();