import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';


import { AuthService } from '@features/auth/services/auth.service';
import { NavigationService } from '@shared/services/navigation.service';
import { StorageService } from '@shared/services/storage.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = inject(AuthService).token();
  const storageService = inject(StorageService);
  const navigationService = inject(NavigationService);

  if(req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE' || req.method === 'GET'){
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(newReq).pipe(

    catchError((error) => {

      if (error.status === 401) {

        storageService.removeSessionStorage('token');
        storageService.removeLocalStorage('token');

        navigationService.goToLogin();
      }

      return throwError(() => error);
    }),

  );
  }

  return next(req);
}
