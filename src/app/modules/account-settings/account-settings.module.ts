import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsPage } from './account-settings.page';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: AccountSettingsPage },
];

@NgModule({
    declarations: [
        AccountSettingsPage
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class AccountSettingsModule {
}
