
import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';

import { AuthService } from '@features/auth/services/auth.service';

export const RoleGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {

  const token = inject(AuthService).token();

  if(!token) return false;

  const payload = JSON.parse(
    atob(token.split('.')[1])
  );
  if(payload.role === 'admin') return true;
  return false;
}
