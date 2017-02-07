
import { Pipe, PipeTransform } from '@angular/core';
import {Provider} from "./Provider";

@Pipe({name: 'providerName'})
export class providerName implements PipeTransform {
    transform(provider: Provider): string {
        var providerName = '';
        if (provider && angular.isDefined(provider) && angular.isDefined(provider.entityTypeDisplayName)) {
            switch (provider.entityTypeDisplayName) {
                case "Individual":
                    providerName = provider.firstName + ' ' + provider.lastName;
                    break;
                case "Organization":
                    providerName = provider.organizationName;
                    break;
            }
        }
        return providerName;
    }
}
