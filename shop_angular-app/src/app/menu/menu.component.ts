import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/data/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../service/data/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cartItemsCount: number = 0;
  isAuthenticated: boolean = false;
  userCabinetLink: string = '/u-c'; 
  loginPageLink: string = '/login';
  isAdmin: boolean = false;
  currentUrl: string | undefined;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {

  

    
    this.cartService.cartSubject.subscribe(cartItems => {
      this.cartItemsCount = cartItems.length;
    });
    this.isAuthenticated = this.authService.isAuthenticated();

    this.checkAdminStatus();
  }

  refreshNavbar(): void {
   
  }

  async checkAdminStatus(): Promise<void> {
    this.isAdmin = await this.authService.isAdmin();
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }

  get isLoggedin(): boolean {
    return this.authService.isLoggedIn;
  }
}
