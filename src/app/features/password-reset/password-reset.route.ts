import { Routes } from "@angular/router";

export const PasswordResetRoutes: Routes = [


  {
    path: '',
    loadComponent: ()=> import('./pages/password-reset/password-reset').then(c => c.PasswordReset),

    loadChildren: ()=>[
      {
        path: 'email',
        loadComponent: ()=> import('./pages/email/email').then(c=>c.Email)
      },
      {
        path: 'verify-code',
        loadComponent: ()=> import('./pages/verify-code/verify-code').then(c=>c.VerifyCode)
      },
      {
        path: 'new-password',
        loadComponent: ()=> import('./pages/new-password/new-password').then(c=>c.NewPassword)
      }
    ]
  }

]
