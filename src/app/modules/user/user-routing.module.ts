import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './modules/home/pages/home/home.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'account', loadChildren: './modules/account/account.module#AccountModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
