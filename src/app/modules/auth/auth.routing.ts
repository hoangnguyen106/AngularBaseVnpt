import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile/user-profile/user-profile.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RememberLoginGuard } from '../core/guards/remember-login.guard';

export const AuthRoutes: Routes = [
  {
    path: 'signin',
    component: LoginComponent,
    canActivate: [RememberLoginGuard],
  },
  {
    path: 'register-user',
    component: RegisterComponent,
    canActivate: [RememberLoginGuard],
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
];
