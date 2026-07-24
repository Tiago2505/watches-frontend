import { Component, input, signal } from '@angular/core';

import { EmptyImages } from "./empty-images/empty-images";

@Component({
  selector: 'carousel-images',
  templateUrl: './carousel-images.html',
  imports: [EmptyImages],
})
export class CarouselImages {

  productImages = input.required<string[]>();

  currentImage = signal(0);


  nextImage(){

    this.currentImage.update(current => {

      const next = current + 1;

      return next >= this.productImages().length
        ? 0
        : next;

    });

  }


  previousImage(){

    this.currentImage.update(current => {

      const previous = current - 1;

      return previous < 0
        ? this.productImages().length - 1
        : previous;

    });

  }

}
