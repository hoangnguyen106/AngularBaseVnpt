import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Urls } from 'src/app/modules/shared/enums/urls';
import { AuthService } from '../../services/auth.service';
import { ValidateLoginDirective } from 'src/app/modules/shared/directives/ValidateLogin.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    this.authService.siginIn(this.signinForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.token);
        this.toastrService.success('Login successfully');
        this.router.navigate(['/console/dashboard']);
      },
      error: (err) => {
        this.toastrService.error(`Email or password invalid !`, `Login Fail`);
      },
    });
  }
}
