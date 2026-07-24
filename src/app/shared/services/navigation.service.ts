import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class NavigationService {

  private router = inject(Router);
  private location = inject(Location);

  goBack=()=>{
    this.location.back();
  }

  goToDashboardAdmin=()=>{
    this.router.navigate(['/admin']);
  }

  goToWatchesCrudPage=()=>{

    this.router.navigate(['/admin/watches']);

  }

  goToUpdateWatch=(id: number)=>{
    this.router.navigate([`/admin/watches/update/${id}`]);
  }

  goToAddNewWatch=()=>{
    this.router.navigate([`/admin/watches/new`]);
  }

  goToLogin=()=>{
    this.router.navigate(['/auth/login']);
  }

  goToRegister=()=>{

    this.router.navigate(['/auth/register']);

  }

  goToSendPasswordResetCode=()=>{
    this.router.navigate(['/password-reset/email']);
  }
  goToVerifyPasswordResetCode=()=>{
    this.router.navigate(['/password-reset/verify-code']);
  }
  goToNewPassword=()=>{
    this.router.navigate(['/password-reset/new-password']);
  }
}
