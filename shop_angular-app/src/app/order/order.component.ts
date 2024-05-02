import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/data/authentication.service';
import { CartService } from '../service/data/cart.service';
import { OrderService } from '../service/order-service.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Product } from '../product/product.component';

export class Order {
  orderId: string | undefined;
  orderDate: string | undefined;
  totalAmount: number | undefined;
  deliveryAddress: string | undefined;
  orderStatus: string | undefined;
  orderImages: string[] | undefined; // An array of selected products in the order
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class OrderComponent implements OnInit {
  selectedProducts: Product[] = [];
  isAuthenticated: boolean = false;

  contactEmail: string | undefined;
  deliveryMethod: string | undefined;
  shippingAddress: string | undefined;
  paymentMethod: string = 'CreditCard';
  customMessage: string = 'Super';
  showCustomMessage: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((cartItems: Product[]) => {
      this.selectedProducts = cartItems;
    });

    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      this.authService.getUsername().subscribe(
        (username: string) => {
          this.contactEmail = username;
        },
        (error: any) => {
          console.error('Error fetching username:', error);
        }
      );
    }
  }

  submitOrder(): void {
    const orderData = {
      customer_id: null, // Replace with the actual customer ID
      orderDate: new Date(),
      totalAmount: this.calculateTotalAmount(),
      deliveryAddress: this.deliveryMethod === 'delivery' ? this.shippingAddress : 'Warehouse Address',
      contactEmail: this.contactEmail,
      orderStatus: 'Pending',
      paymentMethod: this.paymentMethod
    };

    this.orderService.createOrder(orderData).subscribe((response: any) => {
      console.log(response);
      this.showCustomMessage = true;
    });

    this.resetForm();
    setTimeout(() => {
      this.showCustomMessage = false;
      this.router.navigate(['/products']);
    }, 2000);
  }

  calculateTotalAmount(): number {
    let total = 0;
    for (const product of this.selectedProducts) {
      total += product.price * product.quantity;
    }
    return total;
  }

  onPaymentMethodChange(event: Event): void {
    this.paymentMethod = (event.target as HTMLSelectElement).value;
    console.log('Selected payment method:', this.paymentMethod);
  }

  private resetForm(): void {
    this.shippingAddress = '';
    this.contactEmail = '';
    this.paymentMethod = 'credit-card';
    this.selectedProducts = [];
    this.deliveryMethod = '';
  }
}
