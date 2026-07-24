import { Component, input, output } from '@angular/core';

import { SearchInput } from "../search-input/search-input";
import { DropDownMenu } from "../drop-down-menu/drop-down-menu";

import type{ FiltersInterface } from '@shared/interfaces/filters.interface';
import type{ DropDownMenuInterface } from '@shared/interfaces/drop-down-menu.interface';

@Component({
  selector: 'filter-section',
  imports: [SearchInput, DropDownMenu],
  templateUrl: './filter-section.html',
})
export class FilterSection {

  dropDownMenus = input.required<DropDownMenuInterface[]>();
  isDeleteFiltersDisabled = input<boolean>(true);

  shareFiltersOutput= output<FiltersInterface>();

  shareSearchInputOutput = output<string>();
  shareDeleteFilters = output<void>();

  shareSearchInput(param: string){
    this.deleteFiltersClicked();
    this.shareSearchInputOutput.emit(param);
  }
  shareFilters(filters: FiltersInterface){
    this.shareFiltersOutput.emit(filters);
  }

  deleteFiltersClicked(){

    this.shareDeleteFilters.emit();
  }

}
