import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  isDisabled = signal<boolean>(true);

  toggleIsDisabled(text: string){
    text ? this.isDisabled.set(false) : this.isDisabled.set(true);
  }

  export = output<string>();

  search(text: string){
    this.export.emit(text);
  }

}
