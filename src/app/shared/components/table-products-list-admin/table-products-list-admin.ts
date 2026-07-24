import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Watch } from '@features/watches/models/watch.model';
import { CarouselImages } from "../carousel-images/carousel-images";
import { NavigationService } from '@shared/services/navigation.service';

import type{ Products } from '@shared/types/products.type';
import type{ BtnTableListInterface } from '@shared/interfaces/btn-table-list.interface';

@Component({
  selector: 'table-products-list-admin',
  imports: [CarouselImages, DecimalPipe],
  templateUrl: './table-products-list-admin.html',
})
export class TableProductsListAdmin {

  navigationService = inject(NavigationService);

  tableHeadings = input.required<string[]>();

  products = input.required<Watch[]>();

  productType = input.required<Products>();

  tableButtons = input.required<BtnTableListInterface[]>()

}
