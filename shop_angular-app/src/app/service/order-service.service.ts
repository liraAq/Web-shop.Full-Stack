import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../order/order.component';

@Injectable({
  providedIn: 'root',
})
export class OrderService {


  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
  const createOrderUrl = `${this.apiUrl}/create`;
    
    return this.http.post(createOrderUrl, orderData);
  }

  getUserOrders(userId: any): Observable<Order[]> {
    
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<[]>(url);
    
  }

}
