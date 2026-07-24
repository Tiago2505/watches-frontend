import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'change-password-button',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password-button.html',
})
export class ChangePasswordButton {

  btnAction = input.required<() => void>();

}
