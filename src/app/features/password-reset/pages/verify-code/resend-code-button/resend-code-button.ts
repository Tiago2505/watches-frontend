import { Component, input } from '@angular/core';

@Component({
  selector: 'resend-code-button',
  imports: [],
  templateUrl: './resend-code-button.html',
})
export class ResendCodeButton {

  btnAction = input.required<()=>void>();

}
