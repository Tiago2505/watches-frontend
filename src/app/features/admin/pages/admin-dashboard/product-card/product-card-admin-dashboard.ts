import { LowerCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'product-card-admin-dashboard',
  imports: [LowerCasePipe],
  templateUrl: './product-card-admin-dashboard.html',
})
export class ProductCard {

  productCardTitle = input.required<string>();
  buttonAction = input.required<()=>void>();
  wasSelected = input<boolean>(false);
  productCardSelected = output<string>();


}
