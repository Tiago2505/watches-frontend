import { Component, input } from '@angular/core';

@Component({
  selector: 'error-text',
  imports: [],
  templateUrl: './error-text.html',
})
export class ErrorText {

  errorText = input.required<string>();

}
