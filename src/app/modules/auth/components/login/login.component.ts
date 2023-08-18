import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  loginUser() {
    this.authService.siginIn(this.signinForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.token);
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/console/dashboard']);
          this.toastrService.success('Login successfully');
        }, 1000);
      },
      error: (err) => {
        this.toastrService.error(`Email or password invalid !`, `Login Fail`);
      },
    });
  }
}
