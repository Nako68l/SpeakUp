import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPage } from './account.page';

const routes: Routes = [
    {
        path: '', component: AccountPage,
        children: [
            { path: 'settings', loadChildren: '../account-settings/account-settings.module#AccountSettingsModule' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
