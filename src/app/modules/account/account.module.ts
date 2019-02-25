import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPage } from './account.page';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    AccountPage
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
}
