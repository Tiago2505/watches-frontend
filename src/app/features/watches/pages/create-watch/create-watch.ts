import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

import { WatchesService } from '@features/watches/services/watches.service';
import { FormDesign } from "@shared/components/form-design/form-design";
import { SuccessText } from "@shared/components/success-text/success-text";
import { NavigationService } from '@shared/services/navigation.service';
import { LoadingSpinner } from "@shared/components/loading-spinner/loading-spinner";
import { ErrorIcon } from "@shared/components/error-icon/error-icon";
import { ErrorText } from "@shared/components/error-text/error-text";

import type{ CreateWatchDto } from '@features/watches/dtos';
import type{ FormInterface } from '@shared/interfaces/form-fields.interface';

@Component({
  selector: 'app-create-watch',
  imports: [FormDesign, SuccessText, LoadingSpinner, ErrorIcon, ErrorText],
  templateUrl: './create-watch.html',
})
export class CreateWatch {

  constructor(){
    effect(()=>{
      if(this.createWatchRxResource.hasValue()){
        this.productWasCreated.set(true);
        this.showMessageTimeout();
        this.productSuccessfullyCreated();
      }
    });
  }

  watchService = inject(WatchesService);
  navigationService = inject(NavigationService);
  fb = inject(FormBuilder);

  watchFormData = signal<FormData | null>(null);
  watchImages = signal<File[] | null>(null);
  manyImages = signal<boolean>(false);
  productWasCreated = signal<boolean>(false);
  showMessage = signal<boolean>(false);

  createWatchFields = signal<FormInterface[]>([
    {
      type: 'column',
      fields: [
        {
          id: 'name',
          text: 'Ingrese el nombre',
          type: 'text'
        },
        {
          id: 'description',
          text: 'Ingrese la descripción',
          type: 'text'
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          id: 'brand',
          text: 'Marca',
          type: 'text'
        },
        {
          id: 'price',
          text: 'Precio',
          type: 'number'
        },
      ]
    }
  ]);


  createWatchRxResource = rxResource({
    params: ()=> ({formData: this.watchFormData()}),
    stream: ({params})=>{
      if(!params.formData) return EMPTY;

      return this.watchService.createWatch(params.formData);
    }
  });

  createWatchGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  create=()=>{
    if(!this.createWatchGroup.valid) {
      this.productWasCreated.set(false);
      this.showMessageTimeout();
      return this.createWatchGroup.markAllAsTouched;
    }

    if(this.manyImages()) {
      this.productWasCreated.set(false);
      this.showMessageTimeout();
      return;
    };

    const watchDto: CreateWatchDto={
      name: this.createWatchGroup.get('name')!.value,
      description: this.createWatchGroup.get('description')!.value,
      brand: this.createWatchGroup.get('brand')!.value,
      price: this.createWatchGroup.get('price')!.value,
    }

    const formData = new FormData();

    formData.append('name', watchDto.name);
    formData.append('description', watchDto.name);
    formData.append('brand', watchDto.name);
    formData.append('price', watchDto.price.toString());


    this.watchImages()?.forEach(image => formData.append('newImages', image));


    this.watchFormData.set(formData);
    return;
  }

  showMessageTimeout(){
    this.showMessage.set(true);
    setTimeout(()=>{
      this.showMessage.set(false);
    },2500)
  }

  productSuccessfullyCreated(){
    setTimeout(() => {
      this.navigationService.goToWatchesCrudPage();
    }, 2500);
  }
}
