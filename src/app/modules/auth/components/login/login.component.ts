import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Urls } from 'src/app/modules/shared/enums/urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router) {}
  login() {
    this.router.navigate([Urls.console]);
  }
}
