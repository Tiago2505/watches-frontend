import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { EMPTY } from 'rxjs';

import { WatchesService } from '@features/watches/services/watches.service';
import { TableProductsListAdmin } from "@shared/components/table-products-list-admin/table-products-list-admin";
import { NavigationService } from '@shared/services/navigation.service';
import { SuccessText } from "@shared/components/success-text/success-text";
import { ButtonAddProduct } from "@shared/components/button-add-product/button-add-product";
import { LoadingSpinner } from "@shared/components/loading-spinner/loading-spinner";
import { NoRecordsFound } from "@shared/components/no-records-found/no-records-found";
import { ErrorIcon } from "@shared/components/error-icon/error-icon";

import type{ BtnTableListInterface } from '@shared/interfaces/btn-table-list.interface';

@Component({
  selector: 'watches-table-list',
  imports: [TableProductsListAdmin, SuccessText, ButtonAddProduct, LoadingSpinner, NoRecordsFound, ErrorIcon],
  templateUrl: './admin-watches-table-list.html',
})
export class WatchesTableList {

  watchesService = inject(WatchesService);
  navigationService = inject(NavigationService);


  allWatchesResource = rxResource({
    stream: () => {
      return this.watchesService.getAllWatches();
    },
  });

  deleteWatchRxResource = rxResource({
    params: ()=> ({id: this.watchId(), publicImageIds: this.publicImageIds()}),
    stream: ({params}) => {
      if(!params.id) return EMPTY;
      if(!params.publicImageIds) EMPTY;
      return this.watchesService.deleteWatch(params.id, params.publicImageIds);
    },
  });

  tableHeadings = signal<string[]>(['ID', 'Images', 'Name', 'Description', 'Brand', 'Price']);
  watchId = signal<number>(0);
  publicImageIds = signal<string[]>([]);
  showSuccessMessage = signal<boolean>(false);

  tableButtons = signal<BtnTableListInterface[]>([

    {
      text: 'Update',
      action: (id: number)=> this.navigationService.goToUpdateWatch(id),
      btnClass: 'btn-accent'
    },
    {
      text: 'Delete',
      action: (id: number, images?: string[])=> this.deleteWatch(id, images!),
      btnClass: 'btn-error'
    },


  ]);

  deleteWatch(id: number, publicImageIds: string[]){

    const choice = confirm(`¿Estás seguro de eliminar el reloj con id: '${id}'?`);

    if(choice){
      this.watchId.set(id);
      this.publicImageIds.set(publicImageIds);
      this.showSuccessMessage.set(true);
      setTimeout(()=>{
        this.showSuccessMessage.set(false);
        location.reload();
      }, 2500);
    }

  }

}
