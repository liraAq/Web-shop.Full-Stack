import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../service/data/cart.service';
import { ProductDataService } from '../service/data/product-data.service';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { AuthenticationService } from '../service/data/authentication.service';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public image_url: string,
    public in_stock: boolean,
    public quantity_available: number,
    public quantity: number = 0
  ) {}
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  showOutOfStockMessage = false;
  @ViewChild('messageComponent', { static: false }) messageComponent!: MessageComponent;
  selectedSortOption = 'price';
  searchTerm = '';
  favoriteProducts: number[] = [];
  lastRowProducts: Product[] = [];
  isAdmin = false;

  constructor(
    private cartService: CartService,
    private productDataService: ProductDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.authenticationService.isAdmin();
    this.retrieveAndSortProducts();
    this.favoriteProducts = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.lastRowProducts = this.products.slice(-4);
  }

  toggleFavorite(productId: number): void {
    const index = this.favoriteProducts.indexOf(productId);
    if (index === -1) {
      this.favoriteProducts.push(productId);
    } else {
      this.favoriteProducts.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favoriteProducts));
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.includes(productId);
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  filterProducts(): void {
    if (!this.searchTerm) {
      this.retrieveAndSortProducts();
    } else {
      this.products = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.sortProducts();
    }
  }

  sortAndFilterProducts(): void {
    this.sortProducts();
  }

  onSortOptionChange(event: Event): void {
    this.selectedSortOption = (event.target as HTMLSelectElement).value;
    this.retrieveAndSortProducts();
  }

  retrieveAndSortProducts(): void {
    this.productDataService.retrieveAllProducts().subscribe(
      products => {
        this.products = products;
        this.sortProducts();
      },
      error => console.error('Error retrieving products:', error)
    );
  }

  sortProducts(): void {
    switch (this.selectedSortOption) {
      case 'price':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'category':
        this.products.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        this.products.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }
  }

  addToCart(product: Product): void {
    if (product.in_stock) {
      this.cartService.addToCart(product);
    } else {
      this.showOutOfStockMessage = true;
    }
  }

  deleteProduct(productId: string): void {
    this.productDataService.deleteProduct(productId).subscribe(
      () => this.retrieveAndSortProducts(),
      error => console.error('Error deleting product:', error)
    );
  }
}
