import { Component, input } from '@angular/core';

import { FirstWordCapitalized } from '@shared/pipes/first-word-capitalized.pipe';

@Component({
  selector: 'text-error',
  imports: [FirstWordCapitalized],
  templateUrl: './text-error-form.html',
})
export class TextError {

  textError = input.required<string>();

}
