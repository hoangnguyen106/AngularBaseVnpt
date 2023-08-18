import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}
  logout() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.authService.doLogout();
    }, 1000);
  }
}
