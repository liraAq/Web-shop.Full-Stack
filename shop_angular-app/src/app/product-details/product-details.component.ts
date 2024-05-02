import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDataService } from '../service/data/product-data.service';
import { CartService } from '../service/data/cart.service';
import { Product } from '../product/product.component';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductDataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(productId).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }
  
  addToCart(product: Product): void {
    if (product.in_stock) {
      this.cartService.addToCart(product);
    }
  }
}
