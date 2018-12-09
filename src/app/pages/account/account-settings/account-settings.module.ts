import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialElementsModule } from '../../../material-elements/material-elements.module';

const routes: Routes = [
  {
    path: '', component: AccountSettingsComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    MaterialElementsModule
  ],
  declarations: [AccountSettingsComponent],
})
export class AccountSettingsModule { }
