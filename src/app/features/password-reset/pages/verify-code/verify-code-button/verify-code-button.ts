import { Component, input } from '@angular/core';

@Component({
  selector: 'verify-code-button',
  imports: [],
  templateUrl: './verify-code-button.html',
})
export class VerifyCodeButton {

  btnAction = input.required<()=>void>();

}
