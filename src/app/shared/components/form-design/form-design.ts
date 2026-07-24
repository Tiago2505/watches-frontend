import { Component, effect, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ImageGrid } from '../image-grid/image-grid';
import { TextError } from './text-error-form/text-error-form';
import { UtilsService } from '@shared/services/utils.service';

import type{ FormInterface } from '@shared/interfaces/form-fields.interface';

@Component({
  selector: 'form-design',
  imports: [ReactiveFormsModule, ImageGrid, TextError],
  templateUrl: './form-design.html',
})
export class FormDesign {
  formGroup = input.required<FormGroup>();
  formFields = input.required<FormInterface[]>();
  btnAction = input.required<() => void>();
  images = input.required<string[]>();
  disableButton = input<boolean>(false);

  utilsService = inject(UtilsService);

  currentImages = output<string[]>();
  currentDeletedImages = output<string[]>();
  newImages = output<File[]>();
  shareManyImages = output<boolean>();

  getError(field: string): string {
    return this.utilsService.textErrors(field, this.formGroup());
  }

  formControlHasErrors(field: string): boolean | undefined {

    return this.utilsService.formControlHasError(field, this.formGroup())

  }
}
