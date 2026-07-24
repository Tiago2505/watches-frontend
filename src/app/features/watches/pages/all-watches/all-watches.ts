import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { WatchesService } from '@features/watches/services/watches.service';
import { Watch } from '@features/watches/models/watch.model';
import { UtilsService } from '@shared/services/utils.service';
import { ProductCard } from '@shared/components/product-card/product-card';
import { FilterSection } from '@shared/components/filter-section/filter-section';
import { LoadingSpinner } from '@shared/components/loading-spinner/loading-spinner';
import { FiltersInterface } from '@shared/interfaces/filters.interface';
import { DropDownMenuInterface } from '@shared/interfaces/drop-down-menu.interface';
import { ErrorIcon } from "@shared/components/error-icon/error-icon";

@Component({
  selector: 'all-watches',
  imports: [ProductCard, FilterSection, LoadingSpinner, ErrorIcon],
  templateUrl: './all-watches.html',
})
export class AllWatchesPage {
  private watchesService = inject(WatchesService);
  private utilsService = inject(UtilsService);

  constructor() {
    effect(() => {
      if (this.filters().brand) {
        this.searchParam.set(this.filters().brand!);
      }
    });
  }

  filters = signal<FiltersInterface>({});
  searchParam = signal('');

  // -------------------------------
  // Resources
  // -------------------------------

  allWatchesResource = rxResource({
    stream: () => this.watchesService.getAllWatches(),
  });

  getWatchByParam = rxResource({
    params: () => ({
      search: this.searchParam(),
    }),

    stream: ({ params }) => {
      if (!params.search.trim()) {
        return of([]);
      }

      return this.watchesService.getWatchByParam(params.search);
    },
  });

  // -------------------------------
  // Computed
  // -------------------------------

  displayedWatches = computed<Watch[]>(() => {
    const watches = this.searchParam().trim()
      ? (this.getWatchByParam.value() ?? [])
      : (this.allWatchesResource.value() ?? []);

    if (this.filters().orderByPrice) {
      return this.utilsService.sortProductsByPrice(this.filters().orderByPrice!, [...watches]);
    }

    return watches;
  });

  watchesBrand = computed(() => {
    const watches = this.allWatchesResource.value();

    if (!watches) return [];

    return this.utilsService.getProductBrands(watches);
  });

  dropDownMenus = computed<DropDownMenuInterface[]>(() => [
    {
      menuTitle: 'Marcas',
      menuItems: this.watchesBrand(),
    },

    {
      menuTitle: 'Precio',
      menuItems: ['↑ Menor a mayor', '↓ Mayor a menor'],
    },
  ]);

  isDeleteFiltersBtnDisabled = computed(() => {
    const filters = this.filters();

    return !this.searchParam().trim() && !filters.brand && !filters.orderByPrice;
  });

  isLoading = computed(
    () => this.allWatchesResource.isLoading() || this.getWatchByParam.isLoading(),
  );

  hasSearch = computed(() => this.searchParam().trim().length > 0);

  hasError = computed(() => {
    if (this.allWatchesResource.error()) {
      return true;
    }

    if (this.hasSearch() && this.getWatchByParam.error()) {
      return true;
    }

    return false;
  });

  hasProducts = computed(() => this.displayedWatches().length > 0);

  clearFilters() {
    this.filters.set({});
    this.searchParam.set('');
  }
}
