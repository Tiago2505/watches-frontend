import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PasswordReset } from '../models';
import { User } from '@features/auth/models';
import { environment } from '../../../../environments/environment';

import type{ CreatePasswordResetDto, UpdatePasswordDto, VerifyCodeDto } from '../dtos';

const baseUrl = environment.BASE_URL;

@Injectable({ providedIn: 'root' })
export class PasswordResetService {
  private http = inject(HttpClient);

  createPasswordReset(createPasswordResetDto: CreatePasswordResetDto): Observable<PasswordReset> {
    return this.http.post<PasswordReset>(`${baseUrl}/password-reset`, createPasswordResetDto);
  }

  verifyPasswordResetCode(verifyCodeDto: VerifyCodeDto): Observable<PasswordReset> {
    return this.http.post<PasswordReset>(`${baseUrl}/password-reset/verify`, verifyCodeDto);
  }

  changePassword(updatePasswordDto: UpdatePasswordDto): Observable<User>{
    return this.http.post<User>(`${baseUrl}/password-reset/new-password`, updatePasswordDto);
  }
}
