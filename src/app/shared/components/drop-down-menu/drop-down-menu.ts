import { Component, input, output, signal } from '@angular/core';

import { FirstWordCapitalized } from '@shared/pipes/first-word-capitalized.pipe';

import type{ DropDownMenuInterface } from '@shared/interfaces/drop-down-menu.interface';
import type{ FiltersInterface } from '@shared/interfaces/filters.interface';

@Component({
  selector: 'drop-down-menu',
  imports: [FirstWordCapitalized],
  templateUrl: './drop-down-menu.html',
})
export class DropDownMenu {

  dropDownMenus = input.required<DropDownMenuInterface[]>();

  share = output<FiltersInterface>();

  filters = signal<FiltersInterface>({});

  optionSelected(menuTitle: string, option: string){


    if(menuTitle === 'Marcas'){

      this.filters.update(filter=>({
        ...filter,
        brand: option
      }));

    }else if(menuTitle === 'Precio'){

      if(option === '↑ Menor a mayor'){

        this.filters.update(filter=>({
          ...filter,
          orderByPrice: 'ascending'
        }));

      }else{
        this.filters.update(filter=>({
          ...filter,
          orderByPrice: 'descending'
        }));
      }


    }

    this.share.emit(this.filters());


  }

}
