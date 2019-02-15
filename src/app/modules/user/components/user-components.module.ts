import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';

// @ts-ignore
// @ts-ignore
@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AvatarUploadComponent
    ],
    exports: [
        AvatarUploadComponent
    ]
})
// @ts-ignore
export class UserComponentsModule {
}
