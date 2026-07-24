import { Component, input } from '@angular/core';

@Component({
  selector: 'button-add-product',
  imports: [],
  templateUrl: './button-add-product.html',
})
export class ButtonAddProduct {

  buttonAction =input.required<()=>void>();

}
