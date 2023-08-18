import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  REGEXP_EMAIL,
  REGEXP_NAME,
  REGEXP_PASSWORD,
} from 'src/app/modules/shared/constants/regexp';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.signupForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(REGEXP_NAME),
        ]),
        // this.validateUserNameFromApi.bind(this),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(REGEXP_EMAIL),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(REGEXP_PASSWORD),
        ]),
      ],
    });
  }
  ngOnInit(): void {
    this.authService.validateUsername();
  }

  // Register user
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      console.log(res);
      if (res.result) {
        this.signupForm.reset();
        this.toastrService.success(`Please login user`, `${res.message}`);
        this.router.navigate(['auth/signin']);
      }
    });
  }

  get name() {
    return this.signupForm.get('name');
  }

  // validateUserNameFromApi(
  //   control: AbstractControl
  // ): Observable<ValidationErrors | null> {
  //   return this.authService.validateUsername(control.value).pipe(
  //     map((isValid: boolean) => {
  //       return isValid ? null : { usernameDuplicated: true };
  //     })
  //   );
  // }
}
