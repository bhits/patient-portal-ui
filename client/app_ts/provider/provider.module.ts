import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';

import {ProviderMultiAddingComponent} from "./provider-multi-adding.component";
import {SharedModule} from "../shared/shared.module";
import {providerName} from "./provider-name.pipe";
import {ProviderService} from "./provider-service";


@NgModule({
    declarations: [ProviderMultiAddingComponent, providerName],
    imports: [CommonModule, SharedModule, HttpModule ],
    providers: [ProviderService],
    exports:[ProviderMultiAddingComponent]
})

export class ProviderModule {
}
