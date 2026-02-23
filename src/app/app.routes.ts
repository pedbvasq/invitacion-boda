import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginAdmin } from './components/login-admin/login-admin';
import { AdminConfirmaciones } from './components/admin-confirmaciones/admin-confirmaciones';
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
    path: 'admin',
    component: AdminConfirmaciones,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];