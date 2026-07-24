import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'price-filter',
  imports: [],
  templateUrl: './price-filter.html',
})
export class PriceFilter {

   toggle = signal<boolean>(false)

  handleToggle(){
    this.toggle() ? this.toggle.set(false) : this.toggle.set(true);
  }

}
