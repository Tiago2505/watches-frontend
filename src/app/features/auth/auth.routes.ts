import { Routes } from "@angular/router";

export const AuthRoutes: Routes = [

  {
    path: 'login',
    loadComponent: ()=> import('./pages/login/login').then(c=>c.Login)
  },
  {
    path: 'register',
    loadComponent: ()=> import('./pages/register/register').then(c=>c.Register)
  },
  {
    path: '**',
    redirectTo: 'login'
  }


]
