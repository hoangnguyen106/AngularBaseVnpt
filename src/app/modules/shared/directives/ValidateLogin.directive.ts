import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appValidateLogin]',
})
export class ValidateLoginDirective {
  constructor() {}
  static emailValidator(control: FormControl) {
    if (control.value) {
      const matches = control.value.match(
        /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/
      );
      return matches ? null : { invalidEmail: true };
    } else {
      return null;
    }
  }
}
