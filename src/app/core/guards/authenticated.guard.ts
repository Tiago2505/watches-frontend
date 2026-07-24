import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';

import { AuthService } from '@features/auth/services/auth.service';

export const AuthenticatedGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {

  const token = inject(AuthService).token();

  if(!token) return false;
  return true;
}
