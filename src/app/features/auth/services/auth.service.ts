import { HttpClient } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { User } from '../models';
import { StorageService } from '@shared/services/storage.service';

import type{ LoginDto, RegisterDto } from '../dtos';

interface Response {
  user: User;
  token: string;
}

const baseUrl = environment.BASE_URL;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  token = signal<string | null>(
    this.storageService.getLocalStorage('token') ?? this.storageService.getSessionStorage('token'),
  );

  login(loginDto: LoginDto, remember: boolean): Observable<Response> {
    return this.http.post<Response>(`${baseUrl}/auth/login`, loginDto).pipe(
      tap((response) => {
        this.token.set(response.token);
        if (remember) {
          this.storageService.saveLocalStorage('token', response.token);
        } else {
          this.storageService.saveSessionStorage('token', response.token);
        }
      }),
    );
  }

  register(registerDto: RegisterDto, remember: boolean): Observable<Response> {
    return this.http.post<Response>(`${baseUrl}/auth/register`, registerDto).pipe(
      tap((response) => {
        this.token.set(response.token);
        if (remember) {
          this.storageService.saveLocalStorage('token', response.token);
        } else {
          this.storageService.saveSessionStorage('token', response.token);
        }
      }),
    );
  }

  logout(){

    this.storageService.removeLocalStorage('token');
    this.storageService.removeSessionStorage('token');

    this.token.set(null);
  }
}
