import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/product/product.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  public cartSubject = new BehaviorSubject<any[]>([]);

  constructor() { }

  getTotalSum(): number {
    return this.cartItems.reduce((total,item) => total + item.price * item.quantity,0);
  }

  updateQuantity(item: any) {
    // Find the index of the item in the cartItems array
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);

    // If the item is found, update its quantity
    if (index !== -1) {
      this.cartItems[index].quantity = item.quantity;
    }
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(product:Product) {
    const existingProduct = this.cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, increase its quantity
      existingProduct.quantity = existingProduct.quantity + 1;
      this.cartSubject.next(this.cartItems);
    } else {
      // If the product is not in the cart, add it with quantity 1
      product.quantity = 1;
      this.cartItems.push(product);
      this.cartSubject.next(this.cartItems);
      
    }
  }

  refresh(){
    this.cartSubject.subscribe((cartItems) => {
      // Update the local cartItems array with the latest data
      this.cartItems = cartItems;
    });
  }

  removeFromCart(item: any) {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next(this.cartItems);
    }
  }
}
