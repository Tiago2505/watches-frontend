import { Component, input } from '@angular/core';

@Component({
  selector: 'verify-code-timer',
  imports: [],
  templateUrl: './verify-code-timer.html',
})
export class VerifyCodeTimer {
  timeLeft = input.required<string>();
}
