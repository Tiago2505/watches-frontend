import { Component, input } from '@angular/core';

@Component({
  selector: 'send-code-button',
  imports: [],
  templateUrl: './send-code-button.html',
})
export class SendCodeButton {

  btnAction = input.required<()=>void>();

}
