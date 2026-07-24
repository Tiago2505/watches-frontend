import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

import { REGEX } from '@shared/regex/patterns';
import { UtilsService } from '@shared/services/utils.service';
import { SuccessText } from "@shared/components/success-text/success-text";
import { ErrorText } from "@shared/components/error-text/error-text";
import { LoadingSpinner } from "@shared/components/loading-spinner/loading-spinner";
import { NavigationService } from '@shared/services/navigation.service';
import { StorageService } from '@shared/services/storage.service';
import { PasswordResetService } from '@features/password-reset/services/password-reset.service';
import { VerifyCodeHeader } from "./verify-code-header/verify-code-header";
import { VerifyCodeTimer } from "./verify-code-timer/verify-code-timer";
import { VerifyCodeButton } from "./verify-code-button/verify-code-button";
import { ResendCodeButton } from "./resend-code-button/resend-code-button";
import { GoToEmailButton } from "./go-to-email-button/go-to-email-button";

import type { CreatePasswordResetDto, VerifyCodeDto } from '@features/password-reset/dtos';

@Component({
  selector: 'verify-code',
  imports: [SuccessText, ErrorText, LoadingSpinner, ReactiveFormsModule, VerifyCodeHeader, VerifyCodeTimer, VerifyCodeButton, ResendCodeButton, GoToEmailButton],
  templateUrl: './verify-code.html',
})
export class VerifyCode {
  constructor() {

    effect(()=>{
      this.userEmail.set(this.storageService.getSessionStorage('email'));
    });

    effect(()=>{

      if(this.verifyCodeRxResource.hasValue()){

        this.codeVerificationWasSuccessful.set(true);

        this.successMessage.set('¡Verificación exitosa!');

        this.showMessageTimeout();

        this.navigate();

      }else if(this.verifyCodeRxResource.error() && this.verifyCodeDto()){

        this.codeVerificationWasSuccessful.set(false);

        this.errorMessage.set('No se pudo verificar el código. Revisa la información ingresada e inténtalo nuevamente.');

        this.showMessageTimeout();

      }

    });

    effect(()=>{

      if(this.createNewCodeRxResource.hasValue()){

        this.successMessage.set('¡Código enviado!');

        this.codeVerificationWasSuccessful.set(true);

        this.showMessageTimeout();

      }else if(this.createNewCodeRxResource.error() && this.createPasswordResetDto()){

        this.errorMessage.set('No pudimos reenviar el código. Verifica tu conexión e inténtalo nuevamente.');

        this.codeVerificationWasSuccessful.set(false);

        this.showMessageTimeout();

      }

    });
  }

  passwordResetService = inject(PasswordResetService);
  fb = inject(FormBuilder);
  utilsService = inject(UtilsService);
  navigationService = inject(NavigationService);
  storageService = inject(StorageService);

  verifyCodeDto = signal<VerifyCodeDto | null>(null);
  userEmail = signal<string | null>(null);
  showMessage = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('')
  codeVerificationWasSuccessful = signal<boolean>(false);

  createPasswordResetDto =signal<CreatePasswordResetDto | null>(null);

  //Temporizador---------------------------------------------------------

  remainingSeconds = 600;

  timer = setInterval(() => {
    this.remainingSeconds--;

    if (this.remainingSeconds <= 0) {
      clearInterval(this.timer);
    }
  }, 1000);

  get timeLeft(): string {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  //----------------------------------------------------------------------

  verifyCodeGroup: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(REGEX.CODE)]]
  });

  verifyCodeRxResource = rxResource({
    params: ()=>({verifyCodeDto: this.verifyCodeDto()}),
    stream:({params})=>{

      if(!params.verifyCodeDto) return EMPTY;

      return this.passwordResetService.verifyPasswordResetCode(params.verifyCodeDto);
    }
  });

  createNewCodeRxResource = rxResource({
    params:()=>({createPasswordResetDto: this.createPasswordResetDto()}),
    stream:({params})=>{
      if(!params.createPasswordResetDto) return EMPTY;

      return this.passwordResetService.createPasswordReset(params.createPasswordResetDto);
    }
  })


  verify=()=>{

    if(this.verifyCodeGroup.invalid) {

      this.codeVerificationWasSuccessful.set(false);

      this.errorMessage.set('Codigo invalido');

      this.showMessageTimeout();

      return this.verifyCodeGroup.markAllAsTouched();
    }


    if(!this.userEmail()) {

      this.navigationService.goToSendPasswordResetCode();

    }

    const verifyCodeDto: VerifyCodeDto = {
      code: this.verifyCodeGroup.get('code')!.value,
      email: this.userEmail()!
    }

    this.verifyCodeDto.set(verifyCodeDto);

  }

  resendCode=()=>{

    if(!this.userEmail()) {

      this.navigationService.goToSendPasswordResetCode();

    }

    const createNewCode: CreatePasswordResetDto ={
      email: this.userEmail()!
    }

    this.createPasswordResetDto.set(createNewCode);

  }

  showMessageTimeout(){
    this.showMessage.set(true);

    setTimeout(()=>{
      this.showMessage.set(false);

    },2500)
  }

  navigate(){

    setTimeout(()=>{
      this.navigationService.goToNewPassword();
    }, 2500)

  }

}
