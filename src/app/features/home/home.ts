import { Component, signal } from '@angular/core';

import { AllWatchesPage } from '@features/watches/pages/all-watches/all-watches';
import { Navbar } from "@shared/components/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [AllWatchesPage, Navbar],
  templateUrl: './home.html',
})
export class Home {

  showProduct = signal<string>('Watches');

  productsOptions: string[] = [
    'Watches',
  ];


}
