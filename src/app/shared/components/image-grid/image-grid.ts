import { Component, computed, effect, input, output, signal } from '@angular/core';

import { Image } from './image/image';
import { InputAddImageGrid } from './input-add-image-grid/input-add-image-grid';
import { ErrorIcon } from '../error-icon/error-icon';

interface NewImage {
  file: File;
  url: string;
}

@Component({
  selector: 'image-grid',
  imports: [Image, InputAddImageGrid, ErrorIcon],
  templateUrl: './image-grid.html',
})
export class ImageGrid {

  constructor(){
    effect(()=>{

      this.shareManyImages.emit(this.manyImages());

    })
  }

  currentImagesInput = input.required<string[]>();

  // Estado
  currentDeletedImages = signal<string[]>([]);

  newImagesDeleted = signal<string[]>([]);

  newImages = signal<NewImage[]>([]);

  // Cantidad real de imágenes
  cantImages = computed(() => {
    return (
      this.currentImagesInput().length +
      this.newImages().length -
      this.currentDeletedImages().length -
      this.newImagesDeleted().length
    );
  });

  // Imágenes actuales visibles
  currentFilteredImages = computed(() => {
    return this.currentImagesInput().filter(
      (image) => !this.currentDeletedImages().includes(image),
    );
  });

  // Imágenes nuevas visibles
  newFilteredImages = computed(() => {
    return this.newImages().filter((image) => !this.newImagesDeleted().includes(image.url));
  });

  // Outputs
  shareCurrentDeletedImages = output<string[]>();

  shareCurrentFilteredImages = output<string[]>();

  shareNewFilteredImages = output<File[]>();

  shareManyImages = output<boolean>();

  deleteImage(image: string) {
    // Imagen existente en backend
    if (this.currentImagesInput().includes(image)) {
      this.currentDeletedImages.update((images) => [...images, image]);

      this.shareCurrentDeletedImages.emit(this.currentDeletedImages());

      this.shareCurrentFilteredImages.emit(this.currentFilteredImages());

      return;
    }

    // Imagen nueva
    const isNewImage = this.newImages().some((img) => img.url === image);

    if (isNewImage) {
      this.newImagesDeleted.update((images) => [...images, image]);

      this.emitNewImages();
    }
  }

  restoreImage(image: string) {
    // Restaurar imagen existente
    if (this.currentDeletedImages().includes(image)) {
      this.currentDeletedImages.update((images) => images.filter((img) => img !== image));

      this.shareCurrentFilteredImages.emit(this.currentFilteredImages());

      return;
    }

    // Restaurar imagen nueva
    if (this.newImagesDeleted().includes(image)) {
      this.newImagesDeleted.update((images) => images.filter((img) => img !== image));

      this.emitNewImages();
    }
  }

  addImages(imagesSelected: FileList) {
    let files = Array.from(imagesSelected);

    const available = 4 - this.cantImages();

    if (files.length > available) {
      files = files.slice(0, available);

    }

    const images = files.map((file) => ({
      file,

      url: URL.createObjectURL(file),
    }));

    this.newImages.update((current) => [...current, ...images]);

    this.emitNewImages();
  }

  emitNewImages() {
    this.shareNewFilteredImages.emit(this.newFilteredImages().map((image) => image.file));
  }

  wasImageDeleted(image: string) {
    return this.currentDeletedImages().includes(image) || this.newImagesDeleted().includes(image);
  }

  manyImages() {
    return this.cantImages() > 4;
  }

  containerFull() {
    return this.cantImages() >= 4;
  }
}
