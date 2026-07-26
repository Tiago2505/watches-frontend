import { Component, input, output } from '@angular/core';

import { SelectOptions } from "../select-options/select-options";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'navbar',
  imports: [SelectOptions, RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {

  selectOptionsList = input.required<string[]>();

  share = output<string>();

  shareOptionProducts(option: string){
    this.share.emit(option);
  }
}
