import { Component, inject } from '@angular/core';

import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'go-back-button',
  imports: [],
  templateUrl: './go-back-button.html',
})
export class GoBackButton {

  navigationService = inject(NavigationService);

}
