import { Component, input, output } from '@angular/core';

@Component({
  selector: 'select-options',
  imports: [],
  templateUrl: './select-options.html',
})
export class SelectOptions {

  options = input.required<string[]>();

  share = output<string>();

  shareOption(option: string){
    this.share.emit(option);
  }
}
