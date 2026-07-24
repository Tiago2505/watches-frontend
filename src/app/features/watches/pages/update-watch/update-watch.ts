import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';

import { WatchesService } from '@features/watches/services/watches.service';
import { FormDesign } from "@shared/components/form-design/form-design";
import { SuccessText } from "@shared/components/success-text/success-text";
import { ErrorText } from "@shared/components/error-text/error-text";
import { NavigationService } from '@shared/services/navigation.service';
import { UtilsService } from '@shared/services/utils.service';
import { LoadingSpinner } from "@shared/components/loading-spinner/loading-spinner";
import { ErrorIcon } from "@shared/components/error-icon/error-icon";

import type{ UpdateWatchDto } from '@features/watches/dtos';
import type{ FormInterface } from '@shared/interfaces/form-fields.interface';

@Component({
  selector: 'app-update-watch',
  imports: [ReactiveFormsModule, FormDesign, SuccessText, ErrorText, LoadingSpinner, ErrorIcon],
  templateUrl: './update-watch.html',
})
export class UpdateWatch  {

  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  watchesService = inject(WatchesService);
  navigationService = inject(NavigationService);
  utilsService = inject(UtilsService);

  constructor(){
    this.idProduct.set(Number(this.route.snapshot.paramMap.get('id')));

    effect(()=>{

      if(this.productRxResource.hasValue()){
        this.updateForm.patchValue(this.productRxResource.value());
      }

    });

    effect(()=>{
      if(this.updateRxResource.hasValue()){
          this.productWasUpdated.set(true);
          this.showMessageTimeout();
          this.productSuccessfullyUpdated();
      }
    })


  }
  idProduct = signal<number| null>(null);
  watchFormData = signal<FormData | null>(null);

  currentImages = signal<string[]>([]);
  currentDeletedImages = signal<string[]>([]);
  newImages = signal<File[]>([]);
  manyImages = signal<boolean>(false);
  productWasUpdated = signal<boolean>(false);
  showMessage = signal<boolean>(false);

  formFields = signal<FormInterface[]>([
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
          text: 'Ingrese la descripcion',
          type: 'text'
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          id: 'brand',
          type: 'text',
          text: 'Marca'
        },
        {
          id: 'price',
          type: 'number',
          text: 'Precio'
        },
      ]
    }
  ]);



  productRxResource = rxResource({
    params: ()=>({idProduct: this.idProduct()}),
    stream: ({params})=>{

      if(!params.idProduct) return EMPTY;

        return this.watchesService.getWatchById(params.idProduct);
      }
  });

  updateRxResource = rxResource({
    params: ()=>({idProduct: this.idProduct(), watchFormData: this.watchFormData() }),
    stream: ({params})=>{

      if(!params.idProduct) return EMPTY;
      if(!params.watchFormData) return EMPTY;

      const updateProps ={
        formData: params.watchFormData,
        id: params.idProduct
      }

        return this.watchesService.updateWatch(updateProps);
      }
  });

  updateForm: FormGroup  = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
  });


  onUpdate=()=>{

    if(this.updateForm.invalid) {

      this.productWasUpdated.set(false);

      this.showMessageTimeout();
      return this.updateForm.markAllAsTouched();
    }

    if(!this.idProduct()) return;

    if(this.manyImages()) {

      this.productWasUpdated.set(false);

      this.showMessageTimeout();

      return;
    };

    const publicUrls = this.utilsService.getPublicProductIds(this.currentDeletedImages());

    const watchDto: UpdateWatchDto ={
      name: this.updateForm.controls['name'].value,
      description: this.updateForm.controls['description'].value,
      brand: this.updateForm.controls['brand'].value,
      price: this.updateForm.controls['price'].value,
      currentImages: this.currentDeletedImages().length > 0 ? this.currentImages() : this.productRxResource.value()!.images,
      deletedImages: publicUrls
    }

    const formData = new FormData();

    formData.append('name', watchDto.name);
    formData.append('description', watchDto.description);
    formData.append('brand', watchDto.brand);
    formData.append('price', watchDto.price.toString());
    formData.append('deletedImages', JSON.stringify(watchDto.deletedImages));
    formData.append('currentImages', JSON.stringify(watchDto.currentImages));

    this.newImages().forEach(file => {
      formData.append('newImages', file);
    });


    this.watchFormData.set(formData);

  }

  productSuccessfullyUpdated(){
    setTimeout(() => {
      this.navigationService.goToWatchesCrudPage();
    }, 2500);
  }

  showMessageTimeout(){
    this.showMessage.set(true);
    setTimeout(()=>{
      this.showMessage.set(false);
    },2500)


  }

}
