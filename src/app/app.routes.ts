import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';
import { RoleGuard } from '@core/guards/role.guard';
import { UnauthenticatedGuard } from '@core/guards/unauthenticated.guard';
import { Home } from '@features/home/home';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },
  {
    canMatch: [UnauthenticatedGuard],
    path: 'auth',
    loadChildren:()=>import('./features/auth/auth.routes').then(c=>c.AuthRoutes)
  },
  {
    canMatch: [AuthenticatedGuard, RoleGuard],
    path: 'admin',
    loadChildren: ()=> import('./features/admin/admin.routes') .then(c => c.AdminRoutes),
  },
  {
    path: 'password-reset',
    loadChildren:()=> import('./features/password-reset/password-reset.route').then(c=>c.PasswordResetRoutes)
  },
  {
    path: '**',
    redirectTo: '',
  }


];
