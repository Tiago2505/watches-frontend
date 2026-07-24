import { Component } from '@angular/core';

import { LockIcon } from "@shared/components/lock-icon/lock-icon";

@Component({
  selector: 'login-header',
  imports: [LockIcon],
  templateUrl: './login-header.html',
})
export class LoginHeader {}
