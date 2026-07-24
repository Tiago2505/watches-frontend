import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Watch } from '@features/watches/models/watch.model';

@Injectable({ providedIn: 'root' })
export class UtilsService {


  sortProductsByPrice(type: string, elements: Watch[]): Watch[] {
    if (type === 'ascending') {
      return elements.sort((a, b) => a.price - b.price);
    } else {
      return elements.sort((a, b) => b.price - a.price);
    }
  }

  getProductBrands(elements: Watch[]): string[] {
    const productBrands = elements.map((element) => element.brand);

    return [...new Set(productBrands)];
  }

  getPublicProductIds(images: string[]): string[] {
    return images.map((url) =>
      url
        .split('upload')[1]
        .split('/')
        .slice(2)
        .join('/')
        .replace(/\.[^/.]+$/, ''),
    );
  }

  formControlHasError(field: string, formGroup: FormGroup) {
    const formControl = formGroup.get(field);
    return formControl?.errors !== null && formControl?.touched;
  }

  textErrors(field: string, formGroup: FormGroup): string {
    const formControl = formGroup.get(field);

    if (formControl?.hasError('required')) return `${field} is required`;
    if (formControl?.hasError('email')) return `Invalid email`;
    if (formControl!.hasError('min')) {
      const minimumValue = formControl?.getError('min');
      return `The minimum ${field} is ${minimumValue.min}`;
    }
    if(formControl?.hasError('pattern')) return 'Please enter a valid value';

    return 'Error not implemented';
  }


}
