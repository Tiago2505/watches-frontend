import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FirstWordCapitalized } from '@shared/pipes/first-word-capitalized.pipe';
import { NavigationService } from '@shared/services/navigation.service';
import { UtilsService } from '@shared/services/utils.service';
import { EyeIcon } from "@shared/components/eye-icon/eye-icon";
import { EyeOffIcon } from "@shared/components/eye-off-icon/eye-off-icon";

@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule, FirstWordCapitalized, EyeIcon, EyeOffIcon],
  templateUrl: './login-form.html',
})
export class LoginForm {

  formGroup = input.required<FormGroup>();
  loginAction = input.required<()=>void>();

  utilsService = inject(UtilsService);
  navigationService = inject(NavigationService);

  showPassword = signal<boolean>(false);


  formControlHasError(field: string): boolean | undefined{
    return this.utilsService.formControlHasError(field, this.formGroup());
  }

  getError(field: string): string{

    return this.utilsService.textErrors(field, this.formGroup())

  }

  toggleShowPassword(){
    this.showPassword.update(value => !value);
  }

}
