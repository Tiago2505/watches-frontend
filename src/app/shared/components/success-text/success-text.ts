import { Component, input } from '@angular/core';

@Component({
  selector: 'success-text',
  imports: [],
  templateUrl: './success-text.html',
})
export class SuccessText {
  successText = input.required<string>();
}
