import { Component, input } from '@angular/core';

import { EmailIcon } from "../email-icon/email-icon";

@Component({
  selector: 'verify-code-header',
  imports: [EmailIcon],
  templateUrl: './verify-code-header.html',
})
export class VerifyCodeHeader {

  userEmail = input.required<string>();

}
