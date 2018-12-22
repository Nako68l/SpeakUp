import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomeModule } from './modules/home/home.module';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        HomeModule,
    ],
    declarations: [UserComponent]
})
export class UserModule {
}
