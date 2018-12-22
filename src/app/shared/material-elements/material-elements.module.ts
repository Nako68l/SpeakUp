import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
    ]
})
export class MaterialElementsModule {
}
