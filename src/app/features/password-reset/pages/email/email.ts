import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

import { REGEX } from '@shared/regex/patterns';
import { SuccessText } from '@shared/components/success-text/success-text';
import { ErrorText } from '@shared/components/error-text/error-text';
import { LoadingSpinner } from '@shared/components/loading-spinner/loading-spinner';
import { NavigationService } from '@shared/services/navigation.service';
import { UtilsService } from '@shared/services/utils.service';
import { FirstWordCapitalized } from '@shared/pipes/first-word-capitalized.pipe';
import { StorageService } from '@shared/services/storage.service';
import { PasswordResetService } from '@features/password-reset/services/password-reset.service';
import { SecurityNoteEmail } from "./security-note-email/security-note-email";
import { EmailFormHeader } from "./email-form-header/email-form-header";
import { EmailIcon } from "./email-icon/email-icon";
import { SendCodeButton } from "./send-code-button/send-code-button";
import { GoBackButton } from "./go-back-button/go-back-button";

import type{ CreatePasswordResetDto } from '@features/password-reset/dtos';

@Component({
  selector: 'email',
  imports: [ReactiveFormsModule, SuccessText, ErrorText, LoadingSpinner, FirstWordCapitalized, SecurityNoteEmail, EmailFormHeader, EmailIcon, SendCodeButton, GoBackButton],
  templateUrl: './email.html',
})
export class Email {
  constructor() {
    effect(() => {
      if (this.createPasswordResetCodeRxResource.hasValue()) {
        this.codeWasSentSuccessfully.set(true);

        this.storageService.saveSessionStorage('email', this.createPasswordResetDto()!.email);

        this.showMessageTimeout();
        this.navigate();
      } else if (this.createPasswordResetCodeRxResource.error() && this.createPasswordResetDto()) {
        this.codeWasSentSuccessfully.set(false);

        this.errorMessage.set(
          'No se pudo procesar la solicitud. Verifica los datos ingresados e inténtalo nuevamente.',
        );

        this.showMessageTimeout();
      }
    });
  }

  fb = inject(FormBuilder);

  passwordResetService = inject(PasswordResetService);
  navigationService = inject(NavigationService);
  utilsService = inject(UtilsService);
  storageService = inject(StorageService);

  createPasswordResetDto = signal<CreatePasswordResetDto | null>(null);
  errorMessage = signal<string>('');
  codeWasSentSuccessfully = signal<boolean>(false);
  showMessage = signal<boolean>(false);

  createPasswordResetCodeGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(REGEX.EMAIL)]],
  });

  createPasswordResetCodeRxResource = rxResource({
    params: () => ({ createPasswordResetDto: this.createPasswordResetDto() }),
    stream: ({ params }) => {
      if (!params.createPasswordResetDto) return EMPTY;

      return this.passwordResetService.createPasswordReset(params.createPasswordResetDto);
    },
  });

  create = () => {
    if (this.createPasswordResetCodeGroup.invalid) {
      this.codeWasSentSuccessfully.set(false);

      this.errorMessage.set('Correo electronico inválido');

      this.showMessageTimeout();

      return this.createPasswordResetCodeGroup.markAllAsTouched();
    }

    const createPasswordResetDto: CreatePasswordResetDto = {
      email: this.createPasswordResetCodeGroup.get('email')!.value,
    };

    this.createPasswordResetDto.set(createPasswordResetDto);
  };

  getError(field: string):string{

    return this.utilsService.textErrors(field, this.createPasswordResetCodeGroup);

  }

  formControlHasError(field: string):boolean | undefined{

    return this.utilsService.formControlHasError(field, this.createPasswordResetCodeGroup);

  }

  showMessageTimeout() {
    this.showMessage.set(true);

    setTimeout(() => {
      this.showMessage.set(false);
    }, 2000);
  }

  navigate() {
    setTimeout(() => {
      this.navigationService.goToVerifyPasswordResetCode();
    }, 2000);
  }
}
