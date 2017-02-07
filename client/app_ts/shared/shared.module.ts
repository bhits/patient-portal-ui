import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {C2SModalComponent} from './C2SModal.component';

@NgModule({
    declarations: [C2SModalComponent],
    imports: [CommonModule],
    providers: [],
    exports:[C2SModalComponent]
})

export class SharedModule {
}
