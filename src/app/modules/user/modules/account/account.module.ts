import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountPage } from './pages/account/account.page';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialElementsModule } from '../../../../shared/material-elements/material-elements.module';
import { AccountSettingsPage } from './pages/account-settings/account-settings.page';

const routes: Routes = [
    { path: '', component: AccountPage },
    { path: 'settings', component: AccountSettingsPage }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MaterialElementsModule
    ],
    declarations: [
        AccountPage,
        AccountSettingsPage
    ]
})
export class AccountModule {
}