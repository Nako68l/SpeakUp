import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';

const routes: Routes = [
  { path: 'admin', loadChildren: '../admin/admin.module#AdminModule'},
  { path: '', loadChildren: '../user/user.module#UserModule'},
  { path: '**', component: NotFoundPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
