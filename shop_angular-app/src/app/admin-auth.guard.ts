import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './service/data/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
    // Check if the user is an admin
    const isAdmin = await this.authService.isAdmin();
    
    if (isAdmin) {
      return true;
    } else {
      // If the user is not an admin, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
