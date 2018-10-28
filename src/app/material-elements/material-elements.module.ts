import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
} from '@angular/material'
@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ]
})
export class MaterialElementsModule { }
