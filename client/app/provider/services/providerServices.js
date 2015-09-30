/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

angular.module("app.providerService", ['ngResource', 'app.config'])

    .factory('ProviderService', ['$resource', 'ENVService', function($resource, ENVService){

        //var providerResource = $resource(ENVService.apiBaseUrl + "/ccda/getccdajson", {emrn:'@emrn'});

        var providers = [
                {firstName: "LUQUIN", lastName: "TERESA",  providerTaxonomyDescription: "Counselor" , npi: "1568797520",practiceLocationAddressTelephoneNumber: "(760) 353-6151", firstLinePracticeLocationAddress: "107 S 5TH ST", practiceLocationAddressCityName: "EL CENTRO", practiceLocationAddressStateName: "CA", practiceLocationAddressPostalCode: "92243" ,  activeConsent: true},
                {firstName: "HOANG", lastName: "DAN",  providerTaxonomyDescription: "Pharmacist" , npi: "1740515725",practiceLocationAddressTelephoneNumber: "(951) 486-4490", firstLinePracticeLocationAddress: "26520 CACTUS AVE", practiceLocationAddressCityName: " MORENO VALLEY", practiceLocationAddressStateName: "CA", practiceLocationAddressPostalCode: "92555", activeConsent: false  },
                {firstName: "GRIMES", lastName: "MICHAEL",  providerTaxonomyDescription: "Pharmacist" , npi: "1285969170",practiceLocationAddressTelephoneNumber: "(410) 720-6501", firstLinePracticeLocationAddress: "7150 COLUMBIA GATEWAY DR", practiceLocationAddressCityName: "COLUMBIA", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21046", activeConsent: true  },
                {firstName: "VAN DONGEN", lastName: "MONICA",  providerTaxonomyDescription: "Family" , npi: "1083949036",practiceLocationAddressTelephoneNumber: "(410) 614-1937", firstLinePracticeLocationAddress: "600 N WOLFE ST", practiceLocationAddressCityName: "BALTIMORE", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21287", activeConsent: false  },
                {firstName: "CARLSON", lastName: "GEORGE",  providerTaxonomyDescription: "Clinical" , npi: "1346575297",practiceLocationAddressTelephoneNumber: "(410) 730-0552", firstLinePracticeLocationAddress: "(5570 STERRETT PL", practiceLocationAddressCityName: "COLUMBIA", practiceLocationAddressStateName: "MD", practiceLocationAddressPostalCode: "21044", activeConsent: true  },
                {firstName: "MASTER CARE", lastName: "INC",  providerTaxonomyDescription: "Community Based Residential Treatment Facility, Mental Retardation and/or Developmental Disabilities" , npi: "(602) 993-5595",practiceLocationAddressTelephoneNumber: "(602) 993-5595", firstLinePracticeLocationAddress: "2159 W EUGIE AVE", practiceLocationAddressCityName: "PHOENIX", practiceLocationAddressStateName: "AZ", practiceLocationAddressPostalCode: "85029", activeConsent: true  },
                {firstName: "NEVAEH LLC", lastName: "TERESA",  providerTaxonomyDescription: "Residential Treatment Facility, Emotionally Disturbed Children" , npi: "1174858088",practiceLocationAddressTelephoneNumber: "(602) 441-3050", firstLinePracticeLocationAddress: "403 W HARWELL RD", practiceLocationAddressCityName: "PHOENIX", practiceLocationAddressStateName: "AZ", practiceLocationAddressPostalCode: "85041", activeConsent: false  }
            ];

        return {
            /**
             * Gets the Health Information resource object
             * @returns {Object} patientResource - The patient resource object
             */
            getProviders: function(){
                return providers;
            },

            lookupProviders: function(){
                return null;
            }
        };
    }]);



