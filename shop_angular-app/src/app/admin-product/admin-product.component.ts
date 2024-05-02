import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../service/data/product-data.service';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  newProduct: Product = new Product(0, '', '', 0, '', '', true, 0);


  constructor(private productService: ProductDataService) { }

  ngOnInit(): void {
  }

  addProduct() {

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
          this.newProduct = new Product(0, '', '', 0, '', '', true, 0);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
    
  }
}
