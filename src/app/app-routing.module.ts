import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './modules/core/error-pages/not-found/not-found.page';

const routes: Routes = [
    { path: 'account', loadChildren: './modules/account/account.module#AccountModule'},
    { path: '**', component: NotFoundPage }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
