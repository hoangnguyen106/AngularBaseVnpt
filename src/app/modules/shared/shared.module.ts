import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateLoginDirective } from './directives/ValidateLogin.directive';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ValidateLoginDirective],
  imports: [CommonModule],
})
export class SharedModule {}
