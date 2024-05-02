import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../service/data/product-data.service';
import { CartService } from '../service/data/cart.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteProducts: any[] | undefined; 

  constructor(private productService: ProductDataService,
        private cartService:CartService) { }

  ngOnInit(): void {

    this.loadFavoriteProducts();

  }

  loadFavoriteProducts(): void {
    this.productService.getFavoriteProducts().subscribe(
      (favoriteProducts: any[]) => {
        this.favoriteProducts = favoriteProducts;
      },
      (error) => {
        console.error('Error fetching favorite products:', error);
      }
    );
    
  }

  removeFromFavorites(productId: number): void {
    this.productService.removeFromFavorites(productId);
    this.loadFavoriteProducts();
  }

  addToCartFromFavorites(product: any) {
    this.cartService.addToCart(product);
    }

}
