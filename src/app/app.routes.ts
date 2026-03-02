import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginAdmin } from './components/login-admin/login-admin';
import { AdminGuests } from './components/admin-guests/admin-guests';
import { AdminConfig } from './components/admin-config/admin-config';
import { AdminReminders } from './components/admin-reminders/admin-reminders';
import { GuestConfirmation } from './components/guest-confirmation/guest-confirmation';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: LoginAdmin
  },
  {
    path: 'admin/guests',
    component: AdminGuests,
    canActivate: [authGuard]
  },
  {
    path: 'admin/config',
    component: AdminConfig,
    canActivate: [authGuard]
  },
  // {
  //   path: 'admin/reminders',
  //   component: AdminReminders,
  //   canActivate: [authGuard]
  // },
  {
    path: 'admin',
    redirectTo: 'admin/guests',
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: Home
  }
];
