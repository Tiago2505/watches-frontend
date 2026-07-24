import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationService } from '@shared/services/navigation.service';
import { ProductCard } from './product-card/product-card-admin-dashboard';
import { UserProfile } from '@shared/components/user-profile/user-profile';
import { StorageService } from '@shared/services/storage.service';

import type{ UserProfileInterface } from '@shared/interfaces/user-profile.interface';

interface ProductInterface {
  title: string;
  buttonAction: () => void;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet, ProductCard, UserProfile],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  navigationService = inject(NavigationService);
  storageService = inject(StorageService);

  productCardSelected = signal<string>('');
  products = signal<ProductInterface[]>([
    {
      title: 'Relojes',
      buttonAction: this.navigationService.goToWatchesCrudPage,
    },
  ]);

  userInformation = computed<UserProfileInterface>(() => {
    const token =
      this.storageService.getLocalStorage('token') ??
      this.storageService.getSessionStorage('token');

    return JSON.parse(atob(token!.split('.')[1]));
  });
}
