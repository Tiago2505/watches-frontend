import { Component, input } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

import { CarouselImages } from "../carousel-images/carousel-images";

@Component({
  selector: 'product-card',
  imports: [CarouselImages, TitleCasePipe, DecimalPipe],
  templateUrl: './product-card.html',
})
export class ProductCard {

  cardTitle = input.required<string>();
  cardDescription = input.required<string>();
  brandProduct = input.required<string>();
  priceProduct = input.required<number>();
  productImages = input.required<string[]>();

}
