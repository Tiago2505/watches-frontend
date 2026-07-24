import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

import { REGEX } from '@shared/regex/patterns';
import { NavigationService } from '@shared/services/navigation.service';
import { StorageService } from '@shared/services/storage.service';
import { LoadingSpinner } from "@shared/components/loading-spinner/loading-spinner";
import { SuccessText } from "@shared/components/success-text/success-text";
import { ErrorText } from "@shared/components/error-text/error-text";
import { UtilsService } from '@shared/services/utils.service';
import { FirstWordCapitalized } from '@shared/pipes/first-word-capitalized.pipe';
import { PasswordResetService } from '@features/password-reset/services/password-reset.service';
import { EyeIcon } from "@shared/components/eye-icon/eye-icon";
import { EyeOffIcon } from "@shared/components/eye-off-icon/eye-off-icon";
import { LockIcon } from "../../../../shared/components/lock-icon/lock-icon";
import { PasswordRequirements } from "./password-requirements/password-requirements";
import { ChangePasswordButton } from "./change-password-button/change-password-button";
import { NewPasswordHeader } from "./new-password-header/new-password-header";

import type{ UpdatePasswordDto } from '@features/password-reset/dtos';

@Component({
  selector: 'new-password',
  imports: [LoadingSpinner, SuccessText, ErrorText, ReactiveFormsModule, FirstWordCapitalized, EyeIcon, EyeOffIcon, LockIcon, PasswordRequirements, ChangePasswordButton, NewPasswordHeader],
  templateUrl: './new-password.html',
})
export class NewPassword {

  constructor(){

    effect(()=>{
      this.userEmail.set(this.storageService.getSessionStorage('email'));
    });

    effect(()=>{

      if(this.newPasswordRxResource.hasValue()){

        this.passwordSuccessfullyUpdated.set(true);


        this.showMessageTimeout();

        this.navigate();
      }else if(this.newPasswordRxResource.error() && this.updatePasswordDto()){

        this.passwordSuccessfullyUpdated.set(false)

        this.errorMessage.set('No se pudo actualizar la contraseña. Verifica que cumpla con los requisitos establecidos e inténtalo nuevamente.');

        this.showMessageTimeout();
      }

    })


  }

  fb = inject(FormBuilder);
  storageService = inject(StorageService);
  navigationService = inject(NavigationService);
  passwordResetService = inject(PasswordResetService);
  utilsService = inject(UtilsService);

  userEmail = signal<string | null >(null);
  updatePasswordDto = signal<UpdatePasswordDto | null> (null);
  showMessage = signal<boolean>(false);
  passwordSuccessfullyUpdated = signal<boolean>(false);
  errorMessage = signal<string>('');

  showNewPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  newPasswordGroup: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
    confirmPassword: ['', [Validators.required]]
  });

  newPasswordRxResource = rxResource({
    params: () => ({updatePasswordDto: this.updatePasswordDto()}),
    stream: ({params})=>{

      if(!params.updatePasswordDto) return EMPTY;

      return this.passwordResetService.changePassword(params.updatePasswordDto);
    }
  })



  update=()=>{

    if(this.newPasswordGroup.invalid) {

      this.passwordSuccessfullyUpdated.set(false);

      this.errorMessage.set('Contraseña invalida');

      this.showMessageTimeout();

      return this.newPasswordGroup.markAllAsTouched();
    }

    const newPassword = this.newPasswordGroup.get('newPassword')!.value;
    const confirmPassword = this.newPasswordGroup.get('confirmPassword')!.value;

    if(newPassword !== confirmPassword) {

      this.passwordSuccessfullyUpdated.set(false);

      this.errorMessage.set('La contraseña y su confirmación no coinciden.');

      this.showMessageTimeout();

      return;
    }

    if(!this.userEmail()) {
      return this.navigationService.goToSendPasswordResetCode();
    }

    const updatePasswordDto: UpdatePasswordDto ={
      email: this.userEmail()!,
      newPassword: newPassword
    }

    this.updatePasswordDto.set(updatePasswordDto);
  }

  toggleNewPasswordVisibility(){

    this.showNewPassword.update(value =>!value);

  }

  toggleConfirmPasswordVisibility(){

    this.showConfirmPassword.update(value =>!value);

  }



  getError( field: string ): string{

    return this.utilsService.textErrors(field, this.newPasswordGroup);

  }

  formControlHasError(field: string): boolean | undefined{

    return this.utilsService.formControlHasError(field, this.newPasswordGroup);

  }

  showMessageTimeout(){
    this.showMessage.set(true);

    setTimeout(() => {
      this.showMessage.set(false);

    }, 2500);


  }

  navigate(){

    setTimeout(()=>{
      this.navigationService.goToDashboardAdmin()
    },2500)

  }
}
