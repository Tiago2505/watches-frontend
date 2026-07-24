import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

import { AuthService } from '@features/auth/services/auth.service';
import { LoadingSpinner } from "@shared/components/loading-spinner/loading-spinner";
import { SuccessText } from "@shared/components/success-text/success-text";
import { ErrorText } from "@shared/components/error-text/error-text";
import { LoginForm } from "./login-form/login-form";
import { NavigationService } from '@shared/services/navigation.service';
import { LoginHeader } from "./login-header/login-header";
import { REGEX } from '@shared/regex/patterns';

import type{ LoginDto } from '@features/auth/dtos';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingSpinner, SuccessText, ErrorText, LoginForm, LoginHeader],
  templateUrl: './login.html',
})
export class Login {

  constructor(){
    effect(()=>{

      if(!this.hasSubmittedLogin()) return;


      if(this.loginRxResource.hasValue()){
        this.successfulLogin.set(true);
        this.showMessageTimeout();

        this.navigate();
      }else if(this.loginRxResource.error() && this.loginDto()){
        this.successfulLogin.set(false);
        this.errorMessage.set('No se pudo iniciar sesión. Verifica tus datos e intenta nuevamente.')
        this.showMessageTimeout();
      }
    });
  }

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  navigationService = inject(NavigationService);


  loginDto = signal<LoginDto | null>(null);
  remember = signal<boolean>(false);
  successfulLogin  = signal<boolean>(false);
  showMessage = signal<boolean>(false);
  errorMessage = signal<string>('');
  hasSubmittedLogin = signal<boolean>(false);

  loginGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(REGEX.EMAIL)]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  loginRxResource = rxResource({
    params: ()=> ({loginDto: this.loginDto(), remember: this.remember()}),
    stream: ({params})=>{
      if(!params.loginDto) return EMPTY;

      return this.authService.login(params.loginDto, params.remember);
    }
  })

  login=()=>{

    this.hasSubmittedLogin.set(true);

    if(!this.loginGroup.valid) {
      this.loginGroup.markAllAsTouched();
      this.successfulLogin.set(false);
      this.errorMessage.set('Credenciales invalidas');
      return this.showMessageTimeout();
    }

    const loginDto: LoginDto= {
      email: this.loginGroup.get('email')!.value,
      password: this.loginGroup.get('password')!.value,
    }

    this.remember.set(this.loginGroup.get('remember')!.value);

    this.loginDto.set(loginDto);

    return;;
  }

  showMessageTimeout(){

    this.showMessage.set(true);

    setTimeout(()=>{
      this.showMessage.set(false);
    }, 2500)
  }

  navigate(){
    setTimeout(()=>{
      this.navigationService.goToDashboardAdmin();
    },1500);
  }

}
