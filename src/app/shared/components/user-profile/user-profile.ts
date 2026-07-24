import { TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { AuthService } from '@features/auth/services/auth.service';
import { NavigationService } from '@shared/services/navigation.service';

import type{ UserProfileInterface } from '@shared/interfaces/user-profile.interface';

@Component({
  selector: 'user-profile',
  imports: [TitleCasePipe],
  templateUrl: './user-profile.html',
})
export class UserProfile {

  navigationService = inject(NavigationService);
  authService = inject(AuthService);

  userInformation = input.required<UserProfileInterface>();


  logout(){
    this.authService.logout();

    this.navigationService.goToLogin();
  }
}
