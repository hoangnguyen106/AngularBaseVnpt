import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateLoginDirective } from './directives/ValidateLogin.directive';



@NgModule({
  declarations: [
      ValidateLoginDirective
   ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
