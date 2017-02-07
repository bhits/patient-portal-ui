import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProviderMultiAddingComponent} from "./provider-multi-adding.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [ProviderMultiAddingComponent],
    imports: [CommonModule, SharedModule ],
    providers: [],
    exports:[ProviderMultiAddingComponent]
})

export class ProviderModule {
}
