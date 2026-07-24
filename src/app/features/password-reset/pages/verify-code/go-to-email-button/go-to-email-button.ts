import { Component, inject } from '@angular/core';

import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'go-to-email-button',
  imports: [],
  templateUrl: './go-to-email-button.html',
})
export class GoToEmailButton {

  navigationService = inject(NavigationService);

}
