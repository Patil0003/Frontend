import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from './auth-services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard implements CanActivate {
  constructor(
    private authapp: AuthServicesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate() {
    if (this.authapp.loggedin()) {
      return true;
    }
    this.toastr.error(' You Need to Login First!');
    this.router.navigate(['/login']);
    return false;
  }
}
