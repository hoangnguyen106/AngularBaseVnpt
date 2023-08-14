import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
      name: [''],
      email: [''],
      password: [''],
    });
  }
  ngOnInit(): void {}

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
}
