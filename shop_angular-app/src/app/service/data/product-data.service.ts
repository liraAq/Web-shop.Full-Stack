import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/product/product.component';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private favoriteProducts: number[] = [];
  private apiUrl = 'http://localhost:8080/api';
  // private apiUrl = 'http://localhost:9090/ipa'; for docker

  constructor(private http: HttpClient) {
    this.favoriteProducts = this.loadFavoritesFromLocalStorage();
  }

  private loadFavoritesFromLocalStorage(): number[] {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/addProduct`, product);
  }

  getProductById(productId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${productId}`);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  retrieveAllProducts(): Observable<Product[]> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProducts(): Observable<any[]> {
    return this.retrieveAllProducts().pipe(
      map(products => products.map(product => ({
        ...product,
        isFavorite: this.favoriteProducts.includes(product.id)
      })))
    );
  }

  getFavoriteProducts(): Observable<any[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.isFavorite))
    );
  }

  removeFromFavorites(productId: number): void {
    const index = this.favoriteProducts.indexOf(productId);
    if (index !== -1) {
      this.favoriteProducts.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteProducts));
    }
  }
}
