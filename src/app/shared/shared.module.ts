import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropDirective } from './directives/file-drop/file-drop.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FileDropDirective]
})
export class SharedModule { }
