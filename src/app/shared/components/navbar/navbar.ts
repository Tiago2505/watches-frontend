import { Component, input, output } from '@angular/core';

import { SelectOptions } from "../select-options/select-options";

@Component({
  selector: 'navbar',
  imports: [SelectOptions],
  templateUrl: './navbar.html',
})
export class Navbar {

  selectOptionsList = input.required<string[]>();

  share = output<string>();

  shareOptionProducts(option: string){
    this.share.emit(option);
  }
}
