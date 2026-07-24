import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

import { AuthService } from '@features/auth/services/auth.service';
import { REGEX } from '@shared/regex/patterns';
import { SuccessText } from "@shared/components/success-text/success-text";
import { ErrorText } from "@shared/components/error-text/error-text";
import { LoadingSpinner } from "@shared/components/loading-spinner/loading-spinner";
import { RegisterHeader } from "./register-header/register-header";
import { PasswordRequirements } from "./password-requirements/password-requirements";
import { NavigationService } from '@shared/services/navigation.service';
import { UtilsService } from '@shared/services/utils.service';
import { FirstWordCapitalized } from '@shared/pipes/first-word-capitalized.pipe';

import type{ RegisterDto } from '@features/auth/dtos';

@Component({
  selector: 'app-register',
  imports: [SuccessText, ErrorText, LoadingSpinner, RegisterHeader, PasswordRequirements, ReactiveFormsModule, FirstWordCapitalized],
  templateUrl: './register.html',
})
export class Register {

  constructor(){

    effect(()=>{

      if(this.registerRxResource.hasValue()){

        this.successfullyRegistered.set(true);

        this.showMessageTimeout();

        this.navigate();

      }else if(this.registerRxResource.error() && this.registerDto()){

        this.successfullyRegistered.set(false);

        this.errorMessage.set('No se pudo completar el registro. Inténtalo nuevamente.');

        this.showMessageTimeout();

      }

    });

  }

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  navigationService = inject(NavigationService);
  utilsService = inject(UtilsService);

  registerDto = signal<RegisterDto | null>(null);
  remember = signal<boolean>(false);

  showMessage = signal<boolean>(false);
  errorMessage = signal<string>('');
  successfullyRegistered = signal<boolean>(false);

  registerGroup : FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(REGEX.EMAIL)]],
    phone: ['', [Validators.required, Validators.pattern(REGEX.PHONE)]],
    password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
    remember: [false]
  });

  registerRxResource = rxResource({
    params: ()=>({registerDto: this.registerDto(), remember: this.remember()}),
    stream: ({params})=>{
      if(!params.registerDto) return EMPTY;

      return this.authService.register(params.registerDto, params.remember);
    }
  });


  register(){

    if(this.registerGroup.invalid) {

      this.successfullyRegistered.set(false);

      this.errorMessage.set('Verifica los datos ingresados');

      this.showMessageTimeout();

      return this.registerGroup.markAllAsTouched();
    }

    const registerDto: RegisterDto = {
      fullName: this.registerGroup.get('name')!.value,
      email: this.registerGroup.get('email')!.value,
      phone: this.registerGroup.get('phone')!.value,
      password: this.registerGroup.get('password')!.value,
    }

    this.registerDto.set(registerDto);

    this.remember.set(this.registerGroup.get('remember')!.value);

  }

  getError(field: string):string{

    return this.utilsService.textErrors(field, this.registerGroup);

  }

  formControlHasError(field:string):boolean | undefined{

    return this.utilsService.formControlHasError(field, this.registerGroup);

  }

  showMessageTimeout(){
    this.showMessage.set(true);
    setTimeout(() => {
      this.showMessage.set(false);
    }, 2500);

  }

  navigate(){
    setTimeout(() => {
      this.navigationService.goToDashboardAdmin();
    }, 2500);


  }


}
