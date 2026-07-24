import { Component } from '@angular/core';

import { LockIcon } from '@shared/components/lock-icon/lock-icon';


@Component({
  selector: 'new-password-header',
  imports: [LockIcon],
  templateUrl: './new-password-header.html',
})
export class NewPasswordHeader {}
