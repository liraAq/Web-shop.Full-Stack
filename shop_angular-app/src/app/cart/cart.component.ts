import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/data/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalSum: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getCartItems();
    this.getTotalSum();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  getTotalSum() {
    this.totalSum = this.cartService.getTotalSum();
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.getTotalSum();
  }

  checkout() {
    this.router.navigate(['/order']);
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item); // Update quantity in the service
      this.getTotalSum();
    }
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item); // Update quantity in the service
    this.getTotalSum();
  }

  closeCart() {
    this.router.navigate(['/products']);
  }
}
